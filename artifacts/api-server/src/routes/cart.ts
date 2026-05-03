import { Router } from "express";
import { db } from "@workspace/db";
import { cartItemsTable } from "@workspace/db";
import { wcFetch, mapProduct, WcProduct } from "../lib/wc.js";
import { GetCartQueryParams, AddToCartBody, RemoveFromCartParams } from "@workspace/api-zod";
import { eq, and } from "drizzle-orm";

const router = Router();

async function buildCart(sessionId: string) {
  const items = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.sessionId, sessionId));

  const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    sessionId,
    items: items.map((i) => ({ ...i, price: parseFloat(i.price) })),
    total,
    itemCount,
  };
}

router.get("/cart", async (req, res) => {
  const parsed = GetCartQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Missing sessionId" });
  }
  return res.json(await buildCart(parsed.data.sessionId));
});

router.post("/cart", async (req, res) => {
  const parsed = AddToCartBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const { sessionId, productId, quantity } = parsed.data;

  // Fetch product details from WooCommerce
  const wcProduct = await wcFetch<WcProduct>(`/products/${productId}`).catch(() => null);
  if (!wcProduct) {
    return res.status(404).json({ error: "Product not found" });
  }

  const product = mapProduct(wcProduct);

  const existing = await db
    .select()
    .from(cartItemsTable)
    .where(and(eq(cartItemsTable.sessionId, sessionId), eq(cartItemsTable.productId, productId)))
    .limit(1);

  if (existing[0]) {
    await db
      .update(cartItemsTable)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItemsTable.id, existing[0].id));
  } else {
    await db.insert(cartItemsTable).values({
      sessionId,
      productId,
      productName: product.name,
      productImageUrl: product.imageUrl,
      pole: product.pole,
      price: String(product.price),
      quantity,
    });
  }

  return res.json(await buildCart(sessionId));
});

router.delete("/cart/:itemId", async (req, res) => {
  const parsed = RemoveFromCartParams.safeParse({ itemId: Number(req.params.itemId) });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid item ID" });
  }

  const item = await db
    .select()
    .from(cartItemsTable)
    .where(eq(cartItemsTable.id, parsed.data.itemId))
    .limit(1);

  if (!item[0]) {
    return res.status(404).json({ error: "Cart item not found" });
  }

  await db.delete(cartItemsTable).where(eq(cartItemsTable.id, parsed.data.itemId));

  return res.json(await buildCart(item[0].sessionId));
});

export default router;

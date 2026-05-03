import { Router } from "express";
import { wcFetch, mapProduct, WcProduct } from "../lib/wc.js";
import { ListProductsQueryParams, GetProductParams } from "@workspace/api-zod";

const router = Router();

router.get("/products", async (req, res) => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  const { pole, category, besoin, search, featured, limit, offset } = parsed.data;

  const params: Record<string, string | number | boolean> = {
    per_page: limit,
    offset,
    status: "publish",
  };

  if (search) params.search = search;
  if (featured !== undefined) params.featured = featured;
  if (category) params.category = category;

  const [products, allProducts] = await Promise.all([
    wcFetch<WcProduct[]>("/products", params),
    wcFetch<WcProduct[]>("/products", { per_page: 100, status: "publish" }),
  ]);

  let mapped = products.map(mapProduct);

  if (pole) mapped = mapped.filter((p) => p.pole === pole);
  if (besoin) mapped = mapped.filter((p) => p.besoin === besoin);

  const total = pole || besoin
    ? allProducts.map(mapProduct).filter(
        (p) => (!pole || p.pole === pole) && (!besoin || p.besoin === besoin),
      ).length
    : mapped.length;

  return res.json({ products: mapped, total, offset, limit });
});

router.get("/products/:id", async (req, res) => {
  const parsed = GetProductParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  const product = await wcFetch<WcProduct>(`/products/${parsed.data.id}`).catch(() => null);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.json(mapProduct(product));
});

export default router;

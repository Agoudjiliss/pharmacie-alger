import { Router } from "express";
import { db } from "@workspace/db";
import { besoinsTable } from "@workspace/db";
import { wcFetch, mapProduct, WcProduct } from "../lib/wc.js";
import { GetFeaturedProductsQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/catalog/summary", async (req, res) => {
  const [wcProducts, besoins] = await Promise.all([
    wcFetch<WcProduct[]>("/products", { per_page: 100, status: "publish" }),
    db.select().from(besoinsTable).limit(8),
  ]);

  const mapped = wcProducts.map(mapProduct);

  const poleCounts: Record<string, number> = {};
  for (const p of mapped) {
    poleCounts[p.pole] = (poleCounts[p.pole] || 0) + 1;
  }

  const newArrivals = wcProducts
    .slice(0, 4)
    .map(mapProduct);

  return res.json({
    totalProducts: wcProducts.length,
    poleCounts,
    featuredBesoins: besoins,
    newArrivals,
  });
});

router.get("/catalog/featured", async (req, res) => {
  const parsed = GetFeaturedProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  const { pole, limit } = parsed.data;

  const products = await wcFetch<WcProduct[]>("/products", {
    featured: true,
    per_page: pole ? 50 : limit,
    status: "publish",
  });

  let mapped = products.map(mapProduct);
  if (pole) mapped = mapped.filter((p) => p.pole === pole).slice(0, limit);

  return res.json(mapped);
});

router.get("/catalog/besoins", async (req, res) => {
  const besoins = await db.select().from(besoinsTable);
  return res.json(besoins);
});

export default router;

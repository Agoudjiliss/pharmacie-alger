import type { VercelRequest, VercelResponse } from "@vercel/node";
import { wcGet, mapProduct, derivePole } from "../_wc.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { pole, category, besoin, search, featured, limit = 24, offset = 0 } = req.query;

    const params: Record<string, unknown> = {
      per_page: Number(limit),
      offset: Number(offset),
      status: "publish",
    };
    if (search) params.search = search;
    if (featured) params.featured = true;
    if (category) params.category = category;

    const { data: raw, total } = await wcGet<unknown[]>("/products", params);
    let products = (raw as unknown[]).map(mapProduct);

    if (pole) products = products.filter((p) => p.pole === String(pole));
    if (besoin) products = products.filter((p) => p.besoin === String(besoin));

    res.json({ products, total: pole || besoin ? products.length : total, offset: Number(offset), limit: Number(limit) });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

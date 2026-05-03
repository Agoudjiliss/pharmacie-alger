import type { VercelRequest, VercelResponse } from "@vercel/node";
import { wcGet, mapProduct } from "../_wc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { pole, limit = 6 } = req.query;

    const { data: raw } = await wcGet<unknown[]>("/products", {
      featured: true,
      per_page: 50,
      status: "publish",
    });

    let products = (raw as unknown[]).map(mapProduct);
    if (pole) products = products.filter((p) => p.pole === String(pole));
    products = products.slice(0, Number(limit));

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { wcGet, mapProduct } from "../_wc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = Number(req.query.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });
  try {
    const { data } = await wcGet<unknown>(`/products/${id}`);
    res.json(mapProduct(data));
  } catch {
    res.status(404).json({ error: "Product not found" });
  }
}

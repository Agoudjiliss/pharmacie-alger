import type { VercelRequest, VercelResponse } from "@vercel/node";
import { wcGet, derivePole } from "../_wc.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { pole } = req.query;
    const { data: raw } = await wcGet<unknown[]>("/products/categories", {
      per_page: 100,
      hide_empty: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let categories = (raw as any[]).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      pole: derivePole([{ name: c.name, slug: c.slug }], []),
      productCount: c.count,
    }));

    if (pole) categories = categories.filter((c) => c.pole === String(pole));

    res.json(categories);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

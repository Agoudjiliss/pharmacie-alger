import type { VercelRequest, VercelResponse } from "@vercel/node";
import { wcGet, mapProduct, derivePole } from "../_wc";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const [{ data: rawProducts }, { data: rawTags }] = await Promise.all([
      wcGet<unknown[]>("/products", { per_page: 100, status: "publish" }),
      wcGet<unknown[]>("/products/tags", { per_page: 20, orderby: "count", order: "desc" }),
    ]);

    const products = (rawProducts as unknown[]).map(mapProduct);

    const poleCounts: Record<string, number> = {};
    for (const p of products) {
      poleCounts[p.pole] = (poleCounts[p.pole] || 0) + 1;
    }

    const ICONS: Record<string, string> = {
      hydratation: "💧", "anti-age": "✨", énergie: "⚡", stress: "🧘",
      sommeil: "🌙", digestion: "🌿", immunité: "🛡️", beauté: "🌸",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const featuredBesoins = (rawTags as any[]).slice(0, 8).map((t, i) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      pole: derivePole([], [{ name: t.name, slug: t.slug }]),
      productCount: t.count,
      icon: ICONS[t.slug] || ICONS[t.name.toLowerCase()] || ["💊","🌿","💆","🧴","🍃","⚕️","💉","🌺"][i % 8],
    }));

    const newArrivals = products.slice(0, 4);

    res.json({ totalProducts: products.length, poleCounts, featuredBesoins, newArrivals });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { wcGet, derivePole } from "../_wc.js";

const ICONS: Record<string, string> = {
  hydratation: "💧", "anti-age": "✨", énergie: "⚡", stress: "🧘",
  sommeil: "🌙", digestion: "🌿", immunité: "🛡️", beauté: "🌸",
  peau: "🌺", cheveux: "💆", minceur: "🍃", vitamines: "💊",
};

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const { data: raw } = await wcGet<unknown[]>("/products/tags", {
      per_page: 30,
      orderby: "count",
      order: "desc",
      hide_empty: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const besoins = (raw as any[]).map((t, i) => ({
      id: t.id,
      name: t.name,
      slug: t.slug,
      pole: derivePole([], [{ name: t.name, slug: t.slug }]),
      productCount: t.count,
      icon: ICONS[t.slug] || ICONS[t.name.toLowerCase()] ||
        ["💊","🌿","💆","🧴","🍃","⚕️","💉","🌺","✨","💧","⚡","🧘"][i % 12],
    }));

    res.json(besoins);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}

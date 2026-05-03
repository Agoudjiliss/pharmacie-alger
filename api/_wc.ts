const WC_BASE = "https://lightslategray-dinosaur-220659.hostingersite.com";

function auth() {
  return Buffer.from(
    `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
  ).toString("base64");
}

export async function wcGet<T>(
  path: string,
  params?: Record<string, unknown>
): Promise<{ data: T; total: number }> {
  const url = new URL(`${WC_BASE}/wp-json/wc/v3${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Basic ${auth()}` },
  });
  if (!res.ok) throw new Error(`WC ${res.status} ${res.statusText}`);
  const total = Number(res.headers.get("X-WP-Total") ?? 0);
  return { data: await res.json(), total };
}

export async function wcPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${WC_BASE}/wp-json/wc/v3${path}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`WC ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Pole mapping ────────────────────────────────────────────────────────────

const POLE_MAP: Record<string, string> = {
  medical: "medical", médical: "medical", médicament: "medical", medicament: "medical",
  paramedical: "paramedical", paramédical: "paramedical", "para-médical": "paramedical",
  cosmetique: "cosmetique", cosmétique: "cosmetique", beaute: "cosmetique", beauté: "cosmetique",
  complements: "supplements", compléments: "supplements", nutrition: "supplements",
  "compléments alimentaires": "supplements",
};

export function derivePole(
  categories: Array<{ name: string; slug: string }>,
  tags: Array<{ name: string; slug: string }>
): string {
  for (const term of [...categories, ...tags]) {
    const slug = term.slug.toLowerCase().replace(/-/g, "");
    const name = term.name.toLowerCase();
    if (POLE_MAP[slug]) return POLE_MAP[slug];
    if (POLE_MAP[name]) return POLE_MAP[name];
    for (const [key, val] of Object.entries(POLE_MAP)) {
      if (slug.includes(key) || name.includes(key)) return val;
    }
  }
  return "medical";
}

function getMeta(meta: Array<{ key: string; value: unknown }>, key: string): string {
  const item = meta.find((m) => m.key === key);
  return item ? String(item.value ?? "") : "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProduct(p: any) {
  const pole = derivePole(p.categories ?? [], p.tags ?? []);
  return {
    id: p.id,
    name: p.name,
    description: stripHtml(p.short_description || p.description || ""),
    pole,
    category: p.categories?.[0]?.name ?? "",
    besoin: getMeta(p.meta_data ?? [], "_besoin") || p.tags?.[0]?.name || null,
    price: parseFloat(p.price || p.regular_price || "0"),
    isFeatured: !!p.featured,
    inStock: p.stock_status === "instock",
    imageUrl: p.images?.[0]?.src ?? null,
    badge: p.on_sale ? "Promo" : p.featured ? "Vedette" : null,
    ingredients: getMeta(p.meta_data ?? [], "_ingredients"),
    posologie: getMeta(p.meta_data ?? [], "_posologie"),
    contreIndications: getMeta(p.meta_data ?? [], "_contre_indications"),
    texture: getMeta(p.meta_data ?? [], "_texture"),
    origin: getMeta(p.meta_data ?? [], "_origin"),
  };
}

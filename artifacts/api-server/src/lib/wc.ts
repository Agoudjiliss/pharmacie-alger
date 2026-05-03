const WC_BASE = process.env.WC_BASE_URL ?? "";
const WC_KEY = process.env.WC_CONSUMER_KEY ?? "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET ?? "";

function getAuth(): string {
  return Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
}

export async function wcFetch<T = unknown>(
  path: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
  const url = new URL(`${WC_BASE}/wp-json/wc/v3${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Basic ${getAuth()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WooCommerce ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

// ---------- Types ----------

export interface WcImage {
  id: number;
  src: string;
  alt: string;
}

export interface WcTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WcProduct {
  id: number;
  name: string;
  slug: string;
  status: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  featured: boolean;
  on_sale: boolean;
  stock_status: string;
  images: WcImage[];
  categories: WcTerm[];
  tags: WcTerm[];
  meta_data: { key: string; value: unknown }[];
}

export interface WcCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  image: WcImage | null;
  description: string;
}

// ---------- Pole mapping ----------

export const POLE_MAP: Record<string, string> = {
  medical: "medical",
  médical: "medical",
  médicament: "medical",
  medicament: "medical",
  paramedical: "paramedical",
  paramédical: "paramedical",
  "para-médical": "paramedical",
  cosmetique: "cosmetique",
  cosmétique: "cosmetique",
  beaute: "cosmetique",
  beauté: "cosmetique",
  complements: "supplements",
  compléments: "supplements",
  "compléments alimentaires": "supplements",
  nutrition: "supplements",
};

export function derivePole(product: WcProduct): string {
  const allTerms = [...product.categories, ...product.tags];
  for (const term of allTerms) {
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

export function getMetaValue(product: WcProduct, key: string): string {
  const meta = product.meta_data.find((m) => m.key === key);
  return meta ? String(meta.value ?? "") : "";
}

/** Strip HTML tags from WooCommerce descriptions */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").trim();
}

/** Map a WooCommerce product to our internal shape */
export function mapProduct(p: WcProduct) {
  const pole = derivePole(p);
  const imageUrl = p.images[0]?.src ?? null;
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    pole,
    category: p.categories[0]?.name ?? "",
    categorySlug: p.categories[0]?.slug ?? "",
    besoin: getMetaValue(p, "_besoin") || (p.tags[0]?.name ?? null),
    price: parseFloat(p.price || "0"),
    regularPrice: parseFloat(p.regular_price || p.price || "0"),
    salePrice: p.sale_price ? parseFloat(p.sale_price) : null,
    onSale: p.on_sale,
    isFeatured: p.featured,
    inStock: p.stock_status === "instock",
    imageUrl,
    shortDescription: stripHtml(p.short_description),
    description: stripHtml(p.description),
    ingredients: getMetaValue(p, "_ingredients"),
    posologie: getMetaValue(p, "_posologie"),
    contreIndications: getMetaValue(p, "_contre_indications"),
    texture: getMetaValue(p, "_texture"),
    origin: getMetaValue(p, "_origin"),
    tags: p.tags.map((t) => t.name),
  };
}

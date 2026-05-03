import { Router } from "express";
import { wcFetch, WcCategory, POLE_MAP } from "../lib/wc.js";
import { ListCategoriesQueryParams } from "@workspace/api-zod";

const router = Router();

function mapCategory(c: WcCategory) {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    parentId: c.parent,
    productCount: c.count,
    imageUrl: c.image?.src ?? null,
    description: c.description,
  };
}

router.get("/categories", async (req, res) => {
  const parsed = ListCategoriesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  const categories = await wcFetch<WcCategory[]>("/products/categories", {
    per_page: 100,
    hide_empty: false,
  });

  let mapped = categories.map(mapCategory);

  if (parsed.data.pole) {
    const pole = parsed.data.pole;
    mapped = mapped.filter((c) => {
      const slug = c.slug.toLowerCase().replace(/-/g, "");
      const name = c.name.toLowerCase();
      for (const [key, val] of Object.entries(POLE_MAP)) {
        if (val === pole && (slug.includes(key) || name.includes(key))) return true;
      }
      return false;
    });
  }

  return res.json(mapped);
});

export default router;

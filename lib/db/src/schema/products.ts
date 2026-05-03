import { pgTable, serial, text, numeric, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const poleEnum = pgEnum("pole", ["medical", "paramedical", "cosmetique", "supplements"]);

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  pole: poleEnum("pole").notNull(),
  category: text("category").notNull(),
  besoin: text("besoin"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
  ingredients: text("ingredients"),
  posologie: text("posologie"),
  contreIndications: text("contre_indications"),
  texture: text("texture"),
  origin: text("origin"),
  isFeatured: boolean("is_featured").notNull().default(false),
  inStock: boolean("in_stock").notNull().default(true),
  badge: text("badge"),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;

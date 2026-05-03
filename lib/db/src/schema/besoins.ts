import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const besoinsTable = pgTable("besoins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  pole: text("pole"),
  productCount: integer("product_count").notNull().default(0),
  icon: text("icon"),
});

export const insertBesoinSchema = createInsertSchema(besoinsTable).omit({ id: true });
export type InsertBesoin = z.infer<typeof insertBesoinSchema>;
export type Besoin = typeof besoinsTable.$inferSelect;

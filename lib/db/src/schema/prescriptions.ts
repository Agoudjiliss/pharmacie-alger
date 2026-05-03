import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const prescriptionsTable = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  patientName: text("patient_name").notNull(),
  phone: text("phone").notNull(),
  fileDataUrl: text("file_data_url").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("received"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPrescriptionSchema = createInsertSchema(prescriptionsTable).omit({
  id: true,
  reference: true,
  status: true,
  createdAt: true,
});
export type InsertPrescription = z.infer<typeof insertPrescriptionSchema>;
export type Prescription = typeof prescriptionsTable.$inferSelect;

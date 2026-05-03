import { Router } from "express";
import { db } from "@workspace/db";
import { prescriptionsTable } from "@workspace/db";
import { UploadPrescriptionBody } from "@workspace/api-zod";

const router = Router();

function generateReference(): string {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `GPA-${dateStr}-${random}`;
}

router.post("/prescriptions", async (req, res) => {
  const parsed = UploadPrescriptionBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { patientName, phone, fileDataUrl, notes } = parsed.data;
  const reference = generateReference();

  const estimatedDate = new Date();
  estimatedDate.setHours(estimatedDate.getHours() + 2);

  const [prescription] = await db
    .insert(prescriptionsTable)
    .values({
      reference,
      patientName,
      phone,
      fileDataUrl,
      notes,
    })
    .returning();

  return res.status(201).json({
    id: prescription.id,
    reference: prescription.reference,
    status: prescription.status,
    message:
      "Votre ordonnance a été reçue avec succès. Notre équipe pharmaceutique la traitera dans les plus brefs délais.",
    estimatedReady: estimatedDate.toISOString(),
  });
});

export default router;

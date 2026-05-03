import type { VercelRequest, VercelResponse } from "@vercel/node";
import { wcPost } from "../_wc";

function reference(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `GPA-${date}-${Math.floor(Math.random() * 9000) + 1000}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { patientName, phone, fileDataUrl, notes } = req.body ?? {};
  if (!patientName || !phone || !fileDataUrl) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  const ref = reference();
  const estimatedReady = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

  // Determine file type for display
  const isImage = fileDataUrl.startsWith("data:image");
  const isPdf = fileDataUrl.startsWith("data:application/pdf");
  const fileType = isPdf ? "PDF" : isImage ? "Image" : "Fichier";
  const fileSize = Math.round((fileDataUrl.length * 3) / 4 / 1024);

  const note = [
    `ORDONNANCE — Réf: ${ref}`,
    `Patient : ${patientName}`,
    `Téléphone : ${phone}`,
    notes ? `Note : ${notes}` : null,
    `Fichier joint : ${fileType} (~${fileSize} ko)`,
  ]
    .filter(Boolean)
    .join("\n");

  type WcOrder = { id: number; status: string };

  let order: WcOrder | null = null;
  try {
    order = await wcPost<WcOrder>("/orders", {
      status: "pending",
      billing: {
        first_name: patientName.split(" ")[0] || patientName,
        last_name: patientName.split(" ").slice(1).join(" ") || "-",
        phone,
        email: `ordonnance+${ref.toLowerCase()}@pharmacie-alger.dz`,
        address_1: "Ordonnance en ligne",
        city: "Alger",
        country: "DZ",
      },
      customer_note: note,
      meta_data: [
        { key: "_prescription_ref", value: ref },
        { key: "_prescription_phone", value: phone },
        { key: "_prescription_file_type", value: fileType },
        { key: "_prescription_file_size_kb", value: String(fileSize) },
        { key: "_prescription_file_b64", value: fileDataUrl },
      ],
    });
  } catch (e) {
    console.error("WC order creation failed:", e);
  }

  res.status(201).json({
    id: order?.id ?? 0,
    reference: ref,
    status: "pending",
    message:
      "Votre ordonnance a été reçue avec succès. Notre équipe pharmaceutique la traitera dans les plus brefs délais.",
    estimatedReady,
  });
}

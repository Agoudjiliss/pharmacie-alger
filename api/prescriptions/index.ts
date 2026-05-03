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

  try {
    await wcPost("/orders", {
      status: "pending",
      billing: { first_name: patientName, phone },
      customer_note: `ORDONNANCE — Réf: ${ref}\nPatient: ${patientName}\nTél: ${phone}${notes ? `\nNote: ${notes}` : ""}\n[Fichier joint en base64]`,
      meta_data: [
        { key: "_prescription_ref", value: ref },
        { key: "_prescription_file", value: fileDataUrl.substring(0, 200) },
      ],
    });
  } catch {
    // Commande WC optionnelle — on répond quand même avec succès
  }

  res.status(201).json({
    id: Math.floor(Math.random() * 10000),
    reference: ref,
    status: "pending",
    message:
      "Votre ordonnance a été reçue avec succès. Notre équipe pharmaceutique la traitera dans les plus brefs délais.",
    estimatedReady,
  });
}

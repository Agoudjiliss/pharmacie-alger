export type Pole = "medical" | "paramedical" | "cosmetique" | "supplements";

export const poleConfig: Record<
  Pole,
  { label: string; labelFr: string; description: string; color: string; light: string; textColor: string }
> = {
  medical: {
    label: "Médical",
    labelFr: "Soin & Santé",
    description: "Rigueur, confiance, clarté médicale",
    color: "hsl(152, 45%, 25%)",
    light: "hsl(152, 35%, 92%)",
    textColor: "text-emerald-800",
  },
  paramedical: {
    label: "Paramédical",
    labelFr: "Soin & Santé",
    description: "Efficacité, soin, technologie",
    color: "hsl(210, 35%, 35%)",
    light: "hsl(210, 30%, 93%)",
    textColor: "text-blue-800",
  },
  cosmetique: {
    label: "Cosmétique",
    labelFr: "Art de Vivre",
    description: "Beauté, sensorialité, prestige",
    color: "hsl(340, 28%, 55%)",
    light: "hsl(340, 30%, 94%)",
    textColor: "text-rose-800",
  },
  supplements: {
    label: "Compléments",
    labelFr: "Art de Vivre",
    description: "Énergie, nature, rituels",
    color: "hsl(95, 30%, 35%)",
    light: "hsl(95, 25%, 93%)",
    textColor: "text-green-800",
  },
};

export function getPoleClass(pole: Pole): string {
  const map: Record<Pole, string> = {
    medical: "pole-medical",
    paramedical: "pole-paramedical",
    cosmetique: "pole-cosmetique",
    supplements: "pole-supplements",
  };
  return map[pole] || "";
}

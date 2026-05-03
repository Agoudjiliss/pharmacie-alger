import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Stethoscope, Pill, Sparkles, Leaf } from "lucide-react";
import { useListCategories, useListBesoins, useGetCatalogSummary } from "@workspace/api-client-react";
import { poleConfig, type Pole } from "@/lib/poleConfig";

const poles: Pole[] = ["medical", "paramedical", "cosmetique", "supplements"];
const poleIcons = {
  medical: Stethoscope,
  paramedical: Pill,
  cosmetique: Sparkles,
  supplements: Leaf,
};

export default function AtelierPage() {
  const { data: allCategories } = useListCategories({});
  const { data: besoins } = useListBesoins();
  const { data: summary } = useGetCatalogSummary();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs tracking-[0.4em] text-[#16a34a] font-semibold mb-3 uppercase">Navigation visuelle</div>
          <h1 className="text-5xl font-semibold text-gray-900 mb-3">L'Atelier</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Explorez l'ensemble de nos univers, catégories et expertises. Votre guide dans la Grand Pharmacie.
          </p>
        </div>
      </div>
      <div className="h-0.5 bg-[#16a34a] opacity-30" />

      {/* Conseil du Pharmacien */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-green-50 border border-green-100 rounded-2xl">
            <div className="w-14 h-14 rounded-full bg-[#16a34a] flex items-center justify-center shrink-0">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-[10px] tracking-widest text-[#16a34a] font-bold mb-1 uppercase">Conseil du Pharmacien</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                "Chaque produit de notre officine est sélectionné avec la même rigueur que nous apportons à chaque conseil."
              </h3>
              <p className="text-sm text-gray-500">
                Dr. Amel Benali — Pharmacienne titulaire, La Grand Pharmacie d'Alger
              </p>
            </div>
            <Link
              href="/ordonnance"
              className="shrink-0 flex items-center gap-2 text-sm font-semibold text-[#16a34a] border border-[#16a34a] px-4 py-2.5 rounded-lg hover:bg-white transition-colors"
            >
              Ordonnance <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pole galleries */}
      {poles.map((pole, pi) => {
        const cfg = poleConfig[pole];
        const Icon = poleIcons[pole];
        const categories = allCategories?.filter((c) => c.pole === pole) || [];
        const count = summary?.poleCounts?.[pole] || 0;

        return (
          <section key={pole} className={`py-16 ${pi % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}>
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: cfg.light, color: cfg.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-900">{cfg.label}</div>
                    <div className="text-xs text-gray-400">{count} produits · {cfg.description}</div>
                  </div>
                  <Link
                    href={`/catalogue?pole=${pole}`}
                    className="ml-auto flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                    style={{ color: cfg.color }}
                  >
                    Voir tout <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="h-px w-full bg-gray-100" />
              </motion.div>

              {/* Categories grid */}
              {categories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.map((cat, i) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={`/catalogue?pole=${pole}&category=${cat.slug}`}
                        className="block p-4 bg-white border border-gray-200 rounded-xl hover:border-transparent hover:shadow-md transition-all group"
                        style={{ borderTop: `3px solid ${cfg.color}` }}
                      >
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-[#16a34a] transition-colors mb-1">
                          {cat.name}
                        </div>
                        <div className="text-xs text-gray-400">{cat.productCount} produits</div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-400">Catégories en cours de chargement...</div>
              )}
            </div>
          </section>
        );
      })}

      {/* Besoins section */}
      {besoins && besoins.length > 0 && (
        <section className="py-16 bg-[#16a34a]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="text-xs tracking-[0.3em] text-green-200 font-semibold mb-2 uppercase">Filtres Diagnostic</div>
              <h2 className="text-3xl font-semibold text-white">Par besoin</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {besoins.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/catalogue?besoin=${b.slug}`}
                    className="flex flex-col items-center gap-2 px-5 py-4 bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl transition-all group min-w-[100px]"
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-xs font-semibold text-center leading-tight text-white">{b.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

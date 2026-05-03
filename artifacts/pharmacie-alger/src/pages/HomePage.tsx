import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Pill, Sparkles, Leaf, Shield, Clock, Star } from "lucide-react";
import {
  useGetCatalogSummary,
  useGetFeaturedProducts,
  useListBesoins,
  useAddToCart,
} from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { poleConfig, type Pole } from "@/lib/poleConfig";
import { getSessionId } from "@/lib/cart";

const poleIcons = {
  medical: Stethoscope,
  paramedical: Pill,
  cosmetique: Sparkles,
  supplements: Leaf,
};

const poleHrefs: Record<Pole, string> = {
  medical: "/catalogue?pole=medical",
  paramedical: "/catalogue?pole=paramedical",
  cosmetique: "/catalogue?pole=cosmetique",
  supplements: "/catalogue?pole=supplements",
};

const poles: Pole[] = ["medical", "paramedical", "cosmetique", "supplements"];

export default function HomePage() {
  const sessionId = getSessionId();
  const { data: summary } = useGetCatalogSummary();
  const { data: featuredMedical } = useGetFeaturedProducts({ pole: "medical", limit: 3 });
  const { data: featuredCosmetique } = useGetFeaturedProducts({ pole: "cosmetique", limit: 3 });
  const { data: featuredSupplements } = useGetFeaturedProducts({ pole: "supplements", limit: 3 });
  const { data: featuredParamedical } = useGetFeaturedProducts({ pole: "paramedical", limit: 3 });
  const { data: besoins } = useListBesoins();
  const addToCart = useAddToCart();

  const handleAddToCart = (productId: number) => {
    addToCart.mutate({ data: { sessionId, productId, quantity: 1 } });
  };

  const featuredByPole: Record<Pole, typeof featuredMedical> = {
    medical: featuredMedical,
    paramedical: featuredParamedical,
    cosmetique: featuredCosmetique,
    supplements: featuredSupplements,
  };

  return (
    <div>
      {/* Hero — clean white with green accent */}
      <section className="relative bg-white border-b border-gray-100 overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(90deg, #16a34a 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-[#16a34a] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#16a34a] rounded-full animate-pulse" />
              Alger — Depuis 1962
            </div>
            <h1 className="text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Le Grand<br />
              <span className="text-[#16a34a]">Comptoir</span><br />
              Digital
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md font-normal">
              Quatre univers de bien-être réunis dans une seule expérience. Science et tradition algérienne, au service de votre santé.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-medium text-sm px-6 py-3 rounded-lg transition-colors"
              >
                Découvrir le catalogue
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/ordonnance"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Concierge Ordonnance
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-100">
              {[
                { icon: Shield, text: "Produits certifiés" },
                { icon: Clock, text: "Livraison rapide" },
                { icon: Star, text: "Conseil expert" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Icon size={13} className="text-[#16a34a]" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pole cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {poles.map((pole) => {
              const cfg = poleConfig[pole];
              const Icon = poleIcons[pole];
              const count = summary?.poleCounts?.[pole] || 0;
              return (
                <Link
                  key={pole}
                  href={poleHrefs[pole]}
                  className="group p-5 bg-white border border-gray-200 rounded-xl hover:border-[#16a34a] hover:shadow-md transition-all duration-200"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: cfg.color + "15", color: cfg.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">{cfg.label}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
                  <div className="text-xs text-gray-500 group-hover:text-[#16a34a] transition-colors leading-snug">{cfg.description}</div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Besoins / Diagnostic filters */}
      {besoins && besoins.length > 0 && (
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="text-xs tracking-[0.3em] text-[#16a34a] font-semibold mb-2 uppercase">Filtres Diagnostic</div>
              <h2 className="text-3xl font-semibold text-gray-900">Par besoin</h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {besoins.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/catalogue?besoin=${b.slug}`}
                    className="flex flex-col items-center gap-2 px-5 py-4 bg-white border border-gray-200 hover:border-[#16a34a] hover:shadow-sm rounded-xl transition-all group min-w-[110px]"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">{b.icon}</span>
                    <span className="text-xs font-semibold text-center leading-tight text-gray-800">{b.name}</span>
                    <span className="text-[10px] text-gray-400">{b.productCount} produits</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Poles */}
      {poles.map((pole, pi) => {
        const cfg = poleConfig[pole];
        const Icon = poleIcons[pole];
        const products = featuredByPole[pole] || [];
        if (!products.length) return null;

        return (
          <section key={pole} className={`py-20 ${pi % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-100`}>
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-end justify-between mb-10"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: cfg.color + "15", color: cfg.color }}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: cfg.color }}>
                      {cfg.labelFr}
                    </span>
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-900">{cfg.label}</h2>
                  <p className="text-gray-500 text-sm mt-1">{cfg.description}</p>
                </div>
                <Link
                  href={poleHrefs[pole]}
                  className="hidden md:flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70"
                  style={{ color: cfg.color }}
                >
                  Voir tout <ArrowRight size={14} />
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={handleAddToCart}
                    index={i}
                  />
                ))}
              </div>

              <div className="mt-8 text-center md:hidden">
                <Link
                  href={poleHrefs[pole]}
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: cfg.color }}
                >
                  Voir tout <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* Ordonnance CTA — solid green */}
      <section className="py-20 bg-[#16a34a] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs tracking-[0.3em] text-green-200 font-semibold mb-4 uppercase">Service exclusif</div>
            <h2 className="text-4xl font-semibold text-white mb-4">
              Le Concierge Ordonnance
            </h2>
            <p className="text-green-100 text-base leading-relaxed mb-8 max-w-md mx-auto">
              Déposez votre ordonnance en deux clics. Notre équipe pharmaceutique la prépare et vous contacte pour la remise.
            </p>
            <Link
              href="/ordonnance"
              className="inline-flex items-center gap-2 bg-white text-[#16a34a] hover:bg-green-50 font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors"
            >
              Déposer mon ordonnance
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

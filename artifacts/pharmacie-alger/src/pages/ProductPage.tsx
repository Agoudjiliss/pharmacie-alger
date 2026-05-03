import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, CheckCircle, AlertTriangle, Leaf, Stethoscope } from "lucide-react";
import { useGetProduct, useAddToCart } from "@workspace/api-client-react";
import { poleConfig, type Pole } from "@/lib/poleConfig";
import { getSessionId } from "@/lib/cart";

export default function ProductPage() {
  const [, params] = useRoute("/produit/:id");
  const id = Number(params?.id);
  const { data: product, isLoading, error } = useGetProduct(id);
  const addToCart = useAddToCart();
  const sessionId = getSessionId();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-100 animate-pulse rounded-xl" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 bg-gray-100 animate-pulse rounded-lg" style={{ width: `${90 - i * 15}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
        <div>
          <div className="text-3xl font-semibold text-gray-900 mb-3">Produit introuvable</div>
          <p className="text-gray-500 text-sm mb-6">Ce produit n'existe pas ou n'est plus disponible.</p>
          <Link href="/catalogue" className="text-sm font-semibold text-[#16a34a] underline underline-offset-4">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const pole = product.pole as Pole;
  const cfg = poleConfig[pole] || poleConfig.medical;
  const isMedical = pole === "medical" || pole === "paramedical";
  const isCosmetique = pole === "cosmetique";

  const handleAddToCart = () => {
    addToCart.mutate({ data: { sessionId, productId: product.id, quantity: 1 } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 py-3 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href={`/catalogue?pole=${pole}`} className="hover:text-gray-700 transition-colors">{cfg.label}</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/catalogue" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors font-medium">
          <ArrowLeft size={14} /> Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: cfg.light }}
            >
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <span className="text-8xl font-bold" style={{ color: cfg.color, opacity: 0.2 }}>
                    {product.name.charAt(0)}
                  </span>
                  <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: cfg.color, opacity: 0.5 }}>
                    {product.category}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: cfg.color }}
              >
                {cfg.label.toUpperCase()}
              </span>
              {product.badge && (
                <span className="text-[10px] font-semibold tracking-wider px-2.5 py-1 border rounded-full" style={{ color: cfg.color, borderColor: cfg.color }}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-semibold text-gray-900 mb-2 leading-snug">{product.name}</h1>
            {product.category && (
              <div className="text-sm text-gray-400 font-medium mb-4">{product.category}</div>
            )}

            <div className="text-3xl font-bold text-gray-900 mb-6">
              {Number(product.price).toFixed(2)} <span className="text-base font-medium text-gray-400">DZD</span>
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed text-gray-500 mb-6">{product.description}</p>
            )}

            {/* Add to cart */}
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 active:scale-[0.99] mb-6"
                style={{ backgroundColor: cfg.color }}
              >
                <ShoppingBag size={16} />
                Ajouter à la Conciergerie
              </button>
            ) : (
              <div className="w-full py-3.5 text-sm text-center text-gray-400 border border-gray-200 rounded-xl mb-6">
                Produit actuellement indisponible
              </div>
            )}

            {/* Medical block */}
            {isMedical && (
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100" style={{ backgroundColor: cfg.light }}>
                  <Stethoscope size={14} style={{ color: cfg.color }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: cfg.color }}>
                    Bloc Expertise
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  {product.posologie && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                        <CheckCircle size={12} style={{ color: cfg.color }} />
                        Posologie
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{product.posologie}</p>
                    </div>
                  )}
                  {product.contreIndications && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                        <AlertTriangle size={12} className="text-amber-500" />
                        Contre-indications
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{product.contreIndications}</p>
                    </div>
                  )}
                  {product.ingredients && (
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-1">Composition</div>
                      <p className="text-sm text-gray-500 leading-relaxed">{product.ingredients}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cosmetique block */}
            {isCosmetique && (
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100" style={{ backgroundColor: cfg.light }}>
                  <Leaf size={14} style={{ color: cfg.color }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: cfg.color }}>
                    Expérience Sensorielle
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  {product.texture && (
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-1">Texture & Toucher</div>
                      <p className="text-sm text-gray-500 leading-relaxed">{product.texture}</p>
                    </div>
                  )}
                  {product.ingredients && (
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-1">Ingrédients botaniques</div>
                      <p className="text-sm text-gray-500 leading-relaxed">{product.ingredients}</p>
                    </div>
                  )}
                  {product.origin && (
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-1">Origine</div>
                      <p className="text-sm italic text-gray-500">{product.origin}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Supplements block */}
            {pole === "supplements" && (
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100" style={{ backgroundColor: cfg.light }}>
                  <Leaf size={14} style={{ color: cfg.color }} />
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: cfg.color }}>
                    Nature & Bienfaits
                  </span>
                </div>
                <div className="p-4 space-y-4">
                  {product.posologie && (
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-1">Conseil d'utilisation</div>
                      <p className="text-sm text-gray-500 leading-relaxed">{product.posologie}</p>
                    </div>
                  )}
                  {product.ingredients && (
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-1">Composition</div>
                      <p className="text-sm text-gray-500 leading-relaxed">{product.ingredients}</p>
                    </div>
                  )}
                  {product.origin && (
                    <div>
                      <div className="text-xs font-bold text-gray-700 mb-1">Provenance</div>
                      <p className="text-sm italic text-gray-500">{product.origin}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {product.origin && !isCosmetique && pole !== "supplements" && (
              <div className="text-xs text-gray-400">Origine : <span className="italic">{product.origin}</span></div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

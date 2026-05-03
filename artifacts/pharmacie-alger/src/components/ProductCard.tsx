import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShoppingBag, Leaf, Stethoscope, Sparkles, Pill } from "lucide-react";
import type { Product } from "@workspace/api-client-react";
import { poleConfig, type Pole } from "@/lib/poleConfig";

const poleIcons: Record<Pole, React.ReactNode> = {
  medical: <Stethoscope size={12} />,
  paramedical: <Pill size={12} />,
  cosmetique: <Sparkles size={12} />,
  supplements: <Leaf size={12} />,
};

const poleBgGradient: Record<Pole, string> = {
  medical: "from-green-50 to-emerald-100/60",
  paramedical: "from-blue-50 to-blue-100/60",
  cosmetique: "from-rose-50 to-pink-100/60",
  supplements: "from-lime-50 to-green-100/60",
};

interface Props {
  product: Product;
  onAddToCart?: (productId: number) => void;
  index?: number;
}

export default function ProductCard({ product, onAddToCart, index = 0 }: Props) {
  const pole = product.pole as Pole;
  const cfg = poleConfig[pole] || poleConfig.medical;
  const gradient = poleBgGradient[pole] || poleBgGradient.medical;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col"
    >
      {/* Pole color accent strip */}
      <div className="h-0.5 w-full" style={{ backgroundColor: cfg.color }} />

      {/* Image area */}
      <Link href={`/produit/${product.id}`} className="block">
        <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-30">
              <span style={{ color: cfg.color }} className="text-5xl font-bold">{product.name.charAt(0)}</span>
            </div>
          )}
          {product.badge && (
            <span
              className="absolute top-3 right-3 text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: cfg.color }}
            >
              {product.badge.toUpperCase()}
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-xs font-semibold tracking-widest text-gray-400">ÉPUISÉ</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2">
          <span style={{ color: cfg.color }} className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase">
            {poleIcons[pole]}
            {cfg.label}
          </span>
          {product.category && (
            <>
              <span className="text-gray-300 text-[10px]">·</span>
              <span className="text-[10px] text-gray-400">{product.category}</span>
            </>
          )}
        </div>

        <Link href={`/produit/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#16a34a] transition-colors leading-snug mb-1.5 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {Number(product.price).toFixed(2)} <span className="text-sm font-medium text-gray-500">DZD</span>
            </span>
          </div>
          {onAddToCart && product.inStock && (
            <button
              onClick={() => onAddToCart(product.id)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: cfg.color }}
            >
              <ShoppingBag size={12} />
              Ajouter
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

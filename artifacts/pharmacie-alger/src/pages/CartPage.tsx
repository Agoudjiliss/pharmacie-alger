import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag, Gift, MapPin, Truck, ArrowRight, Package } from "lucide-react";
import { useCart, useRemoveFromCart } from "@/hooks/useCart";
import { poleConfig, type Pole } from "@/lib/poleConfig";

const deliveryOptions = [
  { id: "standard", label: "Livraison standard", desc: "2-3 jours ouvrés, Alger", icon: Truck, price: 0 },
  { id: "gift", label: "Emballage cadeau prestige", desc: "Coffret signé avec ruban", icon: Gift, price: 500 },
  { id: "retrait", label: "Retrait prioritaire en officine", desc: "Prêt en 2h — Grande Pharmacie d'Alger", icon: MapPin, price: 0 },
];

export default function CartPage() {
  const cart = useCart();
  const removeItem = useRemoveFromCart();
  const [delivery, setDelivery] = useState("retrait");

  const handleRemove = (itemId: number) => {
    removeItem.mutate(itemId);
  };

  const isLoading = false;

  const deliveryPrice = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const total = (cart?.total ?? 0) + deliveryPrice;

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="h-8 bg-gray-100 animate-pulse rounded-lg w-48 mb-8" />
        <div className="space-y-4">
          {[1, 2].map((i) => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-xl" />)}
        </div>
      </div>
    );
  }

  const isEmpty = cart.items.length === 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-xs tracking-[0.3em] text-[#16a34a] font-semibold mb-2 uppercase">Conciergerie</div>
          <h1 className="text-3xl font-semibold text-gray-900">Votre panier</h1>
        </div>
      </div>
      <div className="h-0.5 bg-[#16a34a] opacity-30" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 text-sm mb-8">Découvrez nos produits et commencez votre sélection.</p>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-[#16a34a] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#15803d] transition-colors"
            >
              Découvrir le catalogue <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Cart items */}
            <div className="lg:col-span-3 space-y-3">
              <div className="text-xs tracking-widest text-gray-400 font-semibold mb-4 uppercase">
                {cart.itemCount} article{cart.itemCount > 1 ? "s" : ""}
              </div>
              <AnimatePresence>
                {cart.items.map((item) => {
                  const pole = item.pole as Pole;
                  const cfg = poleConfig[pole] || poleConfig.medical;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl"
                      style={{ borderLeft: `3px solid ${cfg.color}` }}
                    >
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: cfg.light }}
                      >
                        {item.productImageUrl ? (
                          <img src={item.productImageUrl} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-2xl font-bold" style={{ color: cfg.color, opacity: 0.4 }}>
                            {item.productName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/produit/${item.productId}`} className="text-sm font-semibold text-gray-900 hover:text-[#16a34a] transition-colors line-clamp-1">
                          {item.productName}
                        </Link>
                        <div className="text-[10px] tracking-widest mt-0.5 font-bold uppercase" style={{ color: cfg.color }}>
                          {cfg.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">Qté : {item.quantity}</div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-sm font-bold text-gray-900">
                          {(item.price * item.quantity).toFixed(2)} DZD
                        </span>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-gray-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-5">Récapitulatif</h3>

                {/* Delivery options */}
                <div className="text-[10px] tracking-widest text-gray-400 font-semibold mb-3 uppercase">
                  Option de remise
                </div>
                <div className="space-y-2 mb-6">
                  {deliveryOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = delivery === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setDelivery(opt.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          active ? "border-[#16a34a] bg-green-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <Icon size={14} className={`mt-0.5 shrink-0 ${active ? "text-[#16a34a]" : "text-gray-400"}`} />
                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-semibold ${active ? "text-[#16a34a]" : "text-gray-700"}`}>
                              {opt.label}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5 leading-snug">{opt.desc}</div>
                          </div>
                          <div className="text-xs font-medium shrink-0 text-gray-400">
                            {opt.price > 0 ? `+${opt.price} DZD` : "Gratuit"}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-5">
                  <div className="flex justify-between text-gray-500">
                    <span>Sous-total</span>
                    <span>{cart.total.toFixed(2)} DZD</span>
                  </div>
                  {deliveryPrice > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <span>Emballage</span>
                      <span>+{deliveryPrice} DZD</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100 text-base">
                    <span>Total</span>
                    <span>{total.toFixed(2)} DZD</span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <ShoppingBag size={14} />
                  Confirmer ma commande
                </button>

                <div className="mt-3 text-center">
                  <Link href="/catalogue" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                    Continuer mes achats
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

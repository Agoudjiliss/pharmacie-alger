import { useState } from "react";
import { useSearch } from "wouter";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import {
  useListProducts,
  useListBesoins,
  type Product,
} from "@workspace/api-client-react";
import { useAddToCart } from "@/hooks/useCart";
import ProductCard from "@/components/ProductCard";
import { poleConfig, type Pole } from "@/lib/poleConfig";

const poles: { value: Pole | ""; label: string }[] = [
  { value: "", label: "Tout" },
  { value: "medical", label: "Médical" },
  { value: "paramedical", label: "Paramédical" },
  { value: "cosmetique", label: "Cosmétique" },
  { value: "supplements", label: "Compléments" },
];

export default function CataloguePage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const initialPole = (params.get("pole") || "") as Pole | "";
  const initialBesoin = params.get("besoin") || "";

  const [selectedPole, setSelectedPole] = useState<Pole | "">(initialPole);
  const [selectedBesoin, setSelectedBesoin] = useState(initialBesoin);
  const [searchQ, setSearchQ] = useState("");
  const { data: productsData, isLoading } = useListProducts({
    pole: selectedPole || undefined,
    besoin: selectedBesoin || undefined,
    search: searchQ || undefined,
    limit: 24,
    offset: 0,
  });

  const { data: besoins } = useListBesoins();
  const addToCart = useAddToCart();

  const handleAddToCart = (product: Product) => {
    addToCart.mutate({
      productId: product.id,
      quantity: 1,
      productName: product.name,
      productImageUrl: product.imageUrl ?? null,
      pole: product.pole,
      price: product.price,
    });
  };

  const products = productsData?.products || [];
  const total = productsData?.total || 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-xs tracking-[0.3em] text-[#16a34a] font-semibold mb-2 uppercase">Catalogue</div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900">
            {selectedPole ? poleConfig[selectedPole as Pole]?.label : "Tous nos produits"}
          </h1>
          {total > 0 && <p className="text-gray-400 text-sm mt-2">{total} produits</p>}
        </div>
      </div>
      <div className="h-0.5 bg-[#16a34a] opacity-30" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Pole tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {poles.map((p) => {
            const active = selectedPole === p.value;
            const cfg = p.value ? poleConfig[p.value as Pole] : null;
            return (
              <button
                key={p.value}
                onClick={() => { setSelectedPole(p.value); setSelectedBesoin(""); }}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                  active
                    ? "text-white border-transparent shadow-sm"
                    : "text-gray-700 border-gray-200 hover:border-[#16a34a] hover:text-[#16a34a] bg-white"
                }`}
                style={active ? { backgroundColor: cfg?.color ?? "#16a34a", borderColor: cfg?.color ?? "#16a34a" } : {}}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-56 shrink-0">
            {/* Search */}
            <div className="relative mb-6">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Rechercher..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30 focus:border-[#16a34a]"
              />
            </div>

            {/* Besoins */}
            {besoins && besoins.length > 0 && (
              <div>
                <div className="text-[10px] tracking-widest text-gray-400 font-semibold mb-3 uppercase">Par besoin</div>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedBesoin("")}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors font-medium ${!selectedBesoin ? "bg-green-50 text-[#16a34a]" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    Tous les besoins
                  </button>
                  {besoins.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBesoin(b.slug)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${selectedBesoin === b.slug ? "bg-green-50 text-[#16a34a] font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <span className="text-base leading-none">{b.icon}</span>
                      <span className="flex-1 leading-tight">{b.name}</span>
                      <span className="text-xs text-gray-400">{b.productCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear */}
            {(selectedBesoin || searchQ) && (
              <button
                onClick={() => { setSelectedBesoin(""); setSearchQ(""); }}
                className="mt-4 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X size={12} /> Effacer les filtres
              </button>
            )}
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 border border-gray-200 rounded-xl h-72 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-2xl font-semibold text-gray-300 mb-2">Aucun produit trouvé</div>
                <p className="text-sm text-gray-400">Essayez de modifier vos filtres.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} onAddToCart={() => handleAddToCart(p)} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

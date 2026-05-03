import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ChevronDown, Phone } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const soigneSante = [
  { label: "Médical", href: "/catalogue?pole=medical", desc: "Médicaments & soins" },
  { label: "Paramédical", href: "/catalogue?pole=paramedical", desc: "Matériel & orthopédie" },
];
const artDeVivre = [
  { label: "Cosmétique", href: "/catalogue?pole=cosmetique", desc: "Beauté & sensorialité" },
  { label: "Compléments", href: "/catalogue?pole=supplements", desc: "Énergie & rituels" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<"soin" | "art" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const cart = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const itemCount = cart.itemCount;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar — medical green */}
      <div className="bg-[#16a34a] text-white text-xs text-center py-2 tracking-widest font-medium">
        LA GRAND PHARMACIE D'ALGER &nbsp;·&nbsp; LIVRAISON À ALGER &nbsp;·&nbsp; CONSEIL PHARMACEUTIQUE GRATUIT
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 border-b border-gray-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group shrink-0">
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              La Grand Pharmacie
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#16a34a] uppercase font-medium mt-0.5">
              d'Alger
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {/* Soin & Santé */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenu("soin")}
              onMouseLeave={() => setMegaMenu(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors rounded-md hover:bg-green-50">
                Soin & Santé
                <ChevronDown size={14} className={`transition-transform ${megaMenu === "soin" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {megaMenu === "soin" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
                  >
                    {soigneSante.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2.5 rounded-md hover:bg-green-50 group transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900 group-hover:text-[#16a34a]">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <Link href="/ordonnance" className="block px-3 py-1.5 text-xs text-[#16a34a] font-medium hover:bg-green-50 rounded-md transition-colors">
                        Concierge Ordonnance →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Art de Vivre */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenu("art")}
              onMouseLeave={() => setMegaMenu(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#16a34a] transition-colors rounded-md hover:bg-green-50">
                Art de Vivre
                <ChevronDown size={14} className={`transition-transform ${megaMenu === "art" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {megaMenu === "art" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3"
                  >
                    {artDeVivre.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-3 py-2.5 rounded-md hover:bg-green-50 group transition-colors"
                      >
                        <div className="text-sm font-medium text-gray-900 group-hover:text-[#16a34a]">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/catalogue" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#16a34a] rounded-md hover:bg-green-50 transition-colors">
              Catalogue
            </Link>
            <Link href="/atelier" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#16a34a] rounded-md hover:bg-green-50 transition-colors">
              L'Atelier
            </Link>
            <Link href="/ordonnance" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#16a34a] rounded-md hover:bg-green-50 transition-colors">
              Ordonnance
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link href="/panier" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag size={20} className="text-gray-700" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#16a34a] text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-1"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-200 bg-white"
            >
              <div className="px-6 py-4 space-y-1">
                {[
                  { href: "/", label: "Accueil" },
                  { href: "/catalogue?pole=medical", label: "Médical" },
                  { href: "/catalogue?pole=paramedical", label: "Paramédical" },
                  { href: "/catalogue?pole=cosmetique", label: "Cosmétique" },
                  { href: "/catalogue?pole=supplements", label: "Compléments" },
                  { href: "/ordonnance", label: "Ordonnance" },
                  { href: "/atelier", label: "L'Atelier" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2.5 text-sm font-medium text-gray-700 hover:text-[#16a34a] border-b border-gray-100 last:border-0 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-24">
        <div className="h-1 bg-[#16a34a]" />
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="text-xl font-semibold text-white mb-1">La Grand Pharmacie</div>
            <div className="text-xs tracking-[0.25em] text-[#4ade80] mb-4 uppercase">D'Alger</div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Un héritage de soin et de confiance au cœur d'Alger. Quatre univers de bien-être, une expertise sans compromis.
            </p>
            <div className="flex items-center gap-2 mt-5 text-sm text-gray-400">
              <Phone size={14} className="text-[#4ade80]" />
              <span>Livraison à Alger · Conseil gratuit</span>
            </div>
          </div>
          <div>
            <div className="text-xs tracking-widest mb-4 text-[#4ade80] font-medium uppercase">Navigation</div>
            <div className="space-y-2 text-sm">
              {[
                ["Médical", "/catalogue?pole=medical"],
                ["Paramédical", "/catalogue?pole=paramedical"],
                ["Cosmétique", "/catalogue?pole=cosmetique"],
                ["Compléments", "/catalogue?pole=supplements"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="block text-gray-400 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs tracking-widest mb-4 text-[#4ade80] font-medium uppercase">Services</div>
            <div className="space-y-2 text-sm">
              {[
                ["Ordonnance", "/ordonnance"],
                ["Panier", "/panier"],
                ["L'Atelier", "/atelier"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="block text-gray-400 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 px-6 py-4 text-center text-xs text-gray-600">
          © 2025 La Grand Pharmacie d'Alger. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

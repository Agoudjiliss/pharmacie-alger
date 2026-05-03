import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="font-serif text-8xl font-light text-[hsl(40,45%,60%)] mb-4">404</div>
        <h1 className="font-serif text-3xl text-foreground mb-3">Page introuvable</h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
          Cette page ne semble pas exister dans notre officine.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(25,55%,30%)] hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={14} /> Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}

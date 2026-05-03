export function PrestigeModerne() {
  const poles = [
    { label: "Médical", sub: "Rigueur & Confiance", icon: "⚕", accent: "#1e3a5f" },
    { label: "Paramédical", sub: "Soin & Technologie", icon: "🩺", accent: "#1e3a5f" },
    { label: "Cosmétique", sub: "Beauté & Bien-être", icon: "✦", accent: "#1e3a5f" },
    { label: "Compléments", sub: "Énergie & Nature", icon: "◈", accent: "#1e3a5f" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fafaf8", minHeight: "100vh", color: "#1e3a5f" }}>
      {/* Announcement bar */}
      <div style={{ background: "#1e3a5f", color: "#e8d5a3", fontSize: 11.5, textAlign: "center", padding: "8px 0", letterSpacing: "0.12em", fontWeight: 500 }}>
        LA GRAND PHARMACIE D'ALGER &nbsp;·&nbsp; LIVRAISON À ALGER &nbsp;·&nbsp; CONSEIL PHARMACEUTIQUE GRATUIT
      </div>

      {/* Nav */}
      <nav style={{ background: "#fafaf8", borderBottom: "1px solid #e8dfc8", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 18, letterSpacing: "0.02em", lineHeight: 1.1, color: "#1e3a5f" }}>La Grand Pharmacie</div>
          <div style={{ fontSize: 10, color: "#b8a882", letterSpacing: "0.18em", marginTop: 2 }}>D'ALGER · DEPUIS 1962</div>
        </div>
        <div style={{ display: "flex", gap: 36, fontSize: 13, fontWeight: 500, color: "#4a5568", letterSpacing: "0.02em" }}>
          {["Soin & Santé", "Art de Vivre", "Catalogue", "L'Atelier", "Ordonnance"].map(n => (
            <span key={n} style={{ cursor: "pointer", padding: "26px 0", position: "relative", color: n === "Soin & Santé" ? "#1e3a5f" : undefined, borderBottom: n === "Soin & Santé" ? "2px solid #b8a882" : "2px solid transparent" }}>{n}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <div style={{ position: "relative" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span style={{ position: "absolute", top: -6, right: -6, background: "#b8a882", color: "#fff", fontSize: 9, fontWeight: 700, width: 14, height: 14, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>0</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 64px 72px", display: "flex", gap: 80, alignItems: "flex-start", background: "#fafaf8" }}>
        <div style={{ flex: 1.2 }}>
          <div style={{ width: 40, height: 2, background: "#b8a882", marginBottom: 28 }} />
          <p style={{ fontSize: 12, letterSpacing: "0.16em", color: "#b8a882", fontWeight: 500, margin: "0 0 16px" }}>ALGER — PHARMACIE AGRÉÉE</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 500, lineHeight: 1.18, letterSpacing: "-0.01em", margin: "0 0 24px", color: "#1e3a5f" }}>
            L'excellence pharmaceutique<br />
            <em style={{ fontStyle: "italic", color: "#4a6741" }}>au cœur d'Alger.</em>
          </h1>
          <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, margin: "0 0 40px", maxWidth: 460, fontWeight: 400 }}>
            Depuis 1962, nous accompagnons votre santé avec rigueur, discrétion et expertise. Quatre univers de bien-être réunis dans une seule expérience.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            <button style={{ background: "#1e3a5f", color: "#fafaf8", border: "none", padding: "13px 28px", fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.04em" }}>
              Découvrir le catalogue
            </button>
            <button style={{ background: "transparent", color: "#1e3a5f", border: "1px solid #c8b99a", padding: "13px 28px", fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.04em" }}>
              Concierge Ordonnance
            </button>
          </div>
        </div>

        {/* Poles */}
        <div style={{ width: 360, borderTop: "1px solid #e8dfc8" }}>
          {poles.map((p, i) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0", borderBottom: "1px solid #e8dfc8", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 18, width: 32, textAlign: "center" }}>{p.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 500, color: "#1e3a5f" }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{p.sub}</div>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8a882" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "0 64px 64px", background: "#fafaf8" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 500, margin: 0, color: "#1e3a5f" }}>Sélection du Pharmacien</h2>
          <span style={{ fontSize: 12, color: "#b8a882", letterSpacing: "0.08em", fontWeight: 500 }}>VOIR TOUT →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            { name: "Doliprane 1000mg", cat: "MÉDICAL", price: "350 DA" },
            { name: "Tensimeter Digital", cat: "PARAMÉDICAL", price: "12 500 DA" },
            { name: "Sérum Éclat Vitamine C", cat: "COSMÉTIQUE", price: "3 800 DA" },
            { name: "Oméga-3 Premium", cat: "COMPLÉMENTS", price: "1 650 DA" },
          ].map(p => (
            <div key={p.name} style={{ background: "#fff", border: "1px solid #ede8de", padding: 0, overflow: "hidden" }}>
              <div style={{ height: 160, background: "#f4f0e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 60, height: 80, background: "#e8dfc8", borderRadius: 4 }} />
              </div>
              <div style={{ padding: "16px 20px 20px" }}>
                <div style={{ fontSize: 10, color: "#b8a882", letterSpacing: "0.14em", fontWeight: 600, marginBottom: 8 }}>{p.cat}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#1e3a5f", marginBottom: 12, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#1e3a5f" }}>{p.price}</span>
                  <button style={{ background: "none", border: "1px solid #c8b99a", color: "#1e3a5f", fontSize: 12, padding: "6px 14px", cursor: "pointer", fontWeight: 500 }}>Ajouter</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ordonnance CTA */}
      <section style={{ background: "#1e3a5f", color: "#fafaf8", padding: "52px 64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 10, color: "#b8a882", letterSpacing: "0.14em", marginBottom: 10, fontWeight: 600 }}>CONCIERGE ORDONNANCE</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500, margin: "0 0 8px" }}>Envoyez votre ordonnance en toute discrétion</h3>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Nos pharmaciens préparent et livrent votre commande en 2 heures.</p>
        </div>
        <button style={{ background: "#b8a882", color: "#1e3a5f", border: "none", padding: "13px 28px", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
          Déposer une ordonnance →
        </button>
      </section>
    </div>
  );
}

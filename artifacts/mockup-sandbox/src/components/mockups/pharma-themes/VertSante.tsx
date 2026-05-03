export function VertSante() {
  const poles = [
    { label: "Médical", desc: "Rigueur, confiance, clarté médicale", color: "#155e4a", bg: "#ecfdf5", border: "#6ee7b7" },
    { label: "Paramédical", desc: "Efficacité, soin, technologie", color: "#1e4d7a", bg: "#eff6ff", border: "#93c5fd" },
    { label: "Cosmétique", desc: "Beauté, sensorialité, prestige", color: "#7c2d82", bg: "#fdf4ff", border: "#e879f9" },
    { label: "Compléments", desc: "Énergie, nature, rituels", color: "#3d6b21", bg: "#f0fdf4", border: "#86efac" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f7faf7", minHeight: "100vh", color: "#1a2e1a" }}>
      {/* Top bar */}
      <div style={{ background: "#155e4a", color: "#d1fae5", fontSize: 12, textAlign: "center", padding: "7px 0", letterSpacing: "0.08em" }}>
        Pharmacie agréée · Conseil expert gratuit · Livraison Alger en 2h
      </div>

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #d1e7d1", padding: "0 56px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: "#155e4a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1fae5" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 16, color: "#155e4a", lineHeight: 1 }}>La Grand Pharmacie</div>
            <div style={{ fontSize: 10, color: "#6b9e6b", letterSpacing: "0.12em", marginTop: 2 }}>D'ALGER · SOINS NATURELS & MÉDICAUX</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500, color: "#3d5a3d" }}>
          {["Médicaments", "Paramédical", "Cosmétique", "Compléments", "Ordonnance"].map(n => (
            <span key={n} style={{ cursor: "pointer", padding: "22px 0", borderBottom: n === "Médicaments" ? "2px solid #155e4a" : "2px solid transparent", color: n === "Médicaments" ? "#155e4a" : undefined }}>{n}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: "#ecfdf5", color: "#155e4a", border: "1px solid #6ee7b7", borderRadius: 20, padding: "7px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            🛒 Panier (0)
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "68px 80px 60px", background: "linear-gradient(160deg, #ecfdf5 0%, #f7faf7 60%)", display: "flex", gap: 72, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#d1fae5", color: "#065f46", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 20, marginBottom: 24, letterSpacing: "0.04em" }}>
            🌿 Pharmacie certifiée · Alger Centre
          </div>
          <h1 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 50, fontWeight: 400, lineHeight: 1.2, letterSpacing: "-0.01em", margin: "0 0 18px", color: "#155e4a" }}>
            Prendre soin de vous,<br />
            <span style={{ fontStyle: "italic" }}>naturellement.</span>
          </h1>
          <p style={{ fontSize: 16, color: "#4a7a4a", lineHeight: 1.75, margin: "0 0 36px", maxWidth: 460 }}>
            Médicaments de qualité, soins naturels et conseil expert — votre santé mérite une pharmacie qui vous ressemble.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button style={{ background: "#155e4a", color: "#fff", border: "none", borderRadius: 10, padding: "13px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Explorer le catalogue
            </button>
            <button style={{ background: "#fff", color: "#155e4a", border: "1px solid #6ee7b7", borderRadius: 10, padding: "13px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Envoyer une ordonnance
            </button>
          </div>
        </div>

        {/* Poles grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, width: 400 }}>
          {poles.map(p => (
            <div key={p.label} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 12, padding: "20px", cursor: "pointer" }}>
              <div style={{ fontSize: 15, fontFamily: "'Source Serif 4', serif", fontWeight: 600, color: p.color, marginBottom: 6 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Besoins */}
      <section style={{ padding: "44px 80px", background: "#fff", borderTop: "1px solid #d1e7d1", borderBottom: "1px solid #d1e7d1" }}>
        <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, fontWeight: 400, margin: "0 0 20px", color: "#155e4a" }}>Que recherchez-vous ?</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["💊 Douleur & Fièvre","🦠 Immunité","🫀 Tension","💤 Sommeil","☀️ Vitamine D","💆 Peau","🌿 Digestion","💪 Vitalité"].map(t => (
            <span key={t} style={{ background: "#f0fdf4", color: "#155e4a", fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 20, cursor: "pointer", border: "1px solid #a7f3d0" }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: "48px 80px", background: "#f7faf7" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, fontWeight: 400, margin: 0, color: "#155e4a" }}>Nos produits phares</h2>
          <span style={{ fontSize: 13, color: "#155e4a", fontWeight: 600, cursor: "pointer" }}>Voir tout →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { name: "Doliprane 1000mg", cat: "Médical", price: "350 DA", emoji: "💊", bg: "#ecfdf5", color: "#155e4a" },
            { name: "Tensiomètre Digital", cat: "Paramédical", price: "12 500 DA", emoji: "🩺", bg: "#eff6ff", color: "#1e4d7a" },
            { name: "Crème Hydra+ SPF 30", cat: "Cosmétique", price: "2 200 DA", emoji: "🌸", bg: "#fdf4ff", color: "#7c2d82" },
            { name: "Vitamine D3 2000 UI", cat: "Compléments", price: "890 DA", emoji: "🌿", bg: "#f0fdf4", color: "#3d6b21" },
          ].map(p => (
            <div key={p.name} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #d1e7d1" }}>
              <div style={{ height: 130, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                {p.emoji}
              </div>
              <div style={{ padding: "14px 16px 18px" }}>
                <div style={{ fontSize: 11, color: p.color, fontWeight: 600, letterSpacing: "0.04em", marginBottom: 6 }}>{p.cat}</div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 14, color: "#1a2e1a", marginBottom: 10, lineHeight: 1.35 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: p.color }}>{p.price}</span>
                  <button style={{ background: p.color, color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Ajouter</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ background: "#155e4a", color: "#fff", padding: "48px 80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, color: "#6ee7b7", letterSpacing: "0.1em", marginBottom: 8, fontWeight: 600 }}>🌿 CONCIERGE ORDONNANCE</div>
          <h3 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, fontWeight: 400, margin: "0 0 6px" }}>Envoyez votre ordonnance en ligne</h3>
          <p style={{ fontSize: 14, color: "#a7f3d0", margin: 0 }}>Nous préparons et livrons votre commande en 2 heures.</p>
        </div>
        <button style={{ background: "#d1fae5", color: "#155e4a", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
          Déposer une ordonnance →
        </button>
      </section>
    </div>
  );
}

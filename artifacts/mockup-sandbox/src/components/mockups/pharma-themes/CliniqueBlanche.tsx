export function CliniqueBlanche() {
  const poles = [
    { label: "Médical", count: 3, tag: "Prescription & OTC", color: "#16a34a", bg: "#f0fdf4" },
    { label: "Paramédical", count: 3, tag: "Matériel & Dispositifs", color: "#0369a1", bg: "#f0f9ff" },
    { label: "Cosmétique", count: 4, tag: "Soins & Beauté", color: "#7c3aed", bg: "#f5f3ff" },
    { label: "Compléments", count: 4, tag: "Nutrition & Bien-être", color: "#059669", bg: "#ecfdf5" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      {/* Top bar */}
      <div style={{ background: "#16a34a", color: "#fff", fontSize: 12, textAlign: "center", padding: "6px 0", letterSpacing: "0.06em" }}>
        LIVRAISON À ALGER · CONSEIL PHARMACEUTIQUE GRATUIT · ORDONNANCE EN LIGNE
      </div>

      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#16a34a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", lineHeight: 1 }}>La Grand Pharmacie</div>
            <div style={{ fontSize: 11, color: "#6b7280", letterSpacing: "0.08em" }}>D'ALGER · EST. 1962</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, fontWeight: 500, color: "#374151" }}>
          {["Médicaments", "Paramédical", "Cosmétique", "Compléments", "Ordonnance"].map(n => (
            <span key={n} style={{ cursor: "pointer", padding: "20px 0", borderBottom: n === "Médicaments" ? "2px solid #16a34a" : "2px solid transparent", color: n === "Médicaments" ? "#16a34a" : undefined }}>{n}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151" }}>Connexion</button>
          <button style={{ background: "#16a34a", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#fff" }}>Panier (0)</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb", padding: "64px 80px", display: "flex", gap: 80, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f0fdf4", color: "#16a34a", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 100, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, background: "#16a34a", borderRadius: "50%", display: "inline-block" }} />
            PHARMACIE AGRÉÉE · ALGER
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            Votre santé,<br />
            <span style={{ color: "#16a34a" }}>notre expertise.</span>
          </h1>
          <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.7, margin: "0 0 32px", maxWidth: 440 }}>
            Médicaments, matériel médical, cosmétique et compléments alimentaires — conseil pharmaceutique expert depuis 1962.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Consulter le catalogue</button>
            <button style={{ background: "#fff", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Envoyer une ordonnance</button>
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: 380 }}>
          {poles.map(p => (
            <div key={p.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "20px", borderLeft: `3px solid ${p.color}` }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: p.color, lineHeight: 1 }}>{p.count}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: "4px 0 2px" }}>{p.label}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{p.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category pills */}
      <section style={{ padding: "40px 80px", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Nos besoins fréquents</h2>
          <a style={{ fontSize: 13, color: "#16a34a", fontWeight: 500, textDecoration: "none" }}>Voir tout le catalogue →</a>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Douleur & Fièvre","Système immunitaire","Digestion","Tension artérielle","Peau & Cicatrices","Sommeil","Vitamine D","Cheveux & Ongles","Diabète","Allergie"].map(t => (
            <span key={t} style={{ background: "#f1f5f9", color: "#374151", fontSize: 13, fontWeight: 500, padding: "7px 14px", borderRadius: 100, cursor: "pointer", border: "1px solid #e2e8f0" }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Product row */}
      <section style={{ padding: "0 80px 56px", background: "#fff" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Produits vedettes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { name: "Doliprane 1000mg", cat: "Médical", price: "350 DA", badge: "OTC", color: "#16a34a" },
            { name: "Tensimeter Digital", cat: "Paramédical", price: "12 500 DA", badge: "Nouveau", color: "#0369a1" },
            { name: "Crème Hydratante SPF 30", cat: "Cosmétique", price: "2 200 DA", badge: "Bestseller", color: "#7c3aed" },
            { name: "Vitamine C 1000mg", cat: "Compléments", price: "890 DA", badge: "Stock limité", color: "#059669" },
          ].map(p => (
            <div key={p.name} style={{ background: "#f8fafc", borderRadius: 10, overflow: "hidden", border: "1px solid #e5e7eb" }}>
              <div style={{ height: 140, background: `linear-gradient(135deg,${p.color}11,${p.color}22)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 56, height: 56, background: p.color, borderRadius: 12, opacity: 0.15 }} />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: p.color, fontWeight: 600, letterSpacing: "0.05em" }}>{p.cat}</span>
                  <span style={{ fontSize: 11, background: p.color + "18", color: p.color, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>{p.badge}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 8, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{p.price}</span>
                  <button style={{ background: p.color, color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Panier</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Ordonnance */}
      <section style={{ background: "#f0fdf4", borderTop: "1px solid #bbf7d0", padding: "40px 80px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>Envoyez votre ordonnance en ligne</h3>
          <p style={{ fontSize: 14, color: "#4b5563", margin: 0 }}>Nos pharmaciens préparent votre commande et vous rappellent sous 2h.</p>
        </div>
        <button style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>Déposer une ordonnance →</button>
      </section>
    </div>
  );
}

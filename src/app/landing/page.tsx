import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="landing-root">
      {/* ── NAV ── */}
      <nav className="landing-nav">
        <div className="nav-inner">
          <div className="nav-brand">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="logo-img" />
            <span className="nav-title">THE ENFORCER</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#screenshots">Screenshots</a>
            <a href="#download">Download</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">🔴 North Karnataka Underworld</div>
          <Image src="/logo.png" alt="The Enforcer" width={100} height={100} className="hero-logo" />
          <h1 className="hero-title">THE ENFORCER</h1>
          <p className="hero-sub">
            Rule with fear. Buy silence. Earn loyalty.<br />
            One wrong move — and you're finished.
          </p>
          <p className="hero-desc">
            A dark, swipe-driven decision game set in the iron mines, back-alleys, and
            political corridors of North Karnataka. 15 days. 4 meters. No mercy.
          </p>
          <div className="hero-ctas">
            <Link href="/game" className="btn-primary">
              ▶ Play in Browser
            </Link>
            <a href="#download" className="btn-secondary">
              📱 Download APK
            </a>
          </div>
        </div>
      </section>

      {/* ── METERS ── */}
      <section id="features" className="features">
        <div className="section-inner">
          <p className="section-eyebrow">The Four Pillars of Power</p>
          <h2 className="section-title">Balance or Die</h2>
          <p className="section-desc">
            Every decision shifts your power meters. Let any one hit 0 or 100 — and your story ends.
          </p>
          <div className="meters-grid">
            {[
              { icon: "💰", name: "Wealth", color: "#eab308", low: "Bankrupt. The gang abandoned you.", high: "Too rich — a rival cartel had you killed." },
              { icon: "🩸", name: "Fear", color: "#a855f7", low: "Nobody fears you. A rival don walked in.", high: "Terror overflowed. The city revolted." },
              { icon: "🚓", name: "Heat", color: "#ef4444", low: "Police got comfortable. They raided everything.", high: "Military called in. You're in a black site." },
              { icon: "🤝", name: "Loyalty", color: "#3b82f6", low: "Lieutenants mutinied. Assassinated at dinner.", high: "Men got sloppy. A rival caught you off guard." },
            ].map((m) => (
              <div key={m.name} className="meter-card">
                <div className="meter-icon">{m.icon}</div>
                <h3 className="meter-name" style={{ color: m.color }}>{m.name}</h3>
                <div className="meter-bar-wrap">
                  <div className="meter-bar-bg">
                    <div className="meter-bar-fill" style={{ background: m.color }} />
                  </div>
                  <span className="meter-val">50</span>
                </div>
                <div className="meter-extremes">
                  <span>⬇️ {m.low}</span>
                  <span>⬆️ {m.high}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO PLAY ── */}
      <section className="howto">
        <div className="section-inner">
          <p className="section-eyebrow">Gameplay</p>
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            {[
              { n: "01", title: "Read the Scenario", desc: "A situation unfolds — corrupt politicians, rival dons, police inspectors, your own men." },
              { n: "02", title: "Swipe to Decide", desc: "Swipe RIGHT to Accept. Swipe LEFT to Refuse. Or tap the buttons below the card." },
              { n: "03", title: "Watch Your Meters", desc: "Every choice ripples through your 4 stats. No decision is clean. Everything has a consequence." },
              { n: "04", title: "Survive 15 Days", desc: "Keep all 4 meters between 1–99 through all 15 scenarios. Only then do you truly rule." },
            ].map((s) => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCREENSHOTS ── */}
      <section id="screenshots" className="screenshots">
        <div className="section-inner">
          <p className="section-eyebrow">In Action</p>
          <h2 className="section-title">Screenshots</h2>
          <div className="screenshots-grid">
            <div className="screenshot-wrap">
              <Image src="/gameplay.png" alt="Gameplay" width={600} height={400} className="screenshot-img" />
              <p className="screenshot-label">Swipe card gameplay</p>
            </div>
            <div className="screenshot-wrap">
              <Image src="/endgame.png" alt="End Game Screens" width={600} height={400} className="screenshot-img" />
              <p className="screenshot-label">Victory & Game Over screens</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ── */}
      <section id="download" className="download">
        <div className="dl-glow" />
        <div className="section-inner dl-inner">
          <div className="dl-icon">📲</div>
          <h2 className="dl-title">Take it with you</h2>
          <p className="dl-desc">
            The Enforcer is built with Capacitor — available as a native Android app.
            Install it directly on your phone for the full immersive experience.
          </p>
          <div className="dl-buttons">
            <a
              href="/enforcer.apk"
              download
              className="btn-apk"
            >
              <span className="apk-icon">⬇</span>
              <div className="apk-text">
                <span className="apk-label">Download for Android</span>
                <span className="apk-sub">Free · APK · v0.1.0</span>
              </div>
            </a>
            <Link href="/game" className="btn-browser">
              Play in Browser →
            </Link>
          </div>
          <p className="dl-note">
            * Enable &quot;Install from unknown sources&quot; in Android settings before installing.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Image src="/logo.png" alt="Logo" width={28} height={28} className="logo-img" />
            <span>THE ENFORCER</span>
          </div>
          <p className="footer-tagline">Balance is power · North Karnataka · 2025</p>
          <div className="footer-links">
            <a href="https://github.com/prashant13-bh/The-Enforcer" target="_blank" rel="noopener noreferrer">GitHub</a>
            <Link href="/game">Play Game</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

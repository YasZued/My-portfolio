import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Metrics", "Experience", "Stack", "Projects", "Contact"];

const METRICS = [
  { value: "200+", label: "Deals Closed", sub: "in 8 months at CHM Automotive" },
  { value: "25+", label: "Monthly Average", sub: "consistent pipeline velocity" },
  { value: "6+", label: "Years in Sales", sub: "B2B commercial experience" },
  { value: "C1", label: "English Fluency", sub: "+ Arabic native · French B1" },
];

const EXPERIENCE = [
  {
    role: "Sales & Marketing Specialist",
    company: "CHM Automotive",
    period: "Jul 2025 – Mar 2026",
    type: "Full-time · Remote-compatible",
    color: "#00FFB2",
    tags: ["HubSpot", "Outbound", "CRM", "Cold Calling", "Apollo.io"],
    bullets: [
      "Executed high-volume daily outbound — phone, WhatsApp, email, DMs — closing 200+ deals in 8 months (avg. 25+/mo)",
      "Structured discovery calls to qualify leads: decision makers, budget, timeline, close",
      "Owned full CRM pipeline in HubSpot — record-keeping, follow-up cadence, deal stage tracking",
      "Closed pre-delivery contracts for imported vehicles; high-trust B2B requiring advanced objection handling",
      "Built multi-channel campaigns across Instagram, Facebook & TikTok → email nurture → booked appointments",
    ],
  },
  {
    role: "Sales & Operations Associate",
    company: "Family Business — Agricultural Equipment",
    period: "2019 – 2025 · Part-time",
    type: "6-year B2B commercial role",
    color: "#3B82F6",
    tags: ["Negotiation", "B2B Sales", "Market Research", "Supplier Relations"],
    bullets: [
      "Managed direct B2B sales of agricultural machinery, parts, and motors to local and regional buyers",
      "Negotiated pricing and terms with suppliers and clients; researched competitor pricing",
      "Built repeat-client book through long-term relationship management",
    ],
  },
];

const STACK = [
  { name: "HubSpot", icon: "🟠", desc: "Daily CRM ops" },
  { name: "Apollo.io", icon: "🚀", desc: "Lead prospecting" },
  { name: "Zoho CRM", icon: "🔵", desc: "Pipeline mgmt" },
  { name: "LinkedIn Sales Nav", icon: "🔗", desc: "Outbound intel" },
  { name: "Hunter.io", icon: "🎯", desc: "Email verification" },
  { name: "Meta Business", icon: "📘", desc: "Campaign mgmt" },
  { name: "Calendly", icon: "📅", desc: "Booking automation" },
  { name: "Salesforce", icon: "☁️", desc: "Enterprise CRM" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedCounter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const step = num / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{typeof count === "number" ? count + suffix : count}</span>;
}

function Tag({ label, color = "#00FFB2" }) {
  return (
    <span style={{
      border: `1px solid ${color}33`,
      color: color,
      background: `${color}11`,
      padding: "2px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontFamily: "monospace",
      letterSpacing: "0.05em",
      fontWeight: 600,
    }}>{label}</span>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
      body { background: #080B0F; color: #E2E8F0; font-family: 'DM Sans', sans-serif; }
      ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0D1117; } ::-webkit-scrollbar-thumb { background: #00FFB2; border-radius: 2px; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
      @keyframes scanline { 0%,100% { opacity:0.03; } 50% { opacity:0.07; } }
      @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
      @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      .fade-up { animation: fadeUp 0.7s ease both; }
      .delay-1 { animation-delay: 0.1s; }
      .delay-2 { animation-delay: 0.2s; }
      .delay-3 { animation-delay: 0.3s; }
      .delay-4 { animation-delay: 0.4s; }
      .delay-5 { animation-delay: 0.55s; }
      .delay-6 { animation-delay: 0.7s; }
      .metric-card:hover { transform: translateY(-4px); border-color: #00FFB233 !important; }
      .stack-card:hover { transform: translateY(-3px) scale(1.03); border-color: #00FFB244 !important; background: #0E1620 !important; }
      .exp-card:hover .exp-dot { box-shadow: 0 0 0 6px #00FFB222 !important; }
      .nav-link:hover { color: #00FFB2 !important; }
      .cta-btn:hover { background: #00FFB2 !important; color: #080B0F !important; transform: translateY(-2px); box-shadow: 0 8px 32px #00FFB244 !important; }
      .cta-btn-ghost:hover { border-color: #00FFB2 !important; color: #00FFB2 !important; background: #00FFB211 !important; }
      .proj-card:hover { border-color: #00FFB244 !important; transform: translateY(-4px); }
      .proj-card:hover .proj-arrow { opacity: 1 !important; transform: translateX(4px) !important; }
      .send-btn:hover { background: #00E5A0 !important; transform: translateY(-1px); }
      .form-input:focus { border-color: #00FFB2 !important; outline: none; box-shadow: 0 0 0 2px #00FFB211; }
      .cursor { animation: blink 1s step-end infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [heroRef, heroIn] = useInView(0.1);
  const [metricsRef, metricsIn] = useInView(0.1);
  const [expRef, expIn] = useInView(0.1);
  const [stackRef, stackIn] = useInView(0.1);
  const [projRef, projIn] = useInView(0.1);
  const [ctaRef, ctaIn] = useInView(0.1);

  return (
    <div style={{ background: "#080B0F", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(8,11,15,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid #1E2A38",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(16px,4vw,48px)", height: 60,
      }}>
        <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 16, color: "#00FFB2", letterSpacing: "-0.02em" }}>
          AM<span style={{ color: "#3B82F6" }}>.</span>
        </span>
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#8899AA", fontSize: 13, fontFamily: "DM Sans", fontWeight: 500, letterSpacing: "0.03em", transition: "color 0.2s" }}>
              {l}
            </button>
          ))}
          <button className="cta-btn" onClick={() => scrollTo("contact")} style={{
            background: "transparent", border: "1px solid #00FFB2", color: "#00FFB2",
            padding: "6px 18px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600,
            fontFamily: "DM Sans", transition: "all 0.25s",
          }}>Hire Me</button>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#E2E8F0", fontSize: 22 }} id="hamburger">
          {menuOpen ? "✕" : "☰"}
        </button>
        <style>{`@media(max-width:768px){.desktop-nav{display:none!important;}#hamburger{display:block!important;}}`}</style>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
          background: "#0D1117", borderBottom: "1px solid #1E2A38",
          display: "flex", flexDirection: "column", padding: "16px 24px 24px", gap: 8,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: "none", border: "none", cursor: "pointer", color: "#CBD5E1",
              fontSize: 15, textAlign: "left", padding: "10px 0", fontFamily: "DM Sans",
              borderBottom: "1px solid #1E2A38",
            }}>{l}</button>
          ))}
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="about" ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "120px clamp(20px,6vw,96px) 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* BG grid */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(0,255,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.04) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        {/* glow blob */}
        <div style={{
          position: "absolute", top: "20%", right: "-10%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(0,255,178,0.08) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-5%", width: 300, height: 300,
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
          {heroIn && <>
            <div className="fade-up delay-1" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#00FFB211", border: "1px solid #00FFB233", borderRadius: 20,
              padding: "4px 14px", marginBottom: 28,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00FFB2", boxShadow: "0 0 8px #00FFB2", display: "inline-block", position: "relative" }}>
                <span style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1.5px solid #00FFB2", animation: "pulse-ring 1.8s ease-out infinite", opacity: 0.6 }} />
              </span>
              <span style={{ fontSize: 11, color: "#00FFB2", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Open to Remote · US / EU Hours</span>
            </div>

            <h1 className="fade-up delay-2" style={{
              fontFamily: "Syne", fontWeight: 800, lineHeight: 1.05,
              fontSize: "clamp(38px, 6.5vw, 76px)", color: "#F1F5F9", marginBottom: 12,
              letterSpacing: "-0.03em",
            }}>
              Abdelatif<br />
              <span style={{ color: "#00FFB2" }}>Meddour</span>
            </h1>

            <div className="fade-up delay-3" style={{
              fontFamily: "Syne", fontWeight: 700, fontSize: "clamp(18px, 3vw, 28px)",
              color: "#64748B", marginBottom: 24, letterSpacing: "-0.01em",
            }}>
              SaaS BDR & CRM Specialist<span className="cursor" style={{ color: "#00FFB2", marginLeft: 3 }}>_</span>
            </div>

            <p className="fade-up delay-4" style={{
              fontSize: "clamp(14px, 1.8vw, 17px)", color: "#8899AA", lineHeight: 1.75,
              maxWidth: 580, marginBottom: 40, fontWeight: 400,
            }}>
              B2B outbound specialist with <strong style={{ color: "#CBD5E1" }}>200+ closed deals</strong>, HubSpot ownership, and 6+ years building pipelines from scratch. Fluent in English, native Arabic. Built for remote-first, results-driven teams.
            </p>

            <div className="fade-up delay-5" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="cta-btn" onClick={() => scrollTo("metrics")} style={{
                background: "#00FFB2", color: "#080B0F", border: "none",
                padding: "13px 28px", borderRadius: 8, cursor: "pointer",
                fontFamily: "Syne", fontWeight: 700, fontSize: 14, letterSpacing: "0.02em",
                transition: "all 0.25s", boxShadow: "0 4px 24px #00FFB233",
              }}>View My Wins →</button>
              <button className="cta-btn-ghost" onClick={() => scrollTo("contact")} style={{
                background: "transparent", color: "#94A3B8", border: "1px solid #2A3A4A",
                padding: "13px 28px", borderRadius: 8, cursor: "pointer",
                fontFamily: "DM Sans", fontWeight: 500, fontSize: 14,
                transition: "all 0.25s",
              }}>Get In Touch</button>
            </div>

            <div className="fade-up delay-6" style={{ display: "flex", gap: 28, marginTop: 52, flexWrap: "wrap" }}>
              {["Cold Calling", "HubSpot CRM", "Apollo.io", "LinkedIn Sales Nav", "Email Sequences"].map(t => (
                <span key={t} style={{ fontSize: 12, color: "#4A5568", fontFamily: "monospace", letterSpacing: "0.04em" }}>// {t}</span>
              ))}
            </div>
          </>}
        </div>
      </section>

      {/* ─── METRICS BAR ─── */}
      <section id="metrics" ref={metricsRef} style={{
        padding: "80px clamp(20px,6vw,96px)",
        borderTop: "1px solid #1E2A38", borderBottom: "1px solid #1E2A38",
        background: "#0A0E14",
      }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          {metricsIn && <>
            <div className="fade-up" style={{ fontSize: 11, color: "#00FFB2", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Performance Metrics</div>
            <h2 className="fade-up delay-1" style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(26px,4vw,40px)", color: "#F1F5F9", letterSpacing: "-0.02em" }}>
              Numbers that speak.
            </h2>
          </>}
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20, maxWidth: 960, margin: "0 auto",
        }}>
          {METRICS.map((m, i) => (
            metricsIn && <div key={m.label} className={`metric-card fade-up delay-${i + 1}`} style={{
              background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 12,
              padding: "32px 28px", textAlign: "center", transition: "all 0.3s",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #00FFB2, transparent)" }} />
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(36px,4vw,52px)", color: "#00FFB2", letterSpacing: "-0.03em", lineHeight: 1 }}>
                <AnimatedCounter target={m.value.replace(/[^0-9]/g, "") || m.value} suffix={m.value.includes("+") ? "+" : ""} />
              </div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, color: "#CBD5E1", marginTop: 8, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: "#4A5568", fontFamily: "DM Sans" }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" ref={expRef} style={{ padding: "100px clamp(20px,6vw,96px)", background: "#080B0F" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {expIn && <>
            <div className="fade-up" style={{ fontSize: 11, color: "#3B82F6", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Career Timeline</div>
            <h2 className="fade-up delay-1" style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(26px,4vw,40px)", color: "#F1F5F9", letterSpacing: "-0.02em", marginBottom: 56 }}>
              Where I've shipped results.
            </h2>
          </>}

          <div style={{ position: "relative" }}>
            {/* vertical line */}
            <div style={{ position: "absolute", left: 22, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #00FFB233, #3B82F633, transparent)" }} />

            {EXPERIENCE.map((exp, idx) => (
              expIn && <div key={exp.company} className={`exp-card fade-up delay-${idx + 2}`} style={{ display: "flex", gap: 28, marginBottom: 52, position: "relative" }}>
                {/* dot */}
                <div style={{ flexShrink: 0, marginTop: 4 }}>
                  <div className="exp-dot" style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: `${exp.color}18`, border: `2px solid ${exp.color}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, transition: "box-shadow 0.3s", zIndex: 1, position: "relative",
                  }}>🎯</div>
                </div>

                <div style={{ flex: 1, background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 12, padding: "28px 28px", transition: "all 0.3s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                    <div>
                      <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 17, color: "#F1F5F9" }}>{exp.role}</div>
                      <div style={{ fontFamily: "DM Sans", fontSize: 13, color: exp.color, fontWeight: 600, marginTop: 2 }}>{exp.company}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#64748B", fontFamily: "monospace" }}>{exp.period}</div>
                      <div style={{ fontSize: 11, color: "#4A5568", marginTop: 2 }}>{exp.type}</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "14px 0" }}>
                    {exp.tags.map(t => <Tag key={t} label={t} color={exp.color} />)}
                  </div>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "#8899AA", lineHeight: 1.6 }}>
                        <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>▸</span>
                        <span dangerouslySetInnerHTML={{ __html: b.replace(/HubSpot|Outbound|Apollo\.io|CRM|discovery/gi, m => `<strong style="color:#CBD5E1">${m}</strong>`) }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Education node */}
            {expIn && <div className="fade-up delay-4" style={{ display: "flex", gap: 28 }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#7C3AED18", border: "2px solid #7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎓</div>
              </div>
              <div style={{ flex: 1, background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 12, padding: "24px 28px" }}>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: "#F1F5F9" }}>MSc Services Marketing · BA International Commerce</div>
                <div style={{ fontSize: 13, color: "#7C3AED", fontWeight: 600, marginTop: 4 }}>University of Batna · 2021 – 2025</div>
                <div style={{ fontSize: 13, color: "#64748B", marginTop: 8 }}>Thesis: <em>The Impact of Digital Marketing on Enhancing CRM</em></div>
              </div>
            </div>}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section id="stack" ref={stackRef} style={{ padding: "100px clamp(20px,6vw,96px)", background: "#0A0E14", borderTop: "1px solid #1E2A38" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {stackIn && <>
            <div className="fade-up" style={{ fontSize: 11, color: "#00FFB2", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Toolset</div>
            <h2 className="fade-up delay-1" style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(26px,4vw,40px)", color: "#F1F5F9", letterSpacing: "-0.02em", marginBottom: 48, textAlign: "center" }}>Tech stack I ship with.</h2>
          </>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
            {STACK.map((s, i) => (
              stackIn && <div key={s.name} className={`stack-card fade-up delay-${(i % 5) + 1}`} style={{
                background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 10,
                padding: "22px 18px", textAlign: "center", cursor: "default",
                transition: "all 0.25s",
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 13, color: "#E2E8F0", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "#4A5568", fontFamily: "DM Sans" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" ref={projRef} style={{ padding: "100px clamp(20px,6vw,96px)", background: "#080B0F" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {projIn && <>
            <div className="fade-up" style={{ fontSize: 11, color: "#3B82F6", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Featured Project</div>
            <h2 className="fade-up delay-1" style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(26px,4vw,40px)", color: "#F1F5F9", letterSpacing: "-0.02em", marginBottom: 48 }}>What I've built.</h2>
          </>}

          {projIn && <div className="proj-card fade-up delay-2" style={{
            background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 16,
            padding: "40px", transition: "all 0.3s", cursor: "pointer", position: "relative", overflow: "hidden",
          }}>
            {/* top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00FFB2, #3B82F6)" }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 200, height: 200, background: "radial-gradient(circle, rgba(0,255,178,0.05), transparent 70%)", pointerEvents: "none" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>🌾</span>
                  <div>
                    <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: "#F1F5F9", letterSpacing: "-0.01em" }}>MeddourAgricolOs</div>
                    <div style={{ fontSize: 12, color: "#00FFB2", fontFamily: "monospace", fontWeight: 600 }}>Custom CRM · Inventory System · Sales Ops</div>
                  </div>
                </div>
              </div>
              <span className="proj-arrow" style={{ fontSize: 20, color: "#00FFB2", opacity: 0.4, transition: "all 0.3s" }}>→</span>
            </div>

            <p style={{ fontSize: 14.5, color: "#8899AA", lineHeight: 1.75, marginBottom: 24, maxWidth: 620 }}>
              A proprietary operations platform built from the ground up to manage inventory, client relationships, and sales pipelines for the family agricultural equipment business. Combines CRM logic with stock tracking and supplier management — purpose-built where off-the-shelf tools fell short.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Client Database", desc: "Contact records, interaction history, follow-up cadence" },
                { label: "Inventory Tracking", desc: "Parts, machinery & motors — real-time stock levels" },
                { label: "Pipeline Management", desc: "Deal stages from prospect to closed — custom workflow" },
                { label: "Supplier Records", desc: "Pricing history, negotiation notes, reorder logic" },
              ].map(f => (
                <div key={f.label} style={{ background: "#111820", borderRadius: 8, padding: "16px", border: "1px solid #1A2535" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#CBD5E1", fontFamily: "Syne", marginBottom: 6 }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: "#4A5568", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["CRM Architecture", "Inventory Logic", "Pipeline Automation", "Data Entry", "Reporting"].map(t => (
                <Tag key={t} label={t} color="#00FFB2" />
              ))}
            </div>
          </div>}
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" ref={ctaRef} style={{ padding: "100px clamp(20px,6vw,96px) 80px", background: "#0A0E14", borderTop: "1px solid #1E2A38" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {ctaIn && <>
            <div className="fade-up" style={{ fontSize: 11, color: "#00FFB2", fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Contact</div>
            <h2 className="fade-up delay-1" style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(28px,4.5vw,48px)", color: "#F1F5F9", letterSpacing: "-0.02em", marginBottom: 12, textAlign: "center" }}>
              Let's close something together.
            </h2>
            <p className="fade-up delay-2" style={{ fontSize: 15, color: "#64748B", textAlign: "center", marginBottom: 48, lineHeight: 1.7 }}>
              Open to SDR, BDR, or lead generation roles with remote-first teams operating in US or EU time zones.
            </p>

            {/* Links */}
            <div className="fade-up delay-2" style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 44, flexWrap: "wrap" }}>
              <a href="mailto:abdelatifmeddour@gmail.com" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 8,
                padding: "12px 20px", color: "#CBD5E1", textDecoration: "none",
                fontSize: 13, fontFamily: "DM Sans", fontWeight: 500, transition: "all 0.2s",
              }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#00FFB244"; e.currentTarget.style.color = "#00FFB2"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E2A38"; e.currentTarget.style.color = "#CBD5E1"; }}>
                ✉ abdelatifmeddour@gmail.com
              </a>
              <a href="https://linkedin.com/in/abdelatifmeddour" target="_blank" rel="noreferrer" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 8,
                padding: "12px 20px", color: "#CBD5E1", textDecoration: "none",
                fontSize: 13, fontFamily: "DM Sans", fontWeight: 500, transition: "all 0.2s",
              }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#3B82F644"; e.currentTarget.style.color = "#3B82F6"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E2A38"; e.currentTarget.style.color = "#CBD5E1"; }}>
                🔗 linkedin.com/in/abdelatifmeddour
              </a>
            </div>

            {/* Contact Form */}
            {formSent ? (
              <div className="fade-up" style={{ textAlign: "center", padding: "48px", background: "#0D1117", border: "1px solid #00FFB233", borderRadius: 12 }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 20, color: "#00FFB2", marginBottom: 8 }}>Message sent!</div>
                <div style={{ fontSize: 14, color: "#64748B" }}>Abdelatif will get back to you shortly.</div>
              </div>
            ) : (
              <div className="fade-up delay-3" style={{ background: "#0D1117", border: "1px solid #1E2A38", borderRadius: 12, padding: "36px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {["name", "email"].map(field => (
                      <div key={field}>
                        <label style={{ fontSize: 11, color: "#4A5568", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{field}</label>
                        <input className="form-input" type={field === "email" ? "email" : "text"} value={formData[field]}
                          onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                          placeholder={field === "name" ? "Your name" : "you@company.com"}
                          style={{
                            width: "100%", background: "#111820", border: "1px solid #1E2A38",
                            borderRadius: 8, padding: "11px 14px", color: "#E2E8F0",
                            fontSize: 14, fontFamily: "DM Sans", transition: "border-color 0.2s",
                          }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#4A5568", fontFamily: "monospace", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>message</label>
                    <textarea className="form-input" rows={4} value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell me about the role or opportunity..."
                      style={{
                        width: "100%", background: "#111820", border: "1px solid #1E2A38",
                        borderRadius: 8, padding: "11px 14px", color: "#E2E8F0",
                        fontSize: 14, fontFamily: "DM Sans", resize: "vertical", transition: "border-color 0.2s",
                      }} />
                  </div>
                  <button className="send-btn" onClick={() => { if (formData.name && formData.email && formData.message) setFormSent(true); }} style={{
                    background: "#00FFB2", color: "#080B0F", border: "none", borderRadius: 8,
                    padding: "13px", fontFamily: "Syne", fontWeight: 700, fontSize: 14,
                    cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em",
                  }}>Send Message →</button>
                </div>
              </div>
            )}
          </>}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1E2A38", padding: "28px clamp(20px,6vw,96px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 15, color: "#00FFB2" }}>AM<span style={{ color: "#3B82F6" }}>.</span></span>
        <span style={{ fontSize: 12, color: "#2A3A4A", fontFamily: "monospace" }}>© 2026 Abdelatif Meddour · Built for results.</span>
        <span style={{ fontSize: 12, color: "#2A3A4A" }}>Batna, Algeria · Remote-first</span>
      </footer>
    </div>
  );
}

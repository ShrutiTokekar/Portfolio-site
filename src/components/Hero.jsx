import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import imgShruti  from "../assets/Shruti.png";
import imgTokekar from "../assets/Tokekar.png";
import imgDes     from "../assets/Des.png";
import imgDev     from "../assets/dev.png";

import Terminal   from "./Terminal";

const PARTICLES = [
  { dx:  110, dy: -35, size: 5, dur: 0.90 },
  { dx: -120, dy: -25, size: 5, dur: 0.80 },
  { dx:   65, dy: -90, size: 5, dur: 1.00 },
  { dx:  -75, dy: -80, size: 5, dur: 0.70 },
  { dx:   85, dy:  65, size: 5, dur: 0.85 },
  { dx:  -95, dy:  60, size: 5, dur: 0.75 },
  { dx:  140, dy:  20, size: 3, dur: 0.95 },
  { dx: -130, dy:  28, size: 3, dur: 0.65 },
];

const KEYFRAMES = `
  @keyframes crashDown {
    0%   { transform: translateY(-130vh); }
    74%  { transform: translateY(6px); }
    83%  { transform: translateY(-10px); }
    91%  { transform: translateY(5px); }
    97%  { transform: translateY(-2px); }
    100% { transform: translateY(0); }
  }
  @keyframes crashUp {
    0%   { transform: translateY(130vh); }
    74%  { transform: translateY(-6px); }
    83%  { transform: translateY(10px); }
    91%  { transform: translateY(-5px); }
    97%  { transform: translateY(2px); }
    100% { transform: translateY(0); }
  }
  @keyframes shockwave {
    0%   { opacity: 0;   transform: translate(-50%,-50%) scaleX(0)    scaleY(1); }
    18%  { opacity: 1;   transform: translate(-50%,-50%) scaleX(1)    scaleY(7); }
    65%  { opacity: 0.4; transform: translate(-50%,-50%) scaleX(1.05) scaleY(2.5); }
    100% { opacity: 0;   transform: translate(-50%,-50%) scaleX(1.1)  scaleY(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scrollPulse {
    0%,100% { opacity: 0.4; transform: scaleY(1); }
    50%     { opacity: 0.9; transform: scaleY(0.6); }
  }
  ${PARTICLES.map((p, i) => `
    @keyframes pFly${i} {
      0%   { opacity: 1; transform: translate(-50%,-50%); }
      100% { opacity: 0; transform: translate(calc(-50% + ${p.dx}px), calc(-50% + ${p.dy}px)); }
    }
  `).join("")}
`;

function PortalCard({ to, img, alt, label, title, accent = "#9a8aaa" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-end",
        width: 210, height: 255,
        borderRadius: 8, overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(100,90,80,0.30)" : "rgba(100,90,80,0.14)"}`,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(6px)",
        padding: "26px 18px",
        textDecoration: "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 48px rgba(0,0,0,0.10)" : "none",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(237,234,228,0.97) 0%, rgba(237,234,228,0.55) 42%, transparent 68%)",
      }} />

      {img ? (
        <img src={img} alt={alt} draggable={false} style={{
          position: "absolute", top: 18, width: "78%", height: "auto",
          objectFit: "contain", zIndex: 2,
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.12))",
          transform: hovered ? "scale(1.10) translateY(-5px)" : "scale(1) translateY(0)",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }} />
      ) : (
        <div style={{
          position: "absolute", top: 18, width: "78%", height: 120, zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
          borderRadius: 8,
          transform: hovered ? "scale(1.08) translateY(-4px)" : "scale(1)",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <span style={{
            fontFamily: "'Fraunces', serif", fontStyle: "italic",
            fontSize: 42, fontWeight: 900, color: accent, opacity: 0.7,
          }}>{alt}</span>
        </div>
      )}

      <p style={{
        position: "relative", zIndex: 2,
        fontFamily: "'DM Mono', monospace", fontSize: 9,
        letterSpacing: "0.3em", textTransform: "uppercase",
        color: "#7a7060", margin: "0 0 4px",
      }}>{label}</p>

      <p style={{
        position: "relative", zIndex: 2,
        fontFamily: "'Fraunces', serif", fontSize: 16,
        fontWeight: 400, fontStyle: "italic", color: "#1a1815", margin: 0,
      }}>{title}</p>

      <div style={{
        position: "absolute", bottom: 22, right: 16, zIndex: 2,
        width: 24, height: 24, borderRadius: "50%",
        border: `1px solid ${hovered ? "#1a1815" : "rgba(100,90,80,0.22)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11,
        color: hovered ? "#1a1815" : "#7a7060",
        transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
        transition: "all 0.3s",
      }}>↗</div>
    </Link>
  );
}

export default function Hero() {
  const cursorRef     = useRef(null);
  const cursorRingRef = useRef(null);
  const navRef        = useRef(null);
  const [crashFired, setCrashFired] = useState(false);

  useEffect(() => {
    const id = "st-keyframes";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
    return () => { if (document.getElementById(id)) document.head.removeChild(el); };
  }, []);

  useEffect(() => {
    const onMove = e => {
      cursorRef.current?.style &&
        (cursorRef.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`);
      cursorRingRef.current?.style &&
        (cursorRingRef.current.style.transform = `translate(${e.clientX - 17}px,${e.clientY - 17}px)`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      Object.assign(navRef.current.style, window.scrollY > 30
        ? { background: "rgba(237,234,228,0.92)", backdropFilter: "blur(18px)", boxShadow: "0 1px 0 rgba(0,0,0,0.07)" }
        : { background: "transparent", backdropFilter: "none", boxShadow: "none" });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCrashFired(true), 1770);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "#edeae4", minHeight: "100vh", cursor: "none", overflowX: "hidden" }}>

      {/* Custom cursor */}
      <div ref={cursorRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999,
        width: 10, height: 10, borderRadius: "50%", background: "#1a1815",
        pointerEvents: "none", mixBlendMode: "multiply",
      }} />
      <div ref={cursorRingRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 9998,
        width: 34, height: 34, borderRadius: "50%",
        border: "1px solid rgba(26,24,21,0.35)", pointerEvents: "none",
        transition: "transform 0.3s cubic-bezier(.17,.67,.35,1.2)",
      }} />

      {/* NAV */}
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 52px", height: 68,
        transition: "background 0.4s, box-shadow 0.4s",
        fontFamily: "'DM Mono', Menlo, monospace",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src={logo} alt="Shruti Tokekar" style={{ height: 36, width: "auto", objectFit: "contain" }} />
        </Link>

        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          {[{ label: "About", to: "/about" }, { label: "Design", to: "/design" }, { label: "Dev", to: "/projects" }].map(({ label, to }) => (
            <li key={label}>
              <Link to={to} style={{
                fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#7a7060", textDecoration: "none", transition: "color 0.3s",
              }}
                onMouseEnter={e => e.target.style.color = "#1a1815"}
                onMouseLeave={e => e.target.style.color = "#7a7060"}
              >{label}</Link>
            </li>
          ))}
          <li>
            <Link to="/contact" style={{
              fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#edeae4", background: "#1a1815",
              padding: "9px 22px", borderRadius: 2, textDecoration: "none",
              transition: "background 0.3s",
            }}
              onMouseEnter={e => e.target.style.background = "#3a3530"}
              onMouseLeave={e => e.target.style.background = "#1a1815"}
            >Say Hello →</Link>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 68, paddingBottom: 80,
      }}>
        {/* Corner marks */}
        {[
          { top: 20, left: 20 },
          { top: 20, right: 20, transform: "rotate(90deg)" },
          { bottom: 20, left: 20, transform: "rotate(-90deg)" },
          { bottom: 20, right: 20, transform: "rotate(180deg)" },
        ].map((s, i) => (
          <span key={i} style={{ position: "absolute", width: 20, height: 20, opacity: 0.18, ...s }}>
            <span style={{ position: "absolute", width: "100%", height: 1, top: 0, left: 0, background: "#1a1815" }} />
            <span style={{ position: "absolute", width: 1, height: "100%", top: 0, left: 0, background: "#1a1815" }} />
          </span>
        ))}

        {/* Name crash stage */}
        <div style={{
          position: "relative",
          width: "min(620px, 90vw)", height: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Shockwave */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "110%", height: 2, borderRadius: "50%",
            background: "linear-gradient(to right, transparent, rgba(184,168,200,0.85), transparent)",
            opacity: 0, pointerEvents: "none",
            animation: "shockwave 0.55s ease-out 1.77s forwards",
          }} />

          {/* Particles */}
          {crashFired && PARTICLES.map((p, i) => (
            <span key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: p.size, height: p.size, borderRadius: "50%",
              background: "#b8a8c8", pointerEvents: "none",
              animation: `pFly${i} ${p.dur}s ease-out forwards`,
            }} />
          ))}

          {/* SHRUTI */}
          {imgShruti ? (
            <img src={imgShruti} alt="SHRUTI" draggable={false} style={{
              position: "absolute", left: 0, top: 0,
              width: "100%", height: "auto",
              userSelect: "none", pointerEvents: "none", willChange: "transform",
              animation: "crashDown 1.3s cubic-bezier(0.16,1,0.3,1) 0.5s both",
            }} />
          ) : (
            <div style={{
              position: "absolute", left: 0, top: 0, width: "100%",
              display: "flex", justifyContent: "center",
              animation: "crashDown 1.3s cubic-bezier(0.16,1,0.3,1) 0.5s both",
            }}>
              <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "clamp(56px,10vw,110px)", color: "#2a2520", letterSpacing: "-0.02em", lineHeight: 1 }}>SHRUTI</span>
            </div>
          )}

          {/* TOKEKAR */}
          {imgTokekar ? (
            <img src={imgTokekar} alt="TOKEKAR" draggable={false} style={{
              position: "absolute", left: 0, bottom: 0,
              width: "100%", height: "auto",
              userSelect: "none", pointerEvents: "none", willChange: "transform",
              animation: "crashUp 1.3s cubic-bezier(0.16,1,0.3,1) 0.5s both",
            }} />
          ) : (
            <div style={{
              position: "absolute", left: 0, bottom: 0, width: "100%",
              display: "flex", justifyContent: "center",
              animation: "crashUp 1.3s cubic-bezier(0.16,1,0.3,1) 0.5s both",
            }}>
              <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "clamp(56px,10vw,110px)", color: "#2a2520", letterSpacing: "-0.02em", lineHeight: 1 }}>TOKEKAR</span>
            </div>
          )}
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: "'DM Mono', monospace", fontSize: 10,
          letterSpacing: "0.38em", textTransform: "uppercase",
          color: "#7a7060", marginTop: 18, opacity: 0,
          animation: "fadeUp 0.8s ease-out 2.35s forwards",
        }}>
          Designer &nbsp;·&nbsp; Developer &nbsp;·&nbsp; Storyteller
        </p>

        {/* Portal cards */}
        <div style={{
          display: "flex", gap: 20, marginTop: 50, opacity: 0,
          animation: "fadeUp 0.8s ease-out 2.55s forwards",
        }}>
          <PortalCard to="/design"   img={imgDes} alt="des" label="Portfolio" title="Design Work" accent="#9a8aaa" />
          <PortalCard to="/projects" img={imgDev} alt="dev" label="Portfolio" title="Code Work"   accent="#7a9aaa" />
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 24,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0, animation: "fadeUp 0.8s ease-out 2.9s forwards",
        }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#7a7060" }}>Scroll</span>
          <div style={{ width: 1, height: 34, background: "linear-gradient(to bottom,#7a7060,transparent)", animation: "scrollPulse 2s ease-in-out 3.5s infinite" }} />
        </div>
      </section>

      {/* TERMINAL — replaces marquee */}
      <div style={{
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        background: "rgba(255,255,255,0.18)",
        padding: "60px 80px",
      }}>
        <p style={{
          fontFamily: "'DM Mono',monospace", fontSize: 10,
          letterSpacing: "0.4em", textTransform: "uppercase",
          color: "#7a7060", marginBottom: 24,
        }}>
          02 — Currently
        </p>
        <Terminal />
      </div>

      {/* ABOUT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 80px" }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#7a7060", marginBottom: 14 }}>
          01 — About
        </p>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, color: "#1a1815", lineHeight: 1.1, fontSize: "clamp(34px,5vw,60px)", marginBottom: 22 }}>
          I make things<br />
          <em style={{ fontStyle: "italic", color: "#9a8aaa" }}>look good</em><br />
          and work well.
        </h2>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, lineHeight: 1.9, color: "#7a7060", maxWidth: 520, marginBottom: 28 }}>
          CS student at East Stroudsburg University with a minor in Graphic &amp; Web Design.
          I build polished digital experiences that feel as good as they perform.
        </p>
        <Link to="/about" style={{
          fontFamily: "'DM Mono',monospace", fontSize: 10,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#1a1815", textDecoration: "none",
          borderBottom: "1px solid #1a1815", paddingBottom: 2,
        }}>More about me →</Link>
      </div>

      <hr style={{ border: "none", height: 1, background: "rgba(0,0,0,0.07)", margin: "0 80px" }} />

      {/* FOOTER */}
      <footer style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "40px 80px", borderTop: "1px solid rgba(0,0,0,0.07)",
      }}>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.15em", color: "#7a7060", margin: 0 }}>
          © {new Date().getFullYear()} Shruti Tokekar
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/shruti-tokekar", download: false },
            { label: "GitHub",   href: "https://github.com/shrutitokekar",       download: false },
            { label: "Resume",   href: "/resume.pdf",                             download: true  },
          ].map(({ label, href, download }) => (
            <a
              key={label}
              href={href}
              target={download ? "_self" : "_blank"}
              rel="noreferrer"
              download={download || undefined}
              style={{
                fontFamily: "'DM Mono',monospace", fontSize: 10,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#7a7060", textDecoration: "none", transition: "color 0.3s",
              }}
              onMouseEnter={e => e.target.style.color = "#1a1815"}
              onMouseLeave={e => e.target.style.color = "#7a7060"}
            >{label}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}
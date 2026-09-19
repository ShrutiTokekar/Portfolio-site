import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Terminal from "./Terminal";
import caseStudies from "../data/caseStudies";
import { caseImage } from "../utils/caseImages";
import CoverStandIn from "./CoverStandIn";
import useReveal from "../hooks/useReveal";

const DISPLAY = "'Fraunces',serif";
const MONO = "'DM Mono',monospace";
const INK = "#1a1815";
const CREAM = "#edeae4";
const MUTED = "#6b6155";
const LILAC_TEXT = "#6e5a86";
const LILAC_LARGE = "#7f6d93";
const RULE = "rgba(100,90,80,0.16)";
const PAD = "clamp(20px, 5vw, 80px)";

function Reveal({ children, style }) {
  const [ref, , revealStyle] = useReveal();
  return (
    <div ref={ref} style={{ ...revealStyle, ...style }}>
      {children}
    </div>
  );
}

function Label({ children, color = MUTED }) {
  return (
    <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color, margin: 0 }}>
      {children}
    </p>
  );
}

function Heading({ children, size = "clamp(30px, 4.6vw, 52px)" }) {
  return (
    <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, color: INK, lineHeight: 1.1, letterSpacing: "-0.01em", fontSize: size, margin: 0 }}>
      {children}
    </h2>
  );
}

const Accent = ({ children }) => (
  <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>{children}</em>
);

const buttonStyle = (filled, dark = false) => ({
  fontFamily: MONO,
  fontSize: 10.5,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  textDecoration: "none",
  padding: "14px 22px",
  borderRadius: 4,
  border: `1px solid ${dark ? CREAM : INK}`,
  background: filled ? (dark ? CREAM : INK) : "transparent",
  color: filled ? (dark ? INK : CREAM) : dark ? CREAM : INK,
  whiteSpace: "nowrap",
});

function CountUp({ to, suffix = "", duration = 1300 }) {
  const [ref, visible] = useReveal(0.5);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return undefined;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(to);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ------------------------------- Intro ------------------------------- */
function Intro() {
  const stats = [
    { to: 94, suffix: "", label: "Lighthouse score, Flow State" },
    { to: 67, suffix: "+", label: "Zero-downtime deploys, Flow State" },
  ];
  return (
    <Reveal style={{ padding: `88px ${PAD} 40px` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
        <Label color={LILAC_TEXT}>01 · Hello</Label>
        <Heading size="clamp(32px, 5.4vw, 64px)">
          I design experiences in Figma
          <br />
          and <Accent>build them in React.</Accent>
        </Heading>
        <p style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.9, color: MUTED, maxWidth: 580, margin: 0 }}>
          UX/UI designer and frontend engineer. Computer science student at East Stroudsburg University, graduating May 2027.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <span
            style={{ fontFamily: MONO, fontSize: 11, color: INK, background: "rgba(255,255,255,0.7)", border: `1px solid ${RULE}`, borderRadius: 999, padding: "6px 14px" }}
          >
            ★ Google UX Design Professional
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link to="/design" style={buttonStyle(true)}>
            View case studies
          </Link>
          <a href="/resume.pdf" download style={buttonStyle(false)}>
            Download resume
          </a>
          <Link
            to="/about"
            style={{ alignSelf: "center", fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, textDecoration: "none", borderBottom: `1px solid ${INK}`, paddingBottom: 2, whiteSpace: "nowrap" }}
          >
            View more about me →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 0, marginTop: 12, borderTop: `1px solid ${INK}` }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "22px 0", paddingLeft: i === 0 ? 0 : 24, borderLeft: i === 0 ? "none" : `1px solid ${RULE}`, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1, color: INK }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </span>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* --------------------------- Selected work --------------------------- */
function ProjectCard({ project }) {
  const [hover, setHover] = useState(false);
  const cover = caseImage(project.slug, "cover");
  return (
    <Link
      to={`/design/${project.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      style={{
        flex: "0 0 min(300px, 78vw)",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        borderRadius: 10,
        overflow: "hidden",
        background: hover ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
        border: `1px solid ${hover ? "rgba(100,90,80,0.3)" : RULE}`,
        transform: hover ? "translateY(-5px)" : "none",
        boxShadow: hover ? "0 16px 44px rgba(0,0,0,0.1)" : "none",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        {cover ? (
          <img
            src={cover}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
          />
        ) : (
          <CoverStandIn palette={project.palette} />
        )}
      </div>
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED }}>
          {project.category} · {project.year}
          {project.status ? ` · ${project.status}` : ""}
        </span>
        <h3 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 20, lineHeight: 1.2, color: INK, margin: 0 }}>
          {project.title} {project.subtitle}
        </h3>
        <p style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.75, color: MUTED, margin: 0, flex: 1 }}>{project.summary}</p>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, paddingTop: 4 }}>
          Read case study{" "}
          <span aria-hidden="true" style={{ display: "inline-block", transform: hover ? "translateX(4px)" : "none", transition: "transform 0.3s" }}>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function ArrowButton({ dir, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir < 0 ? "Previous projects" : "Next projects"}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: `1px solid ${disabled ? RULE : INK}`,
        background: "transparent",
        color: INK,
        fontFamily: MONO,
        fontSize: 16,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "opacity 0.3s, background 0.3s",
      }}
    >
      {dir < 0 ? "←" : "→"}
    </button>
  );
}

function SelectedWork() {
  const scroller = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const move = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("a");
    const step = (card ? card.getBoundingClientRect().width : 300) + 18;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Reveal style={{ padding: `56px ${PAD} 72px` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Label color={LILAC_TEXT}>02 · Selected work</Label>
            <Heading>
              Case studies, <Accent>not just screenshots.</Accent>
            </Heading>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link to="/design" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, textDecoration: "none", borderBottom: `1px solid ${INK}`, paddingBottom: 2 }}>
              All {caseStudies.length} case studies →
            </Link>
            <div style={{ display: "flex", gap: 8 }}>
              <ArrowButton dir={-1} disabled={edge.start} onClick={() => move(-1)} />
              <ArrowButton dir={1} disabled={edge.end} onClick={() => move(1)} />
            </div>
          </div>
        </div>
        <div
          ref={scroller}
          onScroll={update}
          role="region"
          aria-label="Case studies, scroll sideways"
          tabIndex={0}
          style={{
            display: "flex",
            gap: 18,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            padding: "12px 2px 30px",
            margin: "-12px -2px -30px",
            scrollbarWidth: "none",
          }}
        >
          {caseStudies.map((c) => (
            <ProjectCard key={c.slug} project={c} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* --------------------------- Currently (terminal) --------------------------- */
function Currently() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        background: "rgba(255,255,255,0.18)",
        padding: `60px ${PAD}`,
      }}
    >
      <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: MUTED, marginBottom: 24 }}>Currently</p>
      <Terminal />
    </div>
  );
}

export default function HomeSections() {
  return (
    <>
      <Currently />
      <Intro />
      <SelectedWork />
    </>
  );
}

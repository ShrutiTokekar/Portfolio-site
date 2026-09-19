import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import caseStudies from "../data/caseStudies";
import { caseImage } from "../utils/caseImages";

const DISPLAY = "'Fraunces',serif";
const MONO = "'DM Mono',monospace";
const INK = "#1a1815";
const CREAM = "#edeae4";
const MUTED = "#6b6155";
const LILAC_TEXT = "#6e5a86"; // small labels (passes contrast on cream)
const LILAC_LARGE = "#7f6d93"; // large italic display text
const RULE = "rgba(100,90,80,0.18)";
// Black or white label, whichever reads better on a swatch color.
function textOn(hex) {
  const n = parseInt(hex.slice(1), 16);
  const lin = (v) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L > 0.4 ? "#1a1815" : "#ffffff";
}

const STEP_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];

function Label({ children, color = LILAC_TEXT }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
}

function Chip({ children }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 10,
        color: INK,
        background: "#f5f3ef",
        border: "1px solid rgba(154,138,170,0.35)",
        borderRadius: 999,
        padding: "4px 10px",
        lineHeight: 1.3,
      }}
    >
      {children}
    </span>
  );
}

function StepVisual({ step, image }) {
  const box = {
    height: 150,
    borderRadius: 6,
    overflow: "hidden",
    background: "rgba(154,138,170,0.14)",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
    gap: 6,
    padding: 12,
    boxSizing: "border-box",
  };

  if (image) {
    return (
      <div style={{ ...box, padding: 0 }}>
        <img
          src={image}
          alt={`${step.label} step`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  }

  if (step.swatches) {
    return (
      <div aria-hidden="true" style={{ ...box, gap: 8 }}>
        {step.swatches.map((c) => (
          <span
            key={c}
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              background: c,
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={box}>
      {(step.chips || []).map((c) => (
        <Chip key={c}>{c}</Chip>
      ))}
    </div>
  );
}

function MetaItem({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {label}
      </span>
      <span style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.6, color: INK }}>
        {children}
      </span>
    </div>
  );
}

const linkButton = (filled) => ({
  fontFamily: MONO,
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  textDecoration: "none",
  padding: "13px 20px",
  borderRadius: 4,
  border: `1px solid ${INK}`,
  background: filled ? INK : "transparent",
  color: filled ? CREAM : INK,
});

export default function CaseStudy() {
  const { slug } = useParams();
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const project = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [slug]);

  useEffect(() => {
    const gf = project && project.designSystem && project.designSystem.googleFonts;
    if (!gf) return undefined;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${gf}&display=swap`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const previous = document.title;
    document.title = `${project.title} ${project.subtitle} — Shruti Tokekar`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (!project) {
    return (
      <section style={{ background: CREAM, minHeight: "70vh", padding: "120px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: 22, color: MUTED, marginBottom: 24 }}>
          That case study doesn&rsquo;t exist.
        </p>
        <Link to="/design" style={linkButton(true)}>
          ← Back to design work
        </Link>
      </section>
    );
  }

  const hero = caseImage(project.slug, "hero");
  const ds = project.designSystem;
  const hasDS = ds && ((ds.colors && ds.colors.length) || (ds.fonts && ds.fonts.length));
  const outcomeNumber = hasDS ? "04" : "03";
  const liveHost = project.live ? new URL(project.live).host : "";

  return (
    <section style={{ background: CREAM, minHeight: "100vh", padding: "56px 0 120px" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 72px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <Link
          to="/design"
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: INK,
            textDecoration: "none",
          }}
        >
          ← Back to design work
        </Link>

        {/* Header */}
        <header style={{ margin: "48px 0 40px", display: "flex", flexDirection: "column", gap: 22 }}>
          <Label>
            Case study · {project.category} · {project.year}
          </Label>
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(44px, 9vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              color: INK,
              margin: 0,
            }}
          >
            {project.title}
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>
              {project.subtitle}
            </em>
          </h1>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 14,
              lineHeight: 1.85,
              color: MUTED,
              maxWidth: 640,
              margin: 0,
            }}
          >
            {project.summary}
          </p>
        </header>

        {hero && (
          <img
            src={hero}
            alt={`${project.title} ${project.subtitle}`}
            style={{ width: "100%", borderRadius: 10, marginBottom: 40, display: "block", border: `1px solid ${RULE}` }}
          />
        )}

        {/* Meta */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 24,
            padding: "22px 0",
            borderTop: `1px solid ${INK}`,
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <MetaItem label="Role">{project.role}</MetaItem>
          {project.status && <MetaItem label="Status">{project.status}</MetaItem>}
          {project.timeline && <MetaItem label="Timeline">{project.timeline}</MetaItem>}
          <MetaItem label="Tools">{project.toolsFull}</MetaItem>
          {project.live && (
            <MetaItem label="Live site">
              <a href={project.live} target="_blank" rel="noreferrer" style={{ color: LILAC_TEXT }}>
                {liveHost} ↗
              </a>
            </MetaItem>
          )}
        </div>

        {/* Overview */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px", padding: "64px 0 16px" }}>
          <div style={{ flex: "0 0 200px" }}>
            <Label>01 — Overview</Label>
          </div>
          <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 18 }}>
            <h2
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: "clamp(26px, 4vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: INK,
                margin: 0,
              }}
            >
              {project.overview.heading}
            </h2>
            <p style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.85, color: MUTED, margin: 0 }}>
              {project.overview.body}
            </p>
          </div>
        </div>

        {/* Process */}
        <div style={{ padding: "48px 0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <Label>02 — {project.processLabel || "Process"}</Label>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(26px, 4vw, 36px)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: INK,
              margin: 0,
            }}
          >
            {project.processHeading || `${STEP_WORDS[project.process.length] || project.process.length} steps, one page.`}
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {project.process.map((step, i) => (
            <div
              key={step.label}
              style={{
                background: "rgba(255,255,255,0.55)",
                border: `1px solid ${RULE}`,
                borderRadius: 10,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <StepVisual step={step} image={caseImage(project.slug, `step-${i + 1}`)} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em", color: LILAC_TEXT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 22, color: INK, margin: 0 }}>
                  {step.label}
                </h3>
              </div>
              <p style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.75, color: MUTED, margin: 0 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Design system */}
        {hasDS && (
          <div style={{ paddingTop: 64 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              <Label>03 — Design system</Label>
              <h2
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: "clamp(26px, 4vw, 36px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: INK,
                  margin: 0,
                }}
              >
                {ds.heading || "Colors and type."}
              </h2>
              {ds.note && (
                <p style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.7, color: MUTED, margin: 0 }}>{ds.note}</p>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 40px", alignItems: "flex-start" }}>
              {ds.colors && ds.colors.length > 0 && (
                <div
                  style={{
                    flex: "2 1 420px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
                    gap: 10,
                  }}
                >
                  {ds.colors.map((col) => (
                    <div
                      key={col.name}
                      style={{
                        background: col.hex,
                        color: textOn(col.hex),
                        borderRadius: 8,
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
                        minHeight: 84,
                        padding: 10,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        gap: 2,
                        fontFamily: MONO,
                      }}
                    >
                      <span style={{ fontSize: 11, lineHeight: 1.3 }}>{col.name}</span>
                      <span style={{ fontSize: 10, letterSpacing: "0.08em", opacity: 0.8 }}>{col.hex}</span>
                    </div>
                  ))}
                </div>
              )}
              {ds.fonts && ds.fonts.length > 0 && (
                <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 14 }}>
                  {ds.fonts.map((f) => (
                    <div
                      key={f.name}
                      style={{
                        background: "rgba(255,255,255,0.55)",
                        border: `1px solid ${RULE}`,
                        borderRadius: 10,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ fontFamily: f.family, fontSize: 48, lineHeight: 1, color: INK }}
                      >
                        Aa
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: MONO }}>
                        <span style={{ fontSize: 12, color: INK }}>{f.name}</span>
                        <span
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: MUTED,
                          }}
                        >
                          {f.role}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key decision */}
        {project.decision && (
          <div
            style={{
              marginTop: 56,
              background: INK,
              color: CREAM,
              borderRadius: 12,
              padding: "clamp(24px, 4vw, 44px)",
              display: "flex",
              flexWrap: "wrap",
              gap: "24px 48px",
            }}
          >
            <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 14 }}>
              <Label color="#cfc3dd">Key decision</Label>
              <h2
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: "clamp(24px, 3.4vw, 32px)",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {project.decision.title}
              </h2>
            </div>
            <p
              style={{
                flex: "2 1 320px",
                alignSelf: "flex-end",
                fontFamily: MONO,
                fontSize: 13,
                lineHeight: 1.9,
                color: "#e4e0d8",
                margin: 0,
              }}
            >
              {project.decision.body}
            </p>
          </div>
        )}

        {/* Outcome */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px", padding: "64px 0 16px" }}>
          <div style={{ flex: "0 0 200px" }}>
            <Label>{outcomeNumber} — Outcome</Label>
          </div>
          <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 22 }}>
            <p
              style={{
                fontFamily: DISPLAY,
                fontWeight: 300,
                fontSize: "clamp(20px, 3vw, 26px)",
                lineHeight: 1.35,
                color: INK,
                margin: 0,
              }}
            >
              {project.outcome}
            </p>
            {[
              ["Learned", project.learned],
              ["Next", project.next],
            ]
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px 16px",
                    paddingTop: 14,
                    borderTop: `1px solid ${RULE}`,
                  }}
                >
                  <span
                    style={{
                      flex: "0 0 100px",
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: MUTED,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ flex: "1 1 240px", fontFamily: MONO, fontSize: 13, lineHeight: 1.75, color: INK }}>
                    {value}
                  </span>
                </div>
              ))}
            {(project.figma || project.prototype || project.live || project.github) && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 6 }}>
                {project.prototype && (
                  <a href={project.prototype} target="_blank" rel="noreferrer" style={linkButton(true)}>
                    View prototype ↗
                  </a>
                )}
                {project.figma && (
                  <a href={project.figma} target="_blank" rel="noreferrer" style={linkButton(!project.prototype && !project.live)}>
                    View in Figma ↗
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" style={linkButton(!project.prototype)}>
                    View live ↗
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" style={linkButton(false)}>
                    Source on GitHub ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer nav */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 28,
            borderTop: `1px solid ${RULE}`,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Link
            to="/design"
            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, textDecoration: "none" }}
          >
            ← All design work
          </Link>
          {next && next.slug !== project.slug && (
            <Link
              to={`/design/${next.slug}`}
              style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: INK, textDecoration: "none" }}
            >
              Next: {next.title} {next.subtitle} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

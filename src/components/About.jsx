import React, { useState } from "react";
import { Link } from "react-router-dom";
import portrait from "../assets/about/shruti.webp";
import caseStudies from "../data/caseStudies";
import {
  PROFILE,
  LENSES,
  STORY,
  SKILLS,
  CERTIFICATES,
  HOW_I_WORK,
  BEYOND,
  EXPERIENCE,
} from "../data/about";
import useReveal from "../hooks/useReveal";

const DISPLAY = "'Fraunces',serif";
const MONO = "'DM Mono',monospace";
const INK = "#1a1815";
const CREAM = "#edeae4";
const MUTED = "#6b6155";
const LILAC = "#9a8aaa";
const LILAC_TEXT = "#6e5a86"; // small text on cream
const LILAC_LARGE = "#7f6d93"; // big italic text on cream
const RULE = "rgba(100,90,80,0.16)";

const KEYFRAMES = `
@keyframes aboutFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes aboutPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(90,160,110,0.5); } 50% { box-shadow: 0 0 0 6px rgba(90,160,110,0); } }
@media (prefers-reduced-motion: reduce) { .about-anim { animation: none !important; } }
`;

const wrap = { maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 5vw, 72px)" };

function Reveal({ children, style }) {
  const [ref, , revealStyle] = useReveal();
  return (
    <div ref={ref} style={{ ...revealStyle, ...style }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, color = MUTED }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: 10,
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        color,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ eyebrow, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
      <Eyebrow color={LILAC_TEXT}>{eyebrow}</Eyebrow>
      <h2
        style={{
          fontFamily: DISPLAY,
          fontWeight: 900,
          fontSize: "clamp(28px, 4.4vw, 44px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: INK,
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function Pill({ children, dot, style }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: MONO,
        fontSize: 11,
        color: INK,
        background: "rgba(255,255,255,0.7)",
        border: `1px solid ${RULE}`,
        borderRadius: 999,
        padding: "6px 14px",
        ...style,
      }}
    >
      {dot && (
        <span
          className="about-anim"
          style={{ width: 8, height: 8, borderRadius: "50%", background: dot, animation: "aboutPulse 2s ease-in-out infinite" }}
        />
      )}
      {children}
    </span>
  );
}

/* ------------------------------ Hero ------------------------------ */
function HeroBlock() {
  const [tilt, setTilt] = useState(false);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px 64px", padding: "72px 0 40px" }}>
      <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 24 }}>
        <Eyebrow>About me</Eyebrow>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: "clamp(42px, 7vw, 80px)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: INK,
            margin: 0,
          }}
        >
          I design it,
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>then I build it.</em>
        </h1>
        <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: LILAC_TEXT, margin: 0 }}>
          {PROFILE.headline}
        </p>
        {PROFILE.intro.map((p) => (
          <p key={p} style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.9, color: MUTED, maxWidth: 560, margin: 0 }}>
            {p}
          </p>
        ))}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <Pill dot="#5aa06e">Open to opportunities</Pill>
        </div>
      </div>

      <div style={{ flex: "0 1 360px", minWidth: 260, margin: "0 auto", position: "relative", padding: "0 0 24px 0" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "24px -18px -8px 24px",
            borderRadius: "999px 999px 28px 28px",
            background: "rgba(154,138,170,0.28)",
            transform: tilt ? "rotate(3deg)" : "rotate(1.5deg)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          onMouseEnter={() => setTilt(true)}
          onMouseLeave={() => setTilt(false)}
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            borderRadius: "999px 999px 24px 24px",
            overflow: "hidden",
            background: "#d8d4cc",
            transform: tilt ? "rotate(-1.5deg) scale(1.015)" : "rotate(0deg)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: "0 18px 50px rgba(40,30,20,0.16)",
          }}
        >
          <img
            src={portrait}
            alt="Portrait of Shruti Tokekar"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%", display: "block" }}
          />
        </div>
        <span
          style={{
            position: "absolute",
            right: -14,
            top: 56,
            transform: tilt ? "rotate(9deg)" : "rotate(5deg)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#fff",
            background: INK,
            borderRadius: 999,
            padding: "8px 14px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
          }}
        >
          ★ Google UX Certified
        </span>
      </div>
    </div>
  );
}

/* --------------------------- Designer / Engineer --------------------------- */
function LensBlock() {
  const [lens, setLens] = useState("designer");
  const data = LENSES[lens];
  const bySlug = Object.fromEntries(caseStudies.map((c) => [c.slug, c]));

  return (
    <Reveal style={{ padding: "56px 0 24px" }}>
      <SectionTitle eyebrow="Two sides, one workflow">See me as a...</SectionTitle>
      <div
        role="group"
        aria-label="Switch between designer and engineer view"
        style={{ display: "inline-flex", padding: 4, borderRadius: 999, background: "rgba(255,255,255,0.7)", border: `1px solid ${RULE}`, marginBottom: 28 }}
      >
        {Object.entries(LENSES).map(([key, l]) => {
          const on = lens === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              onClick={() => setLens(key)}
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                padding: "11px 26px",
                borderRadius: 999,
                background: on ? INK : "transparent",
                color: on ? CREAM : INK,
                transition: "background 0.3s, color 0.3s",
              }}
            >
              {l.label}
            </button>
          );
        })}
      </div>

      <div
        key={lens}
        className="about-anim"
        aria-live="polite"
        style={{
          animation: "aboutFade 0.45s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexWrap: "wrap",
          gap: "28px 56px",
          padding: "clamp(24px, 4vw, 40px)",
          borderRadius: 14,
          background: "rgba(255,255,255,0.55)",
          border: `1px solid ${RULE}`,
        }}
      >
        <div style={{ flex: "2 1 360px", display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(24px, 3.4vw, 32px)", lineHeight: 1.15, color: INK, margin: 0 }}>
            {data.title}
          </h3>
          <p style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.9, color: MUTED, margin: 0 }}>{data.body}</p>
        </div>
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Eyebrow>Where to see it</Eyebrow>
            {data.projects.map((slug) => {
              const c = bySlug[slug];
              if (!c) return null;
              return (
                <Link
                  key={slug}
                  to={`/design/${slug}`}
                  style={{ fontFamily: MONO, fontSize: 12, color: INK, textDecoration: "none", borderBottom: `1px solid ${INK}`, alignSelf: "flex-start", paddingBottom: 2 }}
                >
                  {c.title} {c.subtitle} →
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------- Story ------------------------------- */
function StoryBlock() {
  const [i, setI] = useState(0);
  const ch = STORY[i];
  const onKey = (e) => {
    if (e.key === "ArrowRight") setI((v) => Math.min(v + 1, STORY.length - 1));
    if (e.key === "ArrowLeft") setI((v) => Math.max(v - 1, 0));
  };

  return (
    <Reveal style={{ padding: "56px 0 24px" }}>
      <SectionTitle eyebrow="My story">
        How I got <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>here.</em>
      </SectionTitle>

      <div
        role="tablist"
        aria-label="Chapters of my story"
        onKeyDown={onKey}
        style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 20 }}
      >
        {STORY.map((s, idx) => {
          const on = idx === i;
          return (
            <button
              key={s.tag}
              type="button"
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setI(idx)}
              style={{
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "10px 16px",
                borderRadius: 999,
                border: `1px solid ${on ? INK : RULE}`,
                background: on ? INK : "rgba(255,255,255,0.6)",
                color: on ? CREAM : INK,
                transition: "all 0.3s",
              }}
            >
              <span style={{ opacity: 0.6 }}>{String(idx + 1).padStart(2, "0")}</span>
              {s.tag}
            </button>
          );
        })}
      </div>

      <div
        key={i}
        role="tabpanel"
        className="about-anim"
        style={{
          animation: "aboutFade 0.45s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px 48px",
          padding: "clamp(24px, 4vw, 40px)",
          borderRadius: 14,
          background: "rgba(255,255,255,0.55)",
          border: `1px solid ${RULE}`,
        }}
      >
        <div
          aria-hidden="true"
          style={{ flex: "0 0 auto", fontFamily: DISPLAY, fontWeight: 300, fontStyle: "italic", fontSize: "clamp(56px, 9vw, 96px)", lineHeight: 1, color: "rgba(154,138,170,0.55)" }}
        >
          {String(i + 1).padStart(2, "0")}
        </div>
        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 14 }}>
          <Eyebrow color={LILAC_TEXT}>{ch.when}</Eyebrow>
          <h3 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.2, color: INK, margin: 0 }}>{ch.title}</h3>
          <p style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.9, color: MUTED, margin: 0, maxWidth: 620 }}>{ch.body}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", paddingTop: 6 }}>
            {ch.link && (
              <Link to={ch.link.to} style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: INK, borderBottom: `1px solid ${INK}`, paddingBottom: 2, textDecoration: "none" }}>
                {ch.link.label} →
              </Link>
            )}
            {i < STORY.length - 1 && (
              <button
                type="button"
                onClick={() => setI(i + 1)}
                style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", color: LILAC_TEXT, padding: 0 }}
              >
                Next chapter →
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------ Skills ------------------------------ */
function SkillsBlock() {
  const [cat, setCat] = useState(0);
  const [hover, setHover] = useState(null);
  const group = SKILLS[cat];
  const total = SKILLS.reduce((n, g) => n + g.items.length, 0);
  const caption = hover
    ? hover.used
      ? `${hover.name}: ${hover.used}`
      : hover.name
    : "Hover or tap a skill to see where I've used it.";

  return (
    <Reveal style={{ padding: "56px 0 24px" }}>
      <SectionTitle eyebrow={`Skills and stack · ${total} and counting`}>
        What I <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>work with.</em>
      </SectionTitle>

      <div role="tablist" aria-label="Skill categories" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {SKILLS.map((g, idx) => {
          const on = idx === cat;
          return (
            <button
              key={g.category}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setCat(idx);
                setHover(null);
              }}
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "10px 18px",
                borderRadius: 6,
                border: `1px solid ${on ? INK : RULE}`,
                background: on ? INK : "rgba(255,255,255,0.6)",
                color: on ? CREAM : INK,
                transition: "all 0.3s",
              }}
            >
              {g.category} <span style={{ opacity: 0.6 }}>{g.items.length}</span>
            </button>
          );
        })}
      </div>

      <div
        key={cat}
        role="tabpanel"
        className="about-anim"
        style={{
          animation: "aboutFade 0.4s cubic-bezier(0.16,1,0.3,1)",
          padding: "clamp(20px, 3vw, 32px)",
          borderRadius: 14,
          background: "rgba(255,255,255,0.55)",
          border: `1px solid ${RULE}`,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {group.items.map((it) => {
            const on = hover && hover.name === it.name;
            return (
              <button
                key={it.name}
                type="button"
                onMouseEnter={() => setHover(it)}
                onFocus={() => setHover(it)}
                onClick={() => setHover(it)}
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  cursor: "pointer",
                  color: on ? CREAM : INK,
                  background: on ? INK : "#f5f3ef",
                  border: `1px solid ${on ? INK : "rgba(154,138,170,0.4)"}`,
                  borderRadius: 999,
                  padding: "8px 16px",
                  transform: on ? "translateY(-2px)" : "none",
                  transition: "all 0.25s",
                }}
              >
                {it.name}
              </button>
            );
          })}
        </div>
        <p
          aria-live="polite"
          style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.7, color: hover ? INK : MUTED, margin: "22px 0 0", minHeight: 22, paddingTop: 14, borderTop: `1px solid ${RULE}` }}
        >
          {caption}
        </p>
      </div>
    </Reveal>
  );
}

/* ---------------------------- Certificates ---------------------------- */
function CertBlock() {
  return (
    <Reveal style={{ padding: "56px 0 24px" }}>
      <SectionTitle eyebrow="Certificates">
        Always <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>learning.</em>
      </SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {CERTIFICATES.map((c) => (
          <div
            key={c.name}
            style={{
              gridColumn: c.featured ? "1 / -1" : "auto",
              display: "flex",
              flexWrap: "wrap",
              gap: "16px 32px",
              alignItems: "center",
              padding: c.featured ? "clamp(24px, 4vw, 36px)" : 22,
              borderRadius: 14,
              background: c.featured ? INK : "rgba(255,255,255,0.55)",
              color: c.featured ? CREAM : INK,
              border: c.featured ? "none" : `1px solid ${RULE}`,
            }}
          >
            <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                {c.isNew && (
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", background: "#f4e9c9", color: INK, borderRadius: 999, padding: "4px 12px" }}>
                    New
                  </span>
                )}
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: c.featured ? "#cfc3dd" : MUTED }}>
                  {c.issuer}
                  {c.when ? ` · ${c.when}` : ""}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: c.featured ? "clamp(24px, 3.6vw, 34px)" : 19,
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {c.name}
              </h3>
            </div>
            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "13px 20px",
                  borderRadius: 4,
                  border: `1px solid ${c.featured ? CREAM : INK}`,
                  color: c.featured ? INK : INK,
                  background: c.featured ? CREAM : "transparent",
                }}
              >
                View credential ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ---------------------------- How I work ---------------------------- */
function WorkBlock() {
  const [on, setOn] = useState(null);
  return (
    <Reveal style={{ padding: "56px 0 24px" }}>
      <SectionTitle eyebrow="How I work">
        The <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>way I think.</em>
      </SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        {HOW_I_WORK.map((h, idx) => {
          const active = on === idx;
          return (
            <div
              key={h.word}
              tabIndex={0}
              onMouseEnter={() => setOn(idx)}
              onMouseLeave={() => setOn(null)}
              onFocus={() => setOn(idx)}
              onBlur={() => setOn(null)}
              style={{
                padding: 24,
                borderRadius: 14,
                minHeight: 170,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 16,
                background: active ? "#e3dcea" : "rgba(255,255,255,0.55)",
                border: `1px solid ${active ? "rgba(154,138,170,0.5)" : RULE}`,
                transform: active ? "translateY(-4px)" : "none",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.3em", color: LILAC_TEXT }}>{String(idx + 1).padStart(2, "0")}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 900, fontStyle: "italic", fontSize: 24, lineHeight: 1.1, color: INK, margin: 0 }}>{h.word}</h3>
                <p style={{ fontFamily: MONO, fontSize: 12, lineHeight: 1.75, color: MUTED, margin: 0 }}>{h.line}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

/* --------------------------- Beyond the screen --------------------------- */
function BeyondBlock() {
  return (
    <Reveal style={{ padding: "56px 0 24px" }}>
      <SectionTitle eyebrow="Beyond the screen">
        A little more <em style={{ fontStyle: "italic", fontWeight: 300, color: LILAC_LARGE }}>about me.</em>
      </SectionTitle>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "28px 56px" }}>
        <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 14 }}>
          <Eyebrow>Languages I speak</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {PROFILE.languagesSpoken.map((l) => (
              <Pill key={l}>{l}</Pill>
            ))}
          </div>
          <Eyebrow>When I'm off the clock</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {BEYOND.interests.map((l) => (
              <Pill key={l}>{l}</Pill>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 14 }}>
          <Eyebrow>Involvement</Eyebrow>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            {BEYOND.involvement.map((l) => (
              <li key={l} style={{ display: "flex", gap: 12, alignItems: "baseline", fontFamily: MONO, fontSize: 12.5, lineHeight: 1.7, color: MUTED }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: LILAC, flexShrink: 0, transform: "translateY(-2px)" }} />
                {l}
              </li>
            ))}
          </ul>
          {EXPERIENCE.map((e) => (
            <div key={e.title} style={{ marginTop: 8, paddingTop: 14, borderTop: `1px solid ${RULE}` }}>
              <Eyebrow>Experience</Eyebrow>
              <p style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 18, color: INK, margin: "8px 0 2px" }}>{e.title}</p>
              <p style={{ fontFamily: MONO, fontSize: 11.5, color: MUTED, margin: 0, lineHeight: 1.7 }}>
                {e.sub} · {e.year}
                <br />
                {e.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* --------------------------------- CTA --------------------------------- */
function CtaBlock() {
  const btn = (filled) => ({
    fontFamily: MONO,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    textDecoration: "none",
    padding: "14px 24px",
    borderRadius: 4,
    border: `1px solid ${CREAM}`,
    background: filled ? CREAM : "transparent",
    color: filled ? INK : CREAM,
  });
  return (
    <Reveal style={{ padding: "64px 0 0" }}>
      <div
        style={{
          borderRadius: 16,
          background: INK,
          color: CREAM,
          padding: "clamp(28px, 5vw, 56px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "24px 40px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.1, margin: 0 }}>
            Let&rsquo;s build something{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "#cfc3dd" }}>good.</em>
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 12.5, lineHeight: 1.8, color: "#e4e0d8", margin: 0, maxWidth: 460 }}>
            Looking for a UX/UI designer or a frontend engineer? I'd love to hear about it.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link to="/contact" style={btn(true)}>
            Say hello
          </Link>
          <a href="/resume.pdf" download style={btn(false)}>
            Download resume
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section style={{ background: CREAM, minHeight: "100vh", padding: "24px 0 120px", overflowX: "clip" }}>
      <style>{KEYFRAMES}</style>
      <div style={wrap}>
        <HeroBlock />
        <LensBlock />
        <StoryBlock />
        <SkillsBlock />
        <CertBlock />
        <WorkBlock />
        <BeyondBlock />
        <CtaBlock />
      </div>
    </section>
  );
}

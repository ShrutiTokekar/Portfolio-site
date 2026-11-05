import React, { useState, useEffect } from "react";

// Cards live in src/data/projects.json. The portfolio-sync bot
// (scripts/portfolio-sync) adds new GitHub repos there and refreshes the
// description when a repo's README changes. Set "locked": true on a card to
// keep your own wording.
import projects from "../data/projects.json";

const CATEGORIES = ["All", "Full Stack", "Backend", "Systems", "Frontend"];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 70);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", textDecoration: "none",
        border: `1px solid ${hovered ? "rgba(100,90,80,0.28)" : "rgba(100,90,80,0.12)"}`,
        borderRadius: 8, padding: "28px 28px 24px",
        background: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)",
        backdropFilter: "blur(6px)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.08)" : "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(20px)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#a09080" }}>{project.year}</span>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9a8aaa", padding: "3px 10px", border: "1px solid rgba(154,138,170,0.3)", borderRadius: 20 }}>{project.category}</span>
      </div>
      <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 20, color: "#1a1815", lineHeight: 1.2, marginBottom: 10 }}>{project.name}</h3>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, lineHeight: 1.8, color: "#7a7060", marginBottom: 20 }}>{project.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {project.techStack.map(t => (
          <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "#7a7060", padding: "4px 10px", background: "rgba(100,90,80,0.08)", borderRadius: 4 }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: hovered ? "#1a1815" : "#a09080", transition: "color 0.3s" }}>
        View on GitHub <span style={{ display: "inline-block", transform: hovered ? "translate(2px,-2px)" : "none", transition: "transform 0.3s" }}>↗</span>
      </div>
    </a>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section style={{ background: "#edeae4", minHeight: "100vh", padding: "clamp(40px, 8vw, 80px) 0 clamp(72px, 10vw, 120px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 5vw, 72px)" }}>

        <div style={{
          marginBottom: 56,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#7a7060", marginBottom: 14 }}>Dev Portfolio</p>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "clamp(40px,6vw,72px)", color: "#1a1815", lineHeight: 1.05, marginBottom: 20 }}>
            Code &amp;<br />
            <em style={{ fontStyle: "italic", color: "#9a8aaa" }}>Engineering</em><br />
            Work
          </h1>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, lineHeight: 1.9, color: "#7a7060", maxWidth: 480 }}>
            A selection of projects spanning full-stack apps, backend systems, and low-level programming — built to solve real problems.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 44 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
              padding: "8px 18px", borderRadius: 2, border: "none", cursor: "pointer",
              background: activeCategory === cat ? "#1a1815" : "rgba(100,90,80,0.08)",
              color: activeCategory === cat ? "#edeae4" : "#7a7060",
              transition: "all 0.3s",
            }}>{cat}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {filtered.map((p, i) => <ProjectCard key={p.repo} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

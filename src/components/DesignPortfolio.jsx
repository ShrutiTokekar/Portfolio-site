import React, { useState, useEffect } from "react";

const designProjects = [
  {
    id: 1,
    name: "Portfolio Website",
    category: "Web Design",
    year: "2026",
    description: "Personal portfolio designed and built from scratch — crash-animation hero, metallic 3D typography, dual portals, and a refined cream aesthetic.",
    tools: ["Figma", "React", "Framer Motion", "Tailwind CSS"],
    link: "#",
  },
  {
    id: 2,
    name: "Zenty — AI Chatbot UI",
    category: "UI/UX",
    year: "2025",
    description: "Frontend interface for Zenty, a financial AI chatbot with a conversational layout, custom message bubbles, and real-time streaming animations.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    link: "https://github.com/shrutitokekar",
  },
  {
    id: 3,
    name: "To-do List App",
    category: "Web Design",
    year: "2023",
    description: "A simple to-do list built using HTML, CSS, and JavaScript that allows users to add, edit, and delete tasks with a clean interface.",
    tools: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/shrutitokekar/Todolist",
  },
  {
    id: 4,
    name: "Skinthesis — Brand Page",
    category: "Web Design",
    year: "2026",
    description: "A brand page for Skinthesis, a skincare company, featuring a minimalist design, smooth scrolling, and interactive product showcases.",
    tools: ["Figma", "HTML/CSS", "JavaScript"],
    link: "#",
  },
];

const CATEGORIES = ["All", "Web Design", "UI/UX", "Creative Tech", "Brand Identity"];

function DesignCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        border: `1px solid ${hovered ? "rgba(100,90,80,0.28)" : "rgba(100,90,80,0.12)"}`,
        borderRadius: 8,
        overflow: "hidden",
        background: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.45)",
        backdropFilter: "blur(6px)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.09)" : "none",
        transform: visible
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div style={{
        width: "100%",
        height: 180,
        background: "linear-gradient(135deg, rgba(184,168,200,0.18) 0%, rgba(200,208,216,0.12) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid rgba(100,90,80,0.07)",
      }}>
        <span style={{
          fontFamily: "'Fraunces',serif",
          fontStyle: "italic",
          fontSize: 13,
          color: "#a09080",
          letterSpacing: "0.1em",
        }}>{project.category}</span>
      </div>

      <div style={{ padding: "22px 26px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 9,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#a09080",
          }}>
            {project.year}
          </span>
          <span style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9a8aaa",
            padding: "3px 10px",
            border: "1px solid rgba(154,138,170,0.3)",
            borderRadius: 20,
          }}>{project.category}</span>
        </div>

        <h3 style={{
          fontFamily: "'Fraunces',serif",
          fontWeight: 900,
          fontSize: 20,
          color: "#1a1815",
          marginBottom: 10,
          lineHeight: 1.2,
        }}>
          {project.name}
        </h3>
        <p style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 12,
          lineHeight: 1.8,
          color: "#7a7060",
          marginBottom: 18,
        }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tools.map(t => (
            <span key={t} style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              color: "#7a7060",
              padding: "4px 10px",
              background: "rgba(100,90,80,0.08)",
              borderRadius: 4,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function DesignPortfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const filtered = activeCategory === "All"
    ? designProjects
    : designProjects.filter(p => p.category === activeCategory);

  return (
    <section style={{ background: "#edeae4", minHeight: "100vh", padding: "80px 0 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 72px" }}>

        <div style={{
          marginBottom: 56,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <p style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#7a7060",
            marginBottom: 14,
          }}>
            Design Portfolio
          </p>
          <h1 style={{
            fontFamily: "'Fraunces',serif",
            fontWeight: 900,
            fontSize: "clamp(40px,6vw,72px)",
            color: "#1a1815",
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            Visual &amp;<br />
            <em style={{ fontStyle: "italic", color: "#9a8aaa" }}>Interactive</em><br />
            Work
          </h1>
          <p style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 13,
            lineHeight: 1.9,
            color: "#7a7060",
            maxWidth: 480,
          }}>
            UI/UX, web design, branding, and creative technology — where aesthetics meets engineering.
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 44 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "8px 18px",
              borderRadius: 2,
              border: "none",
              cursor: "pointer",
              background: activeCategory === cat ? "#1a1815" : "rgba(100,90,80,0.08)",
              color: activeCategory === cat ? "#edeae4" : "#7a7060",
              transition: "all 0.3s",
            }}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {filtered.map((p, i) => (
            <DesignCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{
            fontFamily: "'Fraunces',serif",
            fontStyle: "italic",
            color: "#a09080",
            fontSize: 18,
            marginTop: 60,
            textAlign: "center",
          }}>
            More coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
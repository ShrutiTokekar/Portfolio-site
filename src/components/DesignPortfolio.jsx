import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import caseStudies from "../data/caseStudies";
import { caseImage } from "../utils/caseImages";
import CoverStandIn from "./CoverStandIn";

// Each card opens its own mini case study at /design/:slug
const designProjects = caseStudies.map((c, i) => ({ id: i + 1, ...c }));

const CATEGORIES = ["All", "Web Design", "UI/UX", "Creative Tech", "Brand Identity"];

function DesignCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cover = caseImage(project.slug, "cover");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      to={`/design/${project.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
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
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 180,
          overflow: "hidden",
          borderBottom: "1px solid rgba(100,90,80,0.07)",
        }}
      >
        {cover ? (
          <img
            src={cover}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <CoverStandIn palette={project.palette} />
        )}
      </div>

      <div style={{ padding: "22px 26px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 9,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#6b6155",
            }}
          >
            {project.category} · {project.year}
          </span>
          {project.status && (
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6e5a86",
                padding: "3px 10px",
                border: "1px solid rgba(110,90,134,0.4)",
                borderRadius: 20,
                whiteSpace: "nowrap",
              }}
            >
              {project.status}
            </span>
          )}
        </div>

        <h3
          style={{
            fontFamily: "'Fraunces',serif",
            fontWeight: 900,
            fontSize: 20,
            color: "#1a1815",
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {project.title} — {project.subtitle}
        </h3>
        <p
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 12,
            lineHeight: 1.8,
            color: "#6b6155",
            marginBottom: 16,
          }}
        >
          {project.summary}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {project.tools.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                color: "#6b6155",
                padding: "4px 10px",
                background: "rgba(100,90,80,0.08)",
                borderRadius: 4,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 14,
            borderTop: "1px solid rgba(100,90,80,0.12)",
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#1a1815",
          }}
        >
          <span>Read case study</span>
          <span aria-hidden="true" style={{ transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.3s" }}>→</span>
        </div>
      </div>
    </Link>
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
    <section style={{ background: "#edeae4", minHeight: "100vh", padding: "clamp(40px, 8vw, 80px) 0 clamp(72px, 10vw, 120px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(20px, 5vw, 72px)" }}>

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
import React, { useState, useEffect } from "react";

const SKILLS = [
  { category: "Languages",   items: ["JavaScript", "TypeScript", "Python", "C", "C++", "Java", "PHP"] },
  { category: "Frontend",    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML/CSS"] },
  { category: "Backend",     items: ["Node.js", "MySQL", "MongoDB", "Docker", "REST APIs"] },
  { category: "Tools",       items: ["Git", "GitHub", "Linux", "Figma", "Vite", "Vercel"] },
];

const TIMELINE = [
  {
    year: "2025 –",
    title: "B.S. Computer Science",
    sub: "East Stroudsburg University",
    note: "Minor in Graphic & Web Design",
    type: "edu",
  },
  {
    year: "2023-2025",
    title: "A.S. Computer Science",
    sub: "Middlesex College",
    note: "Computer Programming Certificate · Visual Arts Certificate",
    type: "edu",
  },
  {
    year: "2024-2025",
    title: "Optometric Technician",
    sub: "The Eye Exam Group",
    note: "Patient care, data management, clinical support",
    type: "work",
  },
];

function useFadeIn(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

export default function About() {
  const [openSkill, setOpenSkill] = useState(null);
  const headerVisible  = useFadeIn(50);
  const leftVisible    = useFadeIn(150);
  const rightVisible   = useFadeIn(200);

  const fadeStyle = (visible, extraDelay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${extraDelay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${extraDelay}ms`,
  });

  return (
    <section style={{ background: "#edeae4", minHeight: "100vh", padding: "80px 0 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 72px" }}>

        {/* Header */}
        <div style={{ marginBottom: 72, ...fadeStyle(headerVisible) }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#7a7060", marginBottom: 14 }}>
            About Me
          </p>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "clamp(40px,6vw,72px)", color: "#1a1815", lineHeight: 1.05, marginBottom: 24 }}>
            Builder.<br />
            <em style={{ fontStyle: "italic", color: "#9a8aaa" }}>Designer.</em><br />
            Problem solver.
          </h1>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, lineHeight: 1.9, color: "#7a7060", maxWidth: 560 }}>
            I'm Shruti Tokekar — a CS student at East Stroudsburg University with a minor in Graphic &amp; Web Design.
            I love the intersection of engineering and aesthetics: building things that are technically solid and visually memorable.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* LEFT: Timeline */}
          <div style={fadeStyle(leftVisible)}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#7a7060", marginBottom: 28 }}>
              Experience &amp; Education
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TIMELINE.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} isLast={i === TIMELINE.length - 1} parentVisible={leftVisible} />
              ))}
            </div>
          </div>

          {/* RIGHT: Skills */}
          <div style={fadeStyle(rightVisible)}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#7a7060", marginBottom: 28 }}>
              Skills &amp; Stack
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {SKILLS.map((group, i) => {
                const isOpen = openSkill === i;
                return (
                  <div key={i}
                    onClick={() => setOpenSkill(isOpen ? null : i)}
                    style={{
                      border: `1px solid ${isOpen ? "rgba(100,90,80,0.25)" : "rgba(100,90,80,0.12)"}`,
                      borderRadius: 6,
                      overflow: "hidden",
                      background: isOpen ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1815" }}>
                        {group.category}
                      </span>
                      <span style={{
                        fontSize: 14, color: "#7a7060",
                        display: "inline-block",
                        transition: "transform 0.3s",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}>+</span>
                    </div>

                    <div style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 20px 18px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {group.items.map(skill => (
                            <span key={skill} style={{
                              fontFamily: "'DM Mono',monospace", fontSize: 11,
                              color: "#7a7060", padding: "5px 12px",
                              background: "rgba(100,90,80,0.07)",
                              borderRadius: 4, letterSpacing: "0.05em",
                            }}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Certs */}
            <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(154,138,170,0.08)", borderRadius: 8, border: "1px solid rgba(154,138,170,0.2)" }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9a8aaa", marginBottom: 12 }}>
                Certificates
              </p>
              {["Computer Programming Certificate", "Visual Arts Certificate"].map(cert => (
                <p key={cert} style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#7a7060", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#9a8aaa", display: "inline-block", flexShrink: 0 }} />
                  {cert}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, isLast }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), (index + 2) * 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div style={{
      display: "flex", gap: 24, paddingBottom: 32, position: "relative",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {!isLast && (
        <div style={{ position: "absolute", left: 30, top: 28, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }} />
      )}
      <div style={{
        width: 10, height: 10, borderRadius: "50%", flexShrink: 0, marginTop: 6,
        background: item.type === "edu" ? "#9a8aaa" : "#1a1815",
        boxShadow: `0 0 0 3px #edeae4, 0 0 0 4px ${item.type === "edu" ? "#9a8aaa" : "#1a1815"}`,
        zIndex: 1, marginLeft: 25,
      }} />
      <div>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#a09080", marginBottom: 4 }}>
          {item.year}
        </p>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 18, color: "#1a1815", marginBottom: 2, lineHeight: 1.2 }}>
          {item.title}
        </h3>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#7a7060", marginBottom: 4 }}>
          {item.sub}
        </p>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#a09080", fontStyle: "italic" }}>
          {item.note}
        </p>
      </div>
    </div>
  );
}
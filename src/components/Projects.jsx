import React, { useState, useEffect } from "react";

const projects = [
  { id: 1, name: "Flow State - Task management app", description: "A full-stack task manager built with Java and React components, featuring a Java Spring Boot backend with RESTful APIs and a React frontend with dynamic task boards and real-time updates.", techStack: ["Java", "Maven", "Spring Boot", "React", "REST API"], link: "https://github.com/shrutitokekar/Flow-state", year: "2026", category: "Full Stack" },
  { id: 2, name: "AI PersonalFinancial Assistant: Zenty", description: "A Full Stack AI based financial assistant made with python as the backend and nextjs as the frontend. It provides users with personalized financial insights, budgeting tools, and real-time market updates through an intuitive conversational interface.", techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Python", "OpenAI API"], link: "https://github.com/shrutitokekar/AI-Personal-finance-Zenty", year: "2025", category: "Full Stack" },
  { id: 3, name: "Space invaders game", description: "A classic space invaders game implemented in C++ using the SDLC library, featuring multiple levels and game state machine.", techStack: ["C++", "SDL", "Game Development"], link: "https://github.com/shrutitokekar/space-invaders", year: "2024", category: "Systems" },
  { id: 4, name: "Steganography in BMP", description: "C program that hides and extracts secret messages within BMP images using least significant bit manipulation.", techStack: ["C", "File I/O", "Binary"], link: "https://github.com/shrutitokekar/steganography-in-BMP", year: "2024", category: "Systems" },
  { id: 5, name: "Preemptive SJF Scheduler", description: "OS scheduling algorithm implementation in C with I/O handling, process queues, context switching, and deadline tracking.", techStack: ["C", "Linux", "OS Concepts"], link: "https://github.com/shrutitokekar/Preemptive-SJF-Scheduler", year: "2024", category: "Systems" },
  { id: 6, name: "Music Analyzer Backend", description: "PHP-based backend for a music analytics platform with RESTful API endpoints, Docker containerization, and MySQL.", techStack: ["PHP", "MySQL", "Docker", "REST API"], link: "https://github.com/shrutitokekar/music-analyzer-backend", year: "2023", category: "Backend" },
  { id: 7, name: "Student Management System", description: "Java-based system to manage student records with full CRUD operations and data visualization.", techStack: ["Java", "MySQL"], link: "https://github.com/shrutitokekar/student-management-system", year: "2023", category: "Backend" },
  { id: 8, name: "Online Shopping System", description: "A Java application designed to provide an interactive platform for online shopping. Users can register, browse products, manage their shopping carts, and process orders through a console-based interface.", techStack: ["Java", "MySQL"], link: "https://github.com/shrutitokekar/OnlineShoppingSystem", year: "2022", category: "Backend" },
  { id: 9, name: "TO-do List", description: "Simple to-do list built using HTML, CSS, and JavaScript that allows users to add, edit, and delete tasks with a clean interface.", techStack: ["HTML", "CSS", "JavaScript"], link: "https://github.com/shrutitokekar/Todolist", year: "2022", category: "Frontend" },
];

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
    <section style={{ background: "#edeae4", minHeight: "100vh", padding: "80px 0 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 72px" }}>

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
          {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
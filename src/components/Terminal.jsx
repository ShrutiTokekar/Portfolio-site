import React, { useEffect, useRef } from "react";

const LINES = [
  { type: "cmd",    text: "whoami" },
  { type: "purple", text: "shruti tokekar — cs student, designer, builder" },
  { type: "cmd",    text: "git log --oneline -1" },
  { type: "amber",  text: "a3f9c12  feat: add crash-animation hero + portal cards" },
  { type: "cmd",    text: "cat current-stack.txt" },
  { type: "tags",   items: ["React", "Next.js", "TypeScript", "Python", "Tailwind CSS", "Figma", "Spring Boot"] },
  { type: "cmd",    text: "ls projects/" },
  { type: "muted",  text: "flow-state/   zenty/   skinthesis/   space-invaders/   portfolio/" },
  { type: "cmd",    text: "status --current" },
  { type: "status", text: "open to internships & collaborations" },
];

const STYLES = `
  .st-term { background:#1a1815; border-radius:10px; overflow:hidden; font-family:'DM Mono','Menlo',monospace; }
  .st-bar { background:#2a2520; padding:12px 16px; display:flex; align-items:center; gap:8px; }
  .st-dot { width:11px; height:11px; border-radius:50%; flex-shrink:0; }
  .st-body { padding:24px 28px 28px; min-height:240px; }
  .st-line { font-size:12px; line-height:1.9; display:flex; gap:10px; }
  .st-prompt { color:#9a8aaa; flex-shrink:0; white-space:nowrap; }
  .st-cmd { color:#edeae4; }
  .st-out { padding-left:20px; font-size:11px; }
  .st-purple { color:#b8a8c8; }
  .st-amber { color:#c8a870; }
  .st-muted { color:#5a5550; }
  .st-green { color:#6aaa6a; }
  .st-tag { display:inline-block; background:#2a2520; color:#9a8aaa; font-size:10px; padding:2px 8px; border-radius:3px; margin:2px 3px 2px 0; border:1px solid #3a3530; }
  .st-cursor { display:inline-block; width:7px; height:13px; background:#9a8aaa; vertical-align:middle; animation:stBlink 1.1s step-end infinite; }
  .st-sdot { display:inline-block; width:7px; height:7px; border-radius:50%; background:#6aaa6a; margin-right:6px; animation:stPulse 2s ease-in-out infinite; flex-shrink:0; }
  @keyframes stBlink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes stPulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
`;

export default function Terminal() {
  const bodyRef = useRef(null);

  useEffect(() => {
    const id = "st-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = STYLES;
      document.head.appendChild(el);
    }

    const body = bodyRef.current;
    if (!body) return;
    let li = 0, ci = 0;
    let typingEl = null;
    let timer = null;
    let cancelled = false;

    function addRow(line) {
      const row = document.createElement("div");

      if (line.type === "cmd") {
        row.className = "st-line";
        const prompt = document.createElement("span");
        prompt.className = "st-prompt";
        prompt.textContent = "~/portfolio $";
        const cmd = document.createElement("span");
        cmd.className = "st-cmd";
        row.appendChild(prompt);
        row.appendChild(cmd);
        body.appendChild(row);
        typingEl = cmd;

      } else if (line.type === "tags") {
        row.style.paddingLeft = "20px";
        row.style.paddingBottom = "4px";
        line.items.forEach(t => {
          const s = document.createElement("span");
          s.className = "st-tag";
          s.textContent = t;
          row.appendChild(s);
        });
        body.appendChild(row);
        typingEl = null;

      } else if (line.type === "status") {
        row.className = "st-line st-out";
        const dot = document.createElement("span");
        dot.className = "st-sdot";
        const txt = document.createElement("span");
        txt.className = "st-green";
        txt.textContent = line.text;
        row.appendChild(dot);
        row.appendChild(txt);
        body.appendChild(row);
        typingEl = null;

      } else {
        const colorMap = { purple: "st-purple", amber: "st-amber", muted: "st-muted" };
        row.className = `st-line st-out ${colorMap[line.type] || ""}`;
        row.textContent = line.text;
        body.appendChild(row);
        typingEl = null;
      }
    }

    function addCursor() {
      const row = document.createElement("div");
      row.className = "st-line";
      const prompt = document.createElement("span");
      prompt.className = "st-prompt";
      prompt.textContent = "~/portfolio $";
      const cur = document.createElement("span");
      cur.className = "st-cursor";
      cur.style.marginLeft = "6px";
      row.appendChild(prompt);
      row.appendChild(cur);
      body.appendChild(row);
    }

    function tick() {
      if (cancelled) return;
      if (li >= LINES.length) { addCursor(); return; }

      const line = LINES[li];
      if (line.type === "cmd") {
        if (ci === 0) addRow(line);
        if (ci < line.text.length) {
          typingEl.textContent = line.text.slice(0, ci + 1);
          ci++;
          timer = setTimeout(tick, 50 + Math.random() * 45);
        } else {
          ci = 0; li++;
          timer = setTimeout(tick, 200);
        }
      } else {
        addRow(line);
        li++;
        timer = setTimeout(tick, line.type === "tags" ? 130 : 210);
      }
    }

    timer = setTimeout(tick, 500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
      <div className="st-term">
        <div className="st-bar">
          <div className="st-dot" style={{ background: "#c06060" }} />
          <div className="st-dot" style={{ background: "#c0a060" }} />
          <div className="st-dot" style={{ background: "#6aaa6a" }} />
          <span style={{ marginLeft: 8, fontSize: 11, color: "#5a5550", fontFamily: "'DM Mono',monospace", letterSpacing: "0.1em" }}>
            shruti@portfolio ~
          </span>
        </div>
        <div className="st-body" ref={bodyRef} />
      </div>
    </div>
  );
}
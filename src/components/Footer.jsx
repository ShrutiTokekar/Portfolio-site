import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{
      background: "#edeae4",
      borderTop: "1px solid rgba(0,0,0,0.07)",
      padding: "36px 52px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <p style={{ fontFamily: "'DM Mono',Menlo,monospace", fontSize: 10, letterSpacing: "0.15em", color: "#7a7060", margin: 0 }}>
        © {new Date().getFullYear()} Shruti Tokekar
      </p>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {[
          { href: "https://linkedin.com/in/shruti-tokekar", Icon: FaLinkedin },
          { href: "https://github.com/shrutitokekar",       Icon: FaGithub   },
        ].map((item) => (
          <a key={item.href} href={item.href} target="_blank" rel="noreferrer"
            style={{ color: "#a09080", transition: "color 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#1a1815"}
            onMouseLeave={e => e.currentTarget.style.color = "#a09080"}
          ><item.Icon size={18} /></a>
        ))}
      </div>
    </footer>
  );
}
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const LINKS = [
  { label: "About",  to: "/about"    },
  { label: "Design", to: "/design"   },
  { label: "Dev",    to: "/projects" },
];

const NAV_STYLE = {
  position: "sticky", top: 0, zIndex: 100,
  display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "0 52px", height: 68,
  background: "#edeae4",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  transition: "box-shadow 0.4s",
  fontFamily: "'DM Mono', Menlo, monospace",
};

export default function Navbar() {
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.style.boxShadow = window.scrollY > 20
        ? "0 4px 24px rgba(0,0,0,0.06)"
        : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} style={NAV_STYLE}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src={logo} alt="Shruti Tokekar" style={{ height: 36, width: "auto", objectFit: "contain" }} />
      </Link>

      {/* Links */}
      <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
        {LINKS.map(({ label, to }) => {
          const active = location.pathname === to;
          return (
            <li key={label}>
              <Link to={to} style={{
                fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                color: active ? "#1a1815" : "#7a7060",
                textDecoration: "none",
                borderBottom: active ? "1px solid #1a1815" : "1px solid transparent",
                paddingBottom: 2,
                transition: "color 0.3s, border-color 0.3s",
              }}
                onMouseEnter={e => { e.target.style.color = "#1a1815"; e.target.style.borderColor = "#1a1815"; }}
                onMouseLeave={e => {
                  e.target.style.color = active ? "#1a1815" : "#7a7060";
                  e.target.style.borderColor = active ? "#1a1815" : "transparent";
                }}
              >{label}</Link>
            </li>
          );
        })}

        {/* CTA */}
        <li>
          <Link to="/contact" style={{
            fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#edeae4", background: "#1a1815",
            padding: "9px 22px", borderRadius: 2,
            textDecoration: "none", transition: "background 0.3s",
          }}
            onMouseEnter={e => e.target.style.background = "#3a3530"}
            onMouseLeave={e => e.target.style.background = "#1a1815"}
          >Say Hello →</Link>
        </li>
      </ul>
    </nav>
  );
}
import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import useMedia from "../hooks/useMedia";

const LINKS = [
  { label: "About", to: "/about" },
  { label: "Design", to: "/design" },
  { label: "Dev", to: "/projects" },
];

const MONO = "'DM Mono', Menlo, monospace";

// One navigation bar for the whole site.
//  - variant "home": fixed and transparent over the hero (the hero fades in a
//    background as you scroll, through the forwarded ref).
//  - variant "page": sticky with a cream background.
// On phones the links collapse into a menu button.
const SiteNav = forwardRef(function SiteNav({ variant = "page" }, ref) {
  const isMobile = useMedia("(max-width: 720px)");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navEl = useRef(null);

  const setRefs = useCallback(
    (el) => {
      navEl.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref]
  );

  // Close the menu when the page changes or the screen gets wide.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Soft shadow under the page bar once you scroll.
  useEffect(() => {
    if (variant !== "page") return undefined;
    const onScroll = () => {
      if (navEl.current) navEl.current.style.boxShadow = window.scrollY > 20 ? "0 4px 24px rgba(0,0,0,0.06)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + "/");

  const barStyle = {
    position: variant === "home" ? "fixed" : "sticky",
    top: 0,
    left: variant === "home" ? 0 : undefined,
    right: variant === "home" ? 0 : undefined,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isMobile ? "0 20px" : "0 52px",
    height: 68,
    fontFamily: MONO,
    transition: variant === "home" ? "background 0.4s, box-shadow 0.4s" : "box-shadow 0.4s",
    ...(variant === "page" ? { background: "#edeae4", borderBottom: "1px solid rgba(0,0,0,0.06)" } : {}),
  };

  const linkStyle = (active) => ({
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: active ? "#1a1815" : "#6b6155",
    textDecoration: "none",
    borderBottom: variant === "page" && active ? "1px solid #1a1815" : "1px solid transparent",
    paddingBottom: 2,
    transition: "color 0.3s, border-color 0.3s",
  });

  const hover = (active) => ({
    onMouseEnter: (e) => {
      e.currentTarget.style.color = "#1a1815";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.color = active ? "#1a1815" : "#6b6155";
    },
  });

  const ctaStyle = {
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#edeae4",
    background: "#1a1815",
    padding: "9px 22px",
    borderRadius: 2,
    textDecoration: "none",
    transition: "background 0.3s",
  };

  return (
    <nav ref={setRefs} style={barStyle} aria-label="Main">
      <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <img src={logo} alt="Shruti Tokekar" style={{ height: 36, width: "auto", objectFit: "contain" }} />
      </Link>

      {!isMobile && (
        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          {LINKS.map(({ label, to }) => {
            const active = isActive(to);
            return (
              <li key={label}>
                <Link to={to} style={linkStyle(active)} {...hover(active)}>
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              to="/contact"
              style={ctaStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#3a3530")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1815")}
            >
              Say Hello →
            </Link>
          </li>
        </ul>
      )}

      {isMobile && (
        <>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
            style={{
              width: 44,
              height: 44,
              margin: "0 -10px 0 0",
              background: "#edeae4",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  background: "#1a1815",
                  transition: "transform 0.3s, opacity 0.2s",
                  transform: open ? (i === 0 ? "translateY(7.5px) rotate(45deg)" : i === 2 ? "translateY(-7.5px) rotate(-45deg)" : "none") : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>

          {open && (
            <div
              id="site-menu"
              style={{
                position: "absolute",
                top: 68,
                left: 0,
                right: 0,
                background: "#edeae4",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
                padding: "6px 20px 22px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {LINKS.map(({ label, to }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={label}
                    to={to}
                    style={{
                      ...linkStyle(active),
                      fontSize: 12,
                      padding: "17px 0",
                      borderBottom: "1px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link to="/contact" style={{ ...ctaStyle, marginTop: 18, textAlign: "center", padding: "15px 22px", fontSize: 11 }}>
                Say Hello →
              </Link>
            </div>
          )}
        </>
      )}
    </nav>
  );
});

export default SiteNav;

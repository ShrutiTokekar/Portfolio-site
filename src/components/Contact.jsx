import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

function useFadeIn(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

function Field({ label, id, type = "text", value, onChange, textarea = false }) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  const baseInput = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "#1a1815" : "rgba(100,90,80,0.25)"}`,
    outline: "none",
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    color: "#1a1815",
    padding: "14px 0 10px",
    resize: "none",
    transition: "border-color 0.3s",
    display: "block",
    boxSizing: "border-box",
  };

  return (
    <div style={{ position: "relative", marginBottom: 40 }}>
      <label htmlFor={id} style={{
        position: "absolute",
        top: focused || filled ? -8 : 14,
        left: 0,
        fontFamily: "'DM Mono', monospace",
        fontSize: focused || filled ? 9 : 12,
        letterSpacing: focused || filled ? "0.3em" : "0.1em",
        textTransform: "uppercase",
        color: focused ? "#1a1815" : "#a09080",
        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
        pointerEvents: "none",
      }}>
        {label}
      </label>

      {textarea ? (
        <textarea id={id} name={id} rows={4} required value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...baseInput, paddingTop: 20, lineHeight: 1.8 }} />
      ) : (
        <input id={id} name={id} type={type} required value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={baseInput} />
      )}

      <div style={{
        position: "absolute", bottom: 0, left: 0,
        height: 1,
        width: focused ? "100%" : "0%",
        background: "#1a1815",
        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [btnHovered, setBtnHovered] = useState(false);

  const leftVisible  = useFadeIn(50);
  const linksVisible = useFadeIn(200);
  const badgeVisible = useFadeIn(300);
  const rightVisible = useFadeIn(150);

  const fadeStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs.send(
      "service_akv2ulp", "template_xy51y5g",
      { from_name: formData.name, from_email: formData.email, message: formData.message },
      "6pl2_pSAXXV6qKFf9"
    )
    .then(() => { setStatus("sent"); setFormData({ name: "", email: "", message: "" }); })
    .catch(() => setStatus("error"));
  };

  return (
    <section style={{ background: "#edeae4", minHeight: "100vh", padding: "80px 0 120px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>

        {/* LEFT */}
        <div>
          <div style={fadeStyle(leftVisible)}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#7a7060", marginBottom: 14 }}>
              Get in touch
            </p>
            <h1 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "clamp(40px,5.5vw,68px)", color: "#1a1815", lineHeight: 1.05, marginBottom: 28 }}>
              Let's make<br />something<br />
              <em style={{ fontStyle: "italic", color: "#9a8aaa" }}>together.</em>
            </h1>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, lineHeight: 1.9, color: "#7a7060", maxWidth: 360, marginBottom: 48 }}>
              Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, ...fadeStyle(linksVisible) }}>
            {[
              { label: "Email",    value: "shrutitokekar@gmail.com",           href: "mailto:shrutitokekar@gmail.com" },
              { label: "LinkedIn", value: "linkedin.com/in/shruti-tokekar",    href: "https://linkedin.com/in/shruti-tokekar" },
              { label: "GitHub",   value: "github.com/shrutitokekar",          href: "https://github.com/shrutitokekar" },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#a09080", marginBottom: 4 }}>{label}</p>
                <a href={href} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#1a1815", textDecoration: "none", borderBottom: "1px solid rgba(26,24,21,0.2)", paddingBottom: 1, transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.target.style.borderColor = "#1a1815"}
                  onMouseLeave={e => e.target.style.borderColor = "rgba(26,24,21,0.2)"}
                >{value}</a>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(100,90,80,0.12)", borderRadius: 24, ...fadeStyle(badgeVisible) }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6aaa6a", boxShadow: "0 0 0 3px rgba(106,170,106,0.2)", display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7a7060" }}>
              Open to opportunities
            </span>
          </div>
        </div>

        {/* RIGHT: form */}
        <div style={fadeStyle(rightVisible)}>
          <div style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(100,90,80,0.12)", borderRadius: 12, padding: "48px 44px", backdropFilter: "blur(8px)" }}>
            {status === "sent" ? (
              <SentConfirmation onReset={() => setStatus("idle")} />
            ) : (
              <form onSubmit={handleSubmit}>
                <Field label="Name"    id="name"    value={formData.name}    onChange={handleChange} />
                <Field label="Email"   id="email"   type="email" value={formData.email}   onChange={handleChange} />
                <Field label="Message" id="message" value={formData.message} onChange={handleChange} textarea />

                {status === "error" && (
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#c06060", marginBottom: 20 }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <button type="submit" disabled={status === "sending"}
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  style={{
                    width: "100%", padding: "16px 0",
                    fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
                    background: btnHovered ? "#3a3530" : "#1a1815",
                    color: "#edeae4", border: "none", borderRadius: 4,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    transition: "background 0.3s",
                    opacity: status === "sending" ? 0.7 : 1,
                  }}
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

function SentConfirmation({ onReset }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 20); }, []);

  return (
    <div style={{
      textAlign: "center", padding: "40px 0",
      opacity: visible ? 1 : 0,
      transform: visible ? "scale(1)" : "scale(0.96)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    }}>
      <div style={{ fontSize: 36, marginBottom: 16 }}>✦</div>
      <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: 26, color: "#1a1815", marginBottom: 10 }}>
        Message sent!
      </h3>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#7a7060", lineHeight: 1.8 }}>
        Thanks for reaching out. I'll get back to you soon.
      </p>
      <button onClick={onReset} style={{
        marginTop: 28, fontFamily: "'DM Mono',monospace", fontSize: 10,
        letterSpacing: "0.2em", textTransform: "uppercase",
        background: "none", border: "none", borderBottom: "1px solid #1a1815",
        color: "#1a1815", cursor: "pointer", paddingBottom: 2,
      }}>Send another →</button>
    </div>
  );
}
import React from "react";

// Shown until a real screenshot exists at src/assets/case-studies/<slug>/cover.*
export default function CoverStandIn({ palette }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background: palette.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "62%",
          height: "64%",
          background: palette.surface,
          borderRadius: 10,
          padding: 14,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ height: 8, width: "46%", borderRadius: 3, background: palette.ink, opacity: 0.85 }} />
        <div style={{ height: 5, width: "70%", borderRadius: 3, background: palette.ink, opacity: 0.3 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 4, flex: 1 }}>
          <div style={{ background: palette.accent, borderRadius: 5 }} />
          <div style={{ background: palette.accent, borderRadius: 5, opacity: 0.6 }} />
          <div style={{ background: palette.accent, borderRadius: 5, opacity: 0.6 }} />
          <div style={{ background: palette.accent, borderRadius: 5 }} />
        </div>
      </div>
    </div>
  );
}

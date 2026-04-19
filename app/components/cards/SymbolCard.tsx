"use client";

import { TIER_GLOW, SYMBOL_DIMS } from "./constants";
import type { SymbolCardData, CardSize } from "./constants";

interface SymbolCardProps {
  card: SymbolCardData;
  size?: CardSize;
  hoverable?: boolean;
}

export default function SymbolCard({ card, size = "md", hoverable = true }: SymbolCardProps) {
  const dims = SYMBOL_DIMS[size];
  const glow = TIER_GLOW[card.tier];

  return (
    <div
      style={{
        width: dims.w, height: dims.h, borderRadius: 10,
        background: `radial-gradient(circle at 50% 35%, ${card.color}25, #0a0a15 70%)`,
        border: `2px solid ${card.color}`,
        position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'Rajdhani', sans-serif",
        boxShadow: `0 4px 20px ${card.color}55, 0 0 30px ${card.color}33, inset 0 0 20px ${card.color}15`,
        transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s",
        overflow: "hidden",
        cursor: hoverable ? "pointer" : "default",
        flexShrink: 0,
      }}
      onMouseEnter={hoverable ? e => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.08)";
        e.currentTarget.style.boxShadow = `0 16px 40px ${card.color}aa, 0 0 50px ${card.color}66`;
      } : undefined}
      onMouseLeave={hoverable ? e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = `0 4px 20px ${card.color}55, 0 0 30px ${card.color}33, inset 0 0 20px ${card.color}15`;
      } : undefined}
    >
      <div style={{
        position: "absolute", top: 0, left: "-100%", width: "300%", height: "100%",
        background: `linear-gradient(90deg, transparent, ${card.color}30, transparent)`,
        animation: "shimmer 3s infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: "20%",
        border: `1px solid ${card.color}33`, borderRadius: "50%",
        animation: "spin 8s linear infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: "30%",
        border: `1px dashed ${card.color}22`, borderRadius: "50%",
        animation: "spinReverse 12s linear infinite", pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", top: 4, left: 6,
        fontSize: dims.valFs, color: card.color, fontWeight: 900,
        fontFamily: "'Orbitron', sans-serif",
        textShadow: `0 0 8px ${card.color}`, lineHeight: 1,
      }}>{card.value}</div>

      <div style={{
        position: "absolute", bottom: 4, right: 6,
        fontSize: dims.valFs, color: card.color, fontWeight: 900,
        fontFamily: "'Orbitron', sans-serif",
        textShadow: `0 0 8px ${card.color}`, transform: "rotate(180deg)", lineHeight: 1,
      }}>{card.value}</div>

      <div style={{
        fontSize: dims.symFs, color: card.color,
        filter: `drop-shadow(0 0 15px ${card.color})`,
        animation: "pulse 2s ease-in-out infinite",
        zIndex: 1, lineHeight: 1, marginBottom: 2,
      }}>{card.symbol}</div>

      <div style={{
        fontSize: dims.nameFs, color: card.color, fontWeight: 700,
        fontFamily: "'Orbitron', sans-serif", letterSpacing: 1,
        textTransform: "uppercase", textShadow: `0 0 8px ${card.color}88`, zIndex: 1,
      }}>{card.name}</div>

      <div style={{
        position: "absolute", top: 5, right: 0,
        background: `linear-gradient(135deg, ${glow}, ${glow}cc)`,
        color: "#000", fontSize: 5.5, fontWeight: 900,
        padding: "1px 5px", borderRadius: "4px 0 0 4px",
        fontFamily: "'Orbitron', sans-serif",
        letterSpacing: 0.5, textTransform: "uppercase",
      }}>{card.tier}</div>
    </div>
  );
}

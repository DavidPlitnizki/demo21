"use client";

import { TIER_GLOW } from "./constants";
import type { SpellData } from "./constants";

interface SpellCardProps {
  spell: SpellData;
  size?: "sm" | "md";
}

const SPELL_DIMS = {
  sm: { w: 72,  h: 100, emojiFs: 28, nameFs: 8,  descFs: 6 },
  md: { w: 100, h: 140, emojiFs: 42, nameFs: 11, descFs: 8 },
};

export default function SpellCard({ spell, size = "md" }: SpellCardProps) {
  const glow = TIER_GLOW[spell.tier];
  const dims = SPELL_DIMS[size];

  return (
    <div
      style={{
        width: dims.w, height: dims.h, borderRadius: 12,
        background: `linear-gradient(145deg, ${spell.color}22, #0a0a15 70%)`,
        border: `2px solid ${spell.color}`,
        position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "8px 6px", gap: 4,
        boxShadow: `0 4px 20px ${glow}44, 0 0 30px ${spell.color}33, inset 0 0 20px ${spell.color}11`,
        transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s",
        overflow: "hidden", cursor: "pointer", flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.07)";
        e.currentTarget.style.boxShadow = `0 16px 40px ${glow}88, 0 0 50px ${spell.color}66`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = `0 4px 20px ${glow}44, 0 0 30px ${spell.color}33, inset 0 0 20px ${spell.color}11`;
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: "-100%", width: "300%", height: "100%",
        background: `linear-gradient(90deg, transparent, ${spell.color}30, transparent)`,
        animation: "shimmer 3s infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
        fontSize: 6, color: glow, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 1.5,
        fontFamily: "'Orbitron', sans-serif",
      }}>{spell.tier}</div>
      <div style={{
        fontSize: dims.emojiFs, filter: `drop-shadow(0 0 12px ${spell.color})`,
        animation: "float 3s ease-in-out infinite", marginTop: 6,
      }}>{spell.emoji}</div>
      <div style={{
        fontSize: dims.nameFs, color: spell.color, fontWeight: 700,
        textAlign: "center", fontFamily: "'Orbitron', sans-serif",
        textShadow: `0 0 10px ${spell.color}88`,
      }}>{spell.name}</div>
      <div style={{
        fontSize: dims.descFs, color: "#aaa",
        textAlign: "center", lineHeight: 1.3, padding: "0 4px",
      }}>{spell.desc}</div>
    </div>
  );
}

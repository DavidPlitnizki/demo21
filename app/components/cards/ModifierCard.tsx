"use client";

import { MODIFIER_DIMS } from "./constants";
import type { CardSize } from "./constants";

interface ModifierCardProps {
  value: string;
  type?: "buff" | "debuff";
  size?: CardSize;
  hoverable?: boolean;
}

export default function ModifierCard({ value, type = "buff", size = "md", hoverable = true }: ModifierCardProps) {
  const isBuff = type === "buff";
  const primaryColor = isBuff ? "#4ade80" : "#ef4444";
  const bgTint = isBuff ? "rgba(74, 222, 128, 0.08)" : "rgba(239, 68, 68, 0.08)";
  const dims = MODIFIER_DIMS[size];

  return (
    <div
      style={{
        width: dims.w, height: dims.h, borderRadius: 10,
        background: `linear-gradient(145deg, ${bgTint}, #0a0a15 70%)`,
        border: `2px solid ${primaryColor}`,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Orbitron', sans-serif",
        boxShadow: `0 4px 20px ${primaryColor}44, 0 0 25px ${primaryColor}22, inset 0 0 15px ${primaryColor}15`,
        transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s",
        overflow: "hidden",
        cursor: hoverable ? "pointer" : "default",
        flexShrink: 0,
      }}
      onMouseEnter={hoverable ? e => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.08)";
        e.currentTarget.style.boxShadow = `0 16px 40px ${primaryColor}88, 0 0 45px ${primaryColor}55`;
      } : undefined}
      onMouseLeave={hoverable ? e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = `0 4px 20px ${primaryColor}44, 0 0 25px ${primaryColor}22, inset 0 0 15px ${primaryColor}15`;
      } : undefined}
    >
      <div style={{
        position: "absolute", top: 0, left: "-100%", width: "300%", height: "100%",
        background: `linear-gradient(90deg, transparent, ${primaryColor}22, transparent)`,
        animation: "shimmer 3s infinite", pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", top: 5, left: 7,
        fontSize: dims.cornerFs, color: primaryColor, fontWeight: 900,
        textShadow: `0 0 8px ${primaryColor}`, lineHeight: 1, letterSpacing: -0.5,
      }}>{value}</div>

      <div style={{
        fontSize: dims.valFs, color: primaryColor, fontWeight: 900,
        textShadow: `0 0 20px ${primaryColor}, 0 0 40px ${primaryColor}66`,
        animation: "pulseGlow 2s ease-in-out infinite", letterSpacing: -1,
      }}>{value}</div>

      <div style={{
        position: "absolute", bottom: 5, right: 7,
        fontSize: dims.cornerFs, color: primaryColor, fontWeight: 900,
        textShadow: `0 0 8px ${primaryColor}`, lineHeight: 1,
        transform: "rotate(180deg)", letterSpacing: -0.5,
      }}>{value}</div>

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)`,
      }} />
    </div>
  );
}

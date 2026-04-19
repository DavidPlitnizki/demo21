"use client";

import { SUIT_COLORS, SEALS, CARD_DIMS } from "./constants";
import type { Suit, SealKey, CardSize } from "./constants";

interface CardProps {
  suit: Suit;
  rank: string;
  seal?: SealKey;
  size?: CardSize;
  hoverable?: boolean;
}

export default function Card({ suit, rank, seal, size = "md", hoverable = true }: CardProps) {
  const color = SUIT_COLORS[suit];
  const sealData = seal ? SEALS[seal] : null;
  const dims = CARD_DIMS[size];

  const effectiveValue = (() => {
    if (seal === "wild") return "?";
    let v = ["J", "Q", "K"].includes(rank) ? 10 : rank === "A" ? 11 : parseInt(rank);
    if (seal === "plus1")  v += 1;
    if (seal === "plus2")  v += 2;
    if (seal === "plus3")  v += 3;
    if (seal === "minus1") v -= 1;
    if (seal === "minus2") v -= 2;
    if (seal === "minus3") v -= 3;
    if (seal === "mult15") v = Math.floor(v * 1.5);
    if (seal === "mult2")  v *= 2;
    return Math.max(1, v);
  })();

  const baseValue = ["J", "Q", "K"].includes(rank) ? 10 : rank === "A" ? 11 : parseInt(rank);
  const isModified = seal && seal !== "wild" && seal !== "gold" && effectiveValue !== baseValue;

  return (
    <div
      style={{
        width: dims.w, height: dims.h, borderRadius: 10,
        background: sealData
          ? `linear-gradient(145deg, ${sealData.color}18, #0d0d1a 60%)`
          : "linear-gradient(145deg, #1a1a2e, #0d0d1a)",
        border: `2px solid ${sealData ? sealData.color : color}`,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Courier New', monospace",
        boxShadow: sealData
          ? `0 4px 20px ${sealData.color}44, 0 0 25px ${sealData.color}22, inset 0 0 15px ${sealData.color}11`
          : `0 4px 15px ${color}33`,
        transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s",
        overflow: "hidden",
        cursor: hoverable ? "pointer" : "default",
        flexShrink: 0,
      }}
      onMouseEnter={hoverable ? e => {
        e.currentTarget.style.transform = "translateY(-10px) scale(1.05)";
        if (sealData) e.currentTarget.style.boxShadow = `0 12px 30px ${sealData.color}66, 0 0 40px ${sealData.color}44`;
      } : undefined}
      onMouseLeave={hoverable ? e => {
        e.currentTarget.style.transform = "";
        if (sealData) e.currentTarget.style.boxShadow = `0 4px 20px ${sealData.color}44, 0 0 25px ${sealData.color}22, inset 0 0 15px ${sealData.color}11`;
      } : undefined}
    >
      {sealData && (
        <div style={{
          position: "absolute", top: 0, left: "-100%", width: "300%", height: "100%",
          background: `linear-gradient(90deg, transparent, ${sealData.color}25, transparent)`,
          animation: "shimmer 2.5s infinite", pointerEvents: "none",
        }} />
      )}

      <div style={{ position: "absolute", top: 4, left: 6, fontSize: dims.rankFs, color: sealData ? sealData.color : color, fontWeight: 700, lineHeight: 1 }}>{rank}</div>
      <div style={{ fontSize: dims.suitFs, color, filter: `drop-shadow(0 0 6px ${color}88)` }}>{suit}</div>
      <div style={{ position: "absolute", bottom: 4, right: 6, fontSize: dims.rankFs, color: sealData ? sealData.color : color, fontWeight: 700, transform: "rotate(180deg)", lineHeight: 1 }}>{rank}</div>

      {sealData && (
        <div style={{
          position: "absolute", top: -1, right: -1,
          background: `linear-gradient(135deg, ${sealData.color}, ${sealData.color}cc)`,
          color: "#000", fontSize: dims.sealFs, fontWeight: 900,
          padding: "1px 5px", borderRadius: "0 8px 0 6px",
          fontFamily: "'Orbitron', sans-serif", boxShadow: `0 0 8px ${sealData.color}88`,
        }}>{sealData.label}</div>
      )}

      {isModified && (
        <div style={{
          position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
          background: sealData!.color, color: "#000",
          fontSize: 9, fontWeight: 900, padding: "1px 7px", borderRadius: 6,
          fontFamily: "'Orbitron', sans-serif",
        }}>={effectiveValue}</div>
      )}

      {seal === "wild" && (
        <div style={{
          position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
          background: "#e879f9", color: "#000", fontSize: 8, fontWeight: 900,
          padding: "1px 7px", borderRadius: 6, fontFamily: "'Orbitron', sans-serif",
        }}>WILD</div>
      )}

      {seal === "gold" && (
        <div style={{
          position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
          background: "#ffd700", color: "#000", fontSize: 8, fontWeight: 900,
          padding: "1px 7px", borderRadius: 6, fontFamily: "'Orbitron', sans-serif",
        }}>+5💰</div>
      )}
    </div>
  );
}

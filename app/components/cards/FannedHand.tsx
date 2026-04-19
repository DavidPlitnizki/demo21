"use client";

import Card from "./Card";
import SymbolCard from "./SymbolCard";
import ModifierCard from "./ModifierCard";
import type { Suit, SealKey, SymbolCardData } from "./constants";

type HandCard =
  | { suit: Suit; rank: string; seal?: SealKey; mod?: never; symbol?: never }
  | { mod: string; type?: "buff" | "debuff"; suit?: never; symbol?: never }
  | (SymbolCardData & { mod?: never; suit?: never });

interface FannedHandProps {
  cards: HandCard[];
}

export default function FannedHand({ cards }: FannedHandProps) {
  const n = cards.length;
  return (
    <div style={{ position: "relative", height: 140, display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
      {cards.map((c, i) => {
        const mid = (n - 1) / 2;
        const offset = i - mid;
        const rot = offset * 7;
        const tx = offset * 50;
        const ty = Math.abs(offset) * 8;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`,
              transformOrigin: "bottom center",
              zIndex: i, transition: "transform 0.3s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = `translateX(${tx}px) translateY(${ty - 25}px) rotate(${rot}deg) scale(1.1)`;
              e.currentTarget.style.zIndex = "100";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`;
              e.currentTarget.style.zIndex = String(i);
            }}
          >
            {"mod" in c && c.mod
              ? <ModifierCard value={c.mod} type={c.type} hoverable={false} />
              : "symbol" in c && c.symbol
              ? <SymbolCard card={c as SymbolCardData} hoverable={false} />
              : <Card suit={(c as { suit: Suit; rank: string; seal?: SealKey }).suit} rank={(c as { suit: Suit; rank: string; seal?: SealKey }).rank} seal={(c as { suit: Suit; rank: string; seal?: SealKey }).seal} hoverable={false} />}
          </div>
        );
      })}
    </div>
  );
}

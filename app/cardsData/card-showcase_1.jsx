import { useState } from "react";
import { Card, SymbolCard, ModifierCard, SpellCard, FannedHand } from "../components/cards";
import {
  SUITS, SUIT_COLORS, SEALS, SYMBOL_CARDS,
  PLAYER_MODIFIERS, DEALER_MODIFIERS, SPELLS, TIER_GLOW,
} from "../components/cards/constants";

const TIER_ORDER = ["legendary", "epic", "rare", "uncommon", "common"];

const Section = ({ title, subtitle, children }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{
      fontSize: 10, letterSpacing: 3, color: "#ffd700",
      fontFamily: "'Orbitron', sans-serif", marginBottom: 4,
      textTransform: "uppercase",
    }}>{title}</div>
    {subtitle && <div style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>{subtitle}</div>}
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
      {children}
    </div>
  </div>
);

const CardWithLabel = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    {children}
    <div style={{ fontSize: 9, color: "#888", fontFamily: "'Orbitron', sans-serif", letterSpacing: 0.5, textAlign: "center", maxWidth: 110, lineHeight: 1.4 }}>
      {label}
    </div>
  </div>
);

export default function CardShowcase() {
  const [tab, setTab] = useState("cards");

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap');
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes titleGlow { 0%,100% { text-shadow: 0 0 20px #ffd70066; } 50% { text-shadow: 0 0 40px #ffd700aa, 0 0 80px #ff450066; } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes spinReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes pulse { 0%,100% { transform: scale(1); filter: drop-shadow(0 0 10px currentColor); } 50% { transform: scale(1.08); filter: drop-shadow(0 0 18px currentColor); } }
    @keyframes pulseGlow { 0%,100% { transform: scale(1); filter: drop-shadow(0 0 10px currentColor); } 50% { transform: scale(1.05); filter: drop-shadow(0 0 20px currentColor); } }
  `;

  const bg = {
    width: "100%", minHeight: "100vh",
    background: "radial-gradient(ellipse at 50% 0%, #0f1a2e 0%, #080c14 50%, #03050a 100%)",
    fontFamily: "'Rajdhani', sans-serif",
    color: "#e0e0e0",
    padding: "30px 20px 60px",
    position: "relative",
  };

  const grid = {
    position: "absolute", inset: 0,
    backgroundImage: "linear-gradient(rgba(255,215,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.02) 1px, transparent 1px)",
    backgroundSize: "40px 40px", pointerEvents: "none",
  };

  return (
    <div style={bg}>
      <style>{styles}</style>
      <div style={grid} />

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#ffd700", fontFamily: "'Orbitron', sans-serif", opacity: 0.7 }}>
            ♠ ♥ ♦ ♣ ✦ ☾ ☀
          </div>
          <h1 style={{
            fontSize: 30, fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
            background: "linear-gradient(135deg, #ffd700, #ff6b35, #ff4500)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "8px 0 4px", animation: "titleGlow 3s infinite",
          }}>CARD SHOWCASE</h1>
          <p style={{ color: "#666", fontSize: 12, margin: 0 }}>Blackjack Royale — все типы карт и эффекты</p>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 30, flexWrap: "wrap" }}>
          {[
            { id: "cards",     label: "Карты" },
            { id: "seals",     label: "Печати" },
            { id: "modifiers", label: "Модификаторы" },
            { id: "symbols",   label: "Символы" },
            { id: "spells",    label: "Заклинания" },
            { id: "hand",      label: "Рука" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "8px 16px", fontSize: 11, fontWeight: 700,
                fontFamily: "'Orbitron', sans-serif",
                background: tab === t.id ? "linear-gradient(135deg, #ffd700, #ff8c00)" : "rgba(255,255,255,0.04)",
                border: tab === t.id ? "none" : "1px solid #222",
                borderRadius: 20,
                color: tab === t.id ? "#0a0a0a" : "#888",
                cursor: "pointer", transition: "all 0.2s", letterSpacing: 1,
              }}
            >{t.label}</button>
          ))}
        </div>

        <div style={{ animation: "fadeIn 0.4s ease-out" }}>

          {tab === "cards" && (
            <>
              <Section title="Базовые карты" subtitle="Стандартная колода 52 карты — 4 масти, 13 значений">
                {SUITS.map(suit => (
                  <CardWithLabel key={suit} label={`Масть ${suit}`}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Card suit={suit} rank="A" />
                      <Card suit={suit} rank="K" />
                    </div>
                  </CardWithLabel>
                ))}
              </Section>

              <Section title="Все ранги" subtitle="Пики — пример всех 13 значений">
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {["A","2","3","4","5","6","7","8","9","10","J","Q","K"].map(r => <Card key={r} suit="♠" rank={r} size="sm" />)}
                </div>
              </Section>

              <Section title="Рубашка" subtitle="Закрытая карта дилера">
                <div style={{
                  width: 76, height: 110, borderRadius: 10,
                  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                  border: "2px solid #2a2a4e",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 36, color: "#3a4a6e",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                }}>🂠</div>
              </Section>
            </>
          )}

          {tab === "seals" && (
            <>
              <Section title="Плюсовые печати" subtitle="Агрессивная стратегия — увеличивают значение карты">
                <CardWithLabel label="+1 → 8 становится 9"><Card suit="♥" rank="8" seal="plus1" /></CardWithLabel>
                <CardWithLabel label="+2 → 7 становится 9"><Card suit="♦" rank="7" seal="plus2" /></CardWithLabel>
                <CardWithLabel label="+3 → 5 становится 8"><Card suit="♣" rank="5" seal="plus3" /></CardWithLabel>
              </Section>
              <Section title="Минусовые печати" subtitle="Защитная стратегия — можно безопасно набирать больше">
                <CardWithLabel label="−1 → K становится 9"><Card suit="♠" rank="K" seal="minus1" /></CardWithLabel>
                <CardWithLabel label="−2 → Q становится 8"><Card suit="♥" rank="Q" seal="minus2" /></CardWithLabel>
                <CardWithLabel label="−3 → J становится 7"><Card suit="♦" rank="J" seal="minus3" /></CardWithLabel>
              </Section>
              <Section title="Множители" subtitle="Взрывной потенциал">
                <CardWithLabel label="×1.5 → 10 становится 15"><Card suit="♣" rank="10" seal="mult15" /></CardWithLabel>
                <CardWithLabel label="×2 → 8 становится 16"><Card suit="♠" rank="8" seal="mult2" /></CardWithLabel>
              </Section>
              <Section title="Спецпечати" subtitle="Редкие эффекты меняющие правила">
                <CardWithLabel label="Wild — любое 1–11"><Card suit="♥" rank="3" seal="wild" /></CardWithLabel>
                <CardWithLabel label="Золотая — +5💰"><Card suit="♦" rank="6" seal="gold" /></CardWithLabel>
              </Section>
            </>
          )}

          {tab === "modifiers" && (
            <>
              <Section title="Твои карты (бафф)" subtitle="Играешь — получаешь больше очков">
                {PLAYER_MODIFIERS.map(m => (
                  <CardWithLabel key={m.value} label={m.desc}>
                    <ModifierCard value={m.value} type="buff" />
                  </CardWithLabel>
                ))}
              </Section>
              <Section title="Карты против дилера (дебафф)" subtitle="Играешь — у дилера меньше очков">
                {DEALER_MODIFIERS.map(m => (
                  <CardWithLabel key={m.value} label={m.desc}>
                    <ModifierCard value={m.value} type="debuff" />
                  </CardWithLabel>
                ))}
              </Section>
            </>
          )}

          {tab === "symbols" && (
            <>
              {TIER_ORDER.map(tier => {
                const filtered = SYMBOL_CARDS.filter(s => s.tier === tier);
                if (!filtered.length) return null;
                return (
                  <Section key={tier} title={tier}>
                    {filtered.map(s => (
                      <CardWithLabel key={s.id} label={s.desc}><SymbolCard card={s} /></CardWithLabel>
                    ))}
                  </Section>
                );
              })}
            </>
          )}

          {tab === "spells" && (
            <>
              {TIER_ORDER.map(tier => {
                const filtered = SPELLS.filter(s => s.tier === tier);
                if (!filtered.length) return null;
                return (
                  <Section key={tier} title={tier}>
                    {filtered.map(s => <SpellCard key={s.id} spell={s} />)}
                  </Section>
                );
              })}
            </>
          )}

          {tab === "hand" && (
            <>
              <Section title="Обычная рука">
                <div style={{ width: "100%", marginBottom: 30 }}>
                  <FannedHand cards={[
                    { suit: "♠", rank: "A" },
                    { suit: "♥", rank: "8" },
                    { suit: "♦", rank: "K" },
                    { suit: "♣", rank: "5" },
                    { suit: "♠", rank: "Q" },
                  ]} />
                </div>
              </Section>
              <Section title="Рука с печатями">
                <div style={{ width: "100%", marginBottom: 30 }}>
                  <FannedHand cards={[
                    { suit: "♠", rank: "A", seal: "plus2" },
                    { suit: "♥", rank: "K", seal: "minus3" },
                    { suit: "♦", rank: "7", seal: "mult2" },
                    { suit: "♣", rank: "5", seal: "wild" },
                    { suit: "♠", rank: "Q", seal: "gold" },
                  ]} />
                </div>
              </Section>
              <Section title="Рука с модификаторами">
                <div style={{ width: "100%", marginBottom: 30 }}>
                  <FannedHand cards={[
                    { suit: "♠", rank: "7" },
                    { mod: "+2", type: "buff" },
                    { suit: "♥", rank: "9" },
                    { mod: "−3", type: "debuff" },
                    { suit: "♦", rank: "K" },
                  ]} />
                </div>
              </Section>
            </>
          )}
        </div>

        <div style={{
          marginTop: 50, textAlign: "center", fontSize: 10, color: "#444",
          fontFamily: "'Orbitron', sans-serif", letterSpacing: 2,
        }}>♠ BLACKJACK ROYALE ♠ CARD SYSTEM v0.4 ♠</div>
      </div>
    </div>
  );
}

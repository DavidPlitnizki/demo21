"use client";

interface Row { icon: string; label: string; value: string }
interface Section { title: string; color: string; rows: Row[] }

const SECTIONS: Section[] = [
  {
    title: "Standard Cards",
    color: "#a8b2d1",
    rows: [
      { icon: "🃏", label: "2 – 10",  value: "Face value (2 = 2, 9 = 9, etc.)" },
      { icon: "👑", label: "J, Q, K", value: "10 points each" },
      { icon: "🅰️",  label: "Ace (A)", value: "11 pts, or 1 if it would cause bust" },
    ],
  },
  {
    title: "Soft vs Hard Hand",
    color: "#fbbf24",
    rows: [
      { icon: "〰️", label: "Soft hand",  value: "Ace counted as 11 — shown as 7/17" },
      { icon: "🔒", label: "Hard hand",  value: "No flexible Ace — single score shown" },
    ],
  },
  {
    title: "Special Cards",
    color: "#f87171",
    rows: [
      { icon: "☠", label: "Skull",  value: "Instant loss — you lose the round immediately" },
      { icon: "♛", label: "Crown",  value: "Instant win — you win the round immediately" },
    ],
  },
  {
    title: "Bonus Card",
    color: "#fbbf24",
    rows: [
      { icon: "❓", label: "Hidden",       value: "One mystery bonus card is dealt each round" },
      { icon: "➕", label: "+1 / +2 / +3", value: "Adds points to your final score" },
      { icon: "➖", label: "−1 / −2 / −3", value: "Subtracts points from your final score" },
      { icon: "⚡", label: "Use wisely",   value: "Tap Bonus to flip and apply — once per round" },
    ],
  },
  {
    title: "Player Rules",
    color: "#86efac",
    rows: [
      { icon: "➕", label: "Hit",       value: "Draw one more card from the deck" },
      { icon: "✋", label: "Stand",     value: "Keep your hand — pass turn to dealer" },
      { icon: "🎰", label: "Blackjack", value: "21 with exactly 2 cards — instant win" },
      { icon: "💥", label: "Bust",      value: "Score over 21 — instant loss" },
      { icon: "⏱",  label: "Timer",     value: "30 s per turn — auto-stand on timeout" },
    ],
  },
  {
    title: "Dealer Rules",
    color: "#93c5fd",
    rows: [
      { icon: "↓", label: "Hits on",      value: "Any score below 17 (including soft 17)" },
      { icon: "🛑", label: "Stands on",    value: "17 or higher" },
      { icon: "🂠", label: "Hidden card",  value: "Dealer's hole card is revealed when your turn ends" },
    ],
  },
  {
    title: "Winning",
    color: "#c084fc",
    rows: [
      { icon: "🏆", label: "Win",         value: "Your score beats dealer's (both ≤ 21)" },
      { icon: "❌", label: "Lose",        value: "Dealer's score is higher, or you bust" },
      { icon: "🤝", label: "Push",        value: "Equal scores — no winner" },
      { icon: "💣", label: "Dealer bust", value: "Dealer exceeds 21 — you win" },
    ],
  },
];

export default function InfoScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-1 bg-gray-950 overflow-y-auto">
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-95 transition text-gray-400 hover:text-white text-sm"
          >
            ←
          </button>
          <h1 className="text-white text-xl font-bold tracking-tight">How to Play</h1>
        </div>

        {SECTIONS.map(section => (
          <div
            key={section.title}
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${section.color}28`, background: `${section.color}08` }}
          >
            {/* section header */}
            <div
              className="px-4 py-2.5 flex items-center gap-2"
              style={{ background: `${section.color}18`, borderBottom: `1px solid ${section.color}22` }}
            >
              <h2
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: section.color }}
              >
                {section.title}
              </h2>
            </div>

            {/* rows */}
            <div className="divide-y" style={{ borderColor: `${section.color}12` }}>
              {section.rows.map(row => (
                <div key={row.label} className="flex items-start gap-3 px-4 py-3">
                  <span className="text-lg w-7 flex-shrink-0 text-center leading-tight mt-0.5">
                    {row.icon}
                  </span>
                  <span
                    className="text-sm font-semibold shrink-0 w-24 leading-tight mt-0.5"
                    style={{ color: section.color }}
                  >
                    {row.label}
                  </span>
                  <span className="text-sm text-gray-400 leading-snug">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-gray-700 text-xs pb-4">
          54-card deck (52 + ☠ + ♛) · reshuffled when low
        </p>
      </div>
    </div>
  );
}

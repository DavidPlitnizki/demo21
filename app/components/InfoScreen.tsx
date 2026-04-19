"use client";

interface InfoScreenProps {
  onBack: () => void;
}

const CARD_TYPES = [
  {
    title: "Standard Cards",
    color: "#a8b2d1",
    rows: [
      { label: "2 – 10",  value: "Face value (2 = 2, 9 = 9, etc.)" },
      { label: "J, Q, K", value: "10 points each" },
      { label: "Ace (A)", value: "11 points, or 1 if it would cause bust" },
    ],
  },
  {
    title: "Soft vs Hard Hand",
    color: "#fbbf24",
    rows: [
      { label: "Soft hand",  value: "Contains an Ace counted as 11 (e.g. A+6 = 7/17)" },
      { label: "Hard hand",  value: "No Ace, or Ace counted as 1 to avoid bust" },
      { label: "Soft score", value: "Shown as low/high (e.g. 7/17 means 7 or 17)" },
    ],
  },
  {
    title: "Player Rules",
    color: "#86efac",
    rows: [
      { label: "Hit (More)",    value: "Draw one more card from the deck" },
      { label: "Stand (Stop)",  value: "Keep your current hand, pass to dealer" },
      { label: "Blackjack",     value: "21 with exactly 2 cards — automatic win" },
      { label: "Bust",          value: "Score over 21 — automatic loss" },
      { label: "Timer",         value: "15 seconds per turn, auto-stand on timeout" },
    ],
  },
  {
    title: "Dealer Rules",
    color: "#f87171",
    rows: [
      { label: "Hits on",    value: "Any score below 17 (including soft 17)" },
      { label: "Stands on",  value: "17 or higher" },
      { label: "Hidden card", value: "Dealer's second card is face-down until your turn ends" },
    ],
  },
  {
    title: "Winning",
    color: "#c084fc",
    rows: [
      { label: "Win",         value: "Your score is higher than dealer's (both ≤ 21)" },
      { label: "Lose",        value: "Dealer's score is higher, or you bust" },
      { label: "Push",        value: "Equal scores — no winner" },
      { label: "Dealer bust", value: "Dealer exceeds 21 — you win regardless of your score" },
    ],
  },
];

export default function InfoScreen({ onBack }: InfoScreenProps) {
  return (
    <div className="flex flex-1 bg-gray-950 overflow-y-auto">
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <h1 className="text-white text-xl font-bold">Card Guide</h1>
        </div>

        {/* Sections */}
        {CARD_TYPES.map(section => (
          <div
            key={section.title}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: `${section.color}33` }}
          >
            {/* section header */}
            <div
              className="px-4 py-3"
              style={{ background: `${section.color}14` }}
            >
              <h2
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: section.color }}
              >
                {section.title}
              </h2>
            </div>

            {/* rows */}
            <div className="divide-y divide-gray-800">
              {section.rows.map(row => (
                <div
                  key={row.label}
                  className="flex gap-3 px-4 py-3"
                >
                  <span
                    className="text-sm font-semibold shrink-0 w-28"
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

        {/* Deck note */}
        <p className="text-center text-gray-600 text-xs pb-4">
          Standard 52-card deck · reshuffled when low
        </p>
      </div>
    </div>
  );
}

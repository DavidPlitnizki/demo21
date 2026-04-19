export const SUITS = ["♠", "♥", "♦", "♣"] as const;
export type Suit = typeof SUITS[number];

export const SUIT_COLORS: Record<Suit, string> = {
  "♠": "#a8b2d1",
  "♥": "#ff6b8a",
  "♦": "#ffa64d",
  "♣": "#6bffb8",
};

export const SEALS = {
  plus1:  { label: "+1",   color: "#4ade80", emoji: "🟢", desc: "+1 к значению",       tier: "common" },
  plus2:  { label: "+2",   color: "#60a5fa", emoji: "🔵", desc: "+2 к значению",       tier: "uncommon" },
  plus3:  { label: "+3",   color: "#c084fc", emoji: "🟣", desc: "+3 к значению",       tier: "rare" },
  minus1: { label: "−1",   color: "#fb923c", emoji: "🔶", desc: "−1 (меньше риск)",   tier: "common" },
  minus2: { label: "−2",   color: "#f87171", emoji: "🔴", desc: "−2 (меньше риск)",   tier: "uncommon" },
  minus3: { label: "−3",   color: "#ef4444", emoji: "💔", desc: "−3 (меньше риск)",   tier: "rare" },
  mult15: { label: "×1.5", color: "#fbbf24", emoji: "⭐", desc: "×1.5 к значению",     tier: "rare" },
  mult2:  { label: "×2",   color: "#f97316", emoji: "🌟", desc: "×2 к значению",       tier: "epic" },
  wild:   { label: "W",    color: "#e879f9", emoji: "🃏", desc: "Любое значение 1–11", tier: "legendary" },
  gold:   { label: "$",    color: "#ffd700", emoji: "💰", desc: "+5💰 при розыгрыше",  tier: "rare" },
} as const;

export type SealKey = keyof typeof SEALS;

export const SYMBOL_CARDS = [
  { id: "sun",       symbol: "☀", name: "Солнце",        value: "10", color: "#fbbf24", desc: "+10 и ×1.2 к выигрышу",        tier: "rare" },
  { id: "moon",      symbol: "☾", name: "Луна",          value: "?",  color: "#94a3b8", desc: "Случайное значение 1–11",      tier: "uncommon" },
  { id: "star",      symbol: "✦", name: "Звезда",        value: "7",  color: "#c084fc", desc: "7 очков + тянет след. карту",  tier: "uncommon" },
  { id: "eye",       symbol: "◉", name: "Око",           value: "5",  color: "#a855f7", desc: "5 очков + показывает дилера",  tier: "rare" },
  { id: "skull",     symbol: "☠", name: "Череп",         value: "11", color: "#ef4444", desc: "11 очков но −10💰",            tier: "uncommon" },
  { id: "infinity",  symbol: "∞", name: "Бесконечность", value: "X",  color: "#e879f9", desc: "Сумма твоих очков × 0.5",      tier: "legendary" },
  { id: "flame",     symbol: "✹", name: "Пламя",         value: "8",  color: "#ff6b35", desc: "8 очков + сжигает карту",      tier: "epic" },
  { id: "crown",     symbol: "♛", name: "Корона",        value: "13", color: "#ffd700", desc: "13 очков — сильнейшая карта",  tier: "legendary" },
  { id: "void",      symbol: "◯", name: "Пустота",       value: "0",  color: "#6b7280", desc: "0 очков, не к перебору",        tier: "rare" },
  { id: "heart",     symbol: "❤", name: "Сердце",        value: "6",  color: "#f87171", desc: "6 очков + лечит жизнь",        tier: "uncommon" },
] as const;

export type SymbolCardData = typeof SYMBOL_CARDS[number];

export const PLAYER_MODIFIERS = [
  { value: "+1",   desc: "Добавляет 1 к твоим очкам" },
  { value: "+2",   desc: "Добавляет 2 к твоим очкам" },
  { value: "+3",   desc: "Добавляет 3 к твоим очкам" },
  { value: "+5",   desc: "Добавляет 5 к твоим очкам" },
  { value: "×2",   desc: "Удваивает следующую карту" },
  { value: "×1.5", desc: "×1.5 к следующей карте" },
];

export const DEALER_MODIFIERS = [
  { value: "−1",   desc: "Снимает 1 очко у дилера" },
  { value: "−2",   desc: "Снимает 2 очка у дилера" },
  { value: "−3",   desc: "Снимает 3 очка у дилера" },
  { value: "−5",   desc: "Снимает 5 очков у дилера" },
  { value: "×0.5", desc: "Режет карту дилера пополам" },
  { value: "÷2",   desc: "Делит очки дилера на 2" },
];

export const SPELLS = [
  { id: "phoenix",   name: "Феникс",      emoji: "🔥", desc: "Мгновенно = таргету",        color: "#ff4500", tier: "legendary" },
  { id: "mirror",    name: "Зеркало",     emoji: "🪞", desc: "Копирует последнюю карту",  color: "#7b68ee", tier: "rare" },
  { id: "freeze",    name: "Заморозка",   emoji: "❄️", desc: "Дилер не добирает",         color: "#00bfff", tier: "rare" },
  { id: "double",    name: "Удвоитель",   emoji: "⚡", desc: "×2 к выигрышу раунда",      color: "#ffd700", tier: "epic" },
  { id: "shield",    name: "Щит",         emoji: "🛡️", desc: "Защита от перебора",        color: "#32cd32", tier: "uncommon" },
  { id: "voidSpell", name: "Пустота",     emoji: "🌀", desc: "Обнуляет руку дилера",      color: "#8a2be2", tier: "legendary" },
  { id: "bomb",      name: "Бомба",       emoji: "💣", desc: "Уничтожает старшую дилера", color: "#dc2626", tier: "epic" },
  { id: "rewind",    name: "Перемотка",   emoji: "⏪", desc: "Отменяет последний ход",    color: "#06b6d4", tier: "rare" },
  { id: "peek",      name: "Подглядка",   emoji: "👁️", desc: "Видишь закрытую дилера",   color: "#a855f7", tier: "uncommon" },
  { id: "potion",    name: "Зелье удачи", emoji: "🧪", desc: "Следующая карта 7–10",      color: "#10b981", tier: "common" },
] as const;

export type SpellData = typeof SPELLS[number];
export type Tier = "common" | "uncommon" | "rare" | "epic" | "legendary";

export const TIER_GLOW: Record<Tier, string> = {
  common:    "#6b7280",
  uncommon:  "#32cd32",
  rare:      "#7b68ee",
  epic:      "#ffd700",
  legendary: "#ff4500",
};

export type CardSize = "sm" | "md" | "lg";

export const CARD_DIMS: Record<CardSize, { w: number; h: number; rankFs: number; suitFs: number; sealFs: number }> = {
  sm: { w: 60,  h: 86,  rankFs: 9,  suitFs: 22, sealFs: 6 },
  md: { w: 76,  h: 110, rankFs: 11, suitFs: 28, sealFs: 8 },
  lg: { w: 96,  h: 138, rankFs: 14, suitFs: 36, sealFs: 10 },
};

export const SYMBOL_DIMS: Record<CardSize, { w: number; h: number; valFs: number; symFs: number; nameFs: number }> = {
  sm: { w: 60,  h: 86,  valFs: 9,  symFs: 30, nameFs: 7 },
  md: { w: 76,  h: 110, valFs: 11, symFs: 38, nameFs: 9 },
  lg: { w: 96,  h: 138, valFs: 14, symFs: 48, nameFs: 11 },
};

export const MODIFIER_DIMS: Record<CardSize, { w: number; h: number; valFs: number; cornerFs: number }> = {
  sm: { w: 60,  h: 86,  valFs: 22, cornerFs: 9 },
  md: { w: 76,  h: 110, valFs: 32, cornerFs: 11 },
  lg: { w: 96,  h: 138, valFs: 42, cornerFs: 14 },
};

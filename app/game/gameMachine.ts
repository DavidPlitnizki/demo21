import { setup, assign } from 'xstate';
import { SUITS } from '../components/cards/constants';
import type { Suit } from '../components/cards/constants';

export type PlayingCard = { suit: Suit; rank: string; special?: 'skull' | 'crown' };
export type GameResult = 'player' | 'dealer' | 'push' | null;

export type BonusCard = {
  value: number;    // one of: -3, -2, -1, 1, 2, 3
  used: boolean;
  revealed: boolean;
};

type GameContext = {
  playerName: string;
  deck: PlayingCard[];
  dealQueue: PlayingCard[];  // 4 pre-drawn cards: p1, d1, p2, d2
  dealtCount: number;        // 0–4, drives the initial deal animation
  playerHand: PlayingCard[];
  dealerHand: PlayingCard[];
  dealerRevealed: boolean;
  bonusCard: BonusCard;
  result: GameResult;
};

type GameEvent =
  | { type: 'HIT' }
  | { type: 'STAND' }
  | { type: 'USE_BONUS' }
  | { type: 'NEW_ROUND' };

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
const BONUS_VALUES = [-3, -2, -1, 1, 2, 3] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): PlayingCard[] {
  const cards: PlayingCard[] = [];
  for (const suit of SUITS)
    for (const rank of RANKS)
      cards.push({ suit, rank });
  cards.push({ suit: '♠', rank: 'SKULL', special: 'skull' });
  cards.push({ suit: '♠', rank: 'CROWN', special: 'crown' });
  return shuffle(cards);
}

/** Blackjack score: aces count as 11, reduced to 1 to avoid bust. Special cards score 0. */
export function handScore(hand: PlayingCard[]): number {
  let score = 0;
  let aces = 0;
  for (const c of hand) {
    if (c.special) continue;
    if (['J', 'Q', 'K'].includes(c.rank)) { score += 10; }
    else if (c.rank === 'A') { score += 11; aces++; }
    else { score += parseInt(c.rank); }
  }
  while (score > 21 && aces > 0) { score -= 10; aces--; }
  return score;
}

/**
 * Display score the blackjack way:
 *  - soft hand (ace counts as 11): "7/17"
 *  - hard hand or busted: "18"
 */
export function scoreDisplay(hand: PlayingCard[]): string {
  if (hand.length === 0) return '—';
  const soft = handScore(hand);
  const hard = hand.reduce((s, c) => {
    if (c.special) return s;
    if (['J', 'Q', 'K'].includes(c.rank)) return s + 10;
    if (c.rank === 'A') return s + 1;
    return s + parseInt(c.rank);
  }, 0);
  if (hard !== soft && soft <= 21) return `${hard}/${soft}`;
  return String(soft);
}

function effectivePlayerScore(context: GameContext): number {
  return handScore(context.playerHand) + (context.bonusCard.used ? context.bonusCard.value : 0);
}

function determineResult(
  playerScore: number,
  dealerScore: number,
): 'player' | 'dealer' | 'push' {
  if (playerScore > 21) return 'dealer';
  if (dealerScore > 21) return 'player';
  if (playerScore > dealerScore) return 'player';
  if (dealerScore > playerScore) return 'dealer';
  return 'push';
}

function randomBonus(): BonusCard {
  return {
    value: BONUS_VALUES[Math.floor(Math.random() * BONUS_VALUES.length)],
    used: false,
    revealed: false,
  };
}

function prepareRound(playerName: string): GameContext {
  const deck = buildDeck();
  const dealQueue: PlayingCard[] = [deck.pop()!, deck.pop()!, deck.pop()!, deck.pop()!];
  return {
    playerName,
    deck,
    dealQueue,
    dealtCount: 0,
    playerHand: [],
    dealerHand: [],
    dealerRevealed: false,
    bonusCard: randomBonus(),
    result: null,
  };
}

export const gameMachine = setup({
  types: {
    context: {} as GameContext,
    events: {} as GameEvent,
    input: {} as { playerName: string },
  },
  guards: {
    dealingDone:     ({ context }) => context.dealtCount >= 4,
    playerHasSkull:  ({ context }) => context.playerHand.some(c => c.special === 'skull'),
    playerHasCrown:  ({ context }) => context.playerHand.some(c => c.special === 'crown'),
    playerBust:      ({ context }) => effectivePlayerScore(context) > 21,
    playerBlackjack: ({ context }) => effectivePlayerScore(context) === 21,
    dealerDone:      ({ context }) => handScore(context.dealerHand) >= 17,
  },
  actions: {
    // Initial deal: one card per entry from the pre-drawn queue (P D P D)
    dealOneCard: assign(({ context }) => {
      const i = context.dealtCount;
      const card = context.dealQueue[i];
      const toPlayer = i % 2 === 0;
      return {
        dealtCount: i + 1,
        playerHand: toPlayer ? [...context.playerHand, card] : context.playerHand,
        dealerHand: !toPlayer ? [...context.dealerHand, card] : context.dealerHand,
      };
    }),

    // Draw one card from deck into player's hand
    playerDrawOne: assign(({ context }) => {
      const deck = context.deck.length < 10 ? buildDeck() : [...context.deck];
      const card = deck.pop()!;
      return { deck, playerHand: [...context.playerHand, card] };
    }),

    // Flip and apply the bonus card
    useBonus: assign(({ context }) => ({
      bonusCard: { ...context.bonusCard, used: true, revealed: true },
    })),

    // Reveal dealer's hole card
    dealerReveal: assign({ dealerRevealed: true }),

    // Draw one card from deck into dealer's hand
    dealerDrawOne: assign(({ context }) => {
      const deck = context.deck.length < 10 ? buildDeck() : [...context.deck];
      const card = deck.pop()!;
      return { deck, dealerHand: [...context.dealerHand, card] };
    }),

    computeResult: assign(({ context }) => {
      const hasSkull = context.playerHand.some(c => c.special === 'skull');
      const hasCrown = context.playerHand.some(c => c.special === 'crown');
      const result: 'player' | 'dealer' | 'push' =
        hasSkull ? 'dealer' :
        hasCrown ? 'player' :
        determineResult(effectivePlayerScore(context), handScore(context.dealerHand));
      return { dealerRevealed: true, result };
    }),

    reset: assign(({ context }) => prepareRound(context.playerName)),
  },
}).createMachine({
  id: 'blackjack',
  initial: 'loadingBoard',
  context: ({ input }) => prepareRound(input.playerName),

  states: {
    loadingBoard: {
      after: { 700: 'dealing' },
    },

    // reenter: true required — XState v5 defaults self-transitions to internal
    // (reenter: false), which skips entry actions and doesn't restart after timers
    dealing: {
      entry: 'dealOneCard',
      after: {
        500: [
          { guard: 'dealingDone', target: 'playerTurn' },
          { target: 'dealing', reenter: true },
        ],
      },
    },

    playerTurn: {
      always: [
        { guard: 'playerHasSkull',  target: 'result' },
        { guard: 'playerHasCrown',  target: 'result' },
        { guard: 'playerBust',      target: 'result' },
        { guard: 'playerBlackjack', target: 'dealerDealing' },
      ],
      after: { 30000: 'dealerDealing' },
      on: {
        HIT:       { target: 'playerDealing' },
        STAND:     { target: 'dealerDealing' },
        // Re-enter to re-evaluate always guards with the new effective score
        USE_BONUS: { actions: 'useBonus', target: 'playerTurn', reenter: true },
      },
    },

    playerDealing: {
      entry: 'playerDrawOne',
      after: { 500: 'playerTurn' },
    },

    dealerDealing: {
      entry: 'dealerReveal',
      after: {
        500: [
          { guard: 'dealerDone', target: 'result' },
          { actions: 'dealerDrawOne', target: 'dealerDealing', reenter: true },
        ],
      },
    },

    result: {
      entry: 'computeResult',
      on: {
        NEW_ROUND: { target: 'loadingBoard', actions: 'reset' },
      },
    },
  },
});

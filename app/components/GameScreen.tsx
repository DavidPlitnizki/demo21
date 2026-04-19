"use client";

import { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { gameMachine, handScore, scoreDisplay } from '../game/gameMachine';
import { Card } from './cards';
import type { PlayingCard, BonusCard } from '../game/gameMachine';

const TIMER_SECONDS = 30;

/* ─── Icons ─────────────────────────────────────────────────── */

function PlayerIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="13" r="6" fill="rgba(134,239,172,0.55)" />
      <path d="M6 30c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="rgba(134,239,172,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function DealerIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {/* person head */}
      <circle cx="13" cy="11" r="5" fill="rgba(147,197,253,0.55)" />
      {/* person body */}
      <path d="M4 26c0-5.523 4.03-8 9-8s9 2.477 9 8" stroke="rgba(147,197,253,0.55)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* monitor screen */}
      <rect x="22" y="16" width="12" height="9" rx="1.5" fill="none" stroke="rgba(147,197,253,0.55)" strokeWidth="1.8" />
      {/* monitor stand */}
      <line x1="28" y1="25" x2="28" y2="29" stroke="rgba(147,197,253,0.55)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="25" y1="29" x2="31" y2="29" stroke="rgba(147,197,253,0.55)" strokeWidth="1.8" strokeLinecap="round" />
      {/* screen dot */}
      <circle cx="28" cy="20.5" r="1.5" fill="rgba(147,197,253,0.55)" />
    </svg>
  );
}

/* ─── Small helpers ─────────────────────────────────────────── */

function CardBack() {
  return (
    <div style={{
      width: 64, height: 92, borderRadius: 9, flexShrink: 0,
      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f1f3d 100%)',
      border: '2px solid #2a4a7f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 30, color: '#2a4a7f',
      animation: 'cardDeal 0.3s cubic-bezier(.34,1.56,.64,1)',
    }}>🂠</div>
  );
}

function SpecialCard({ type }: { type: 'skull' | 'crown' }) {
  const isSkull = type === 'skull';
  return (
    <div style={{
      animation: 'cardDeal 0.3s cubic-bezier(.34,1.56,.64,1)',
      width: 60, height: 86, borderRadius: 9, flexShrink: 0,
      background: isSkull
        ? 'linear-gradient(135deg, #1a0000 0%, #3d0000 100%)'
        : 'linear-gradient(135deg, #3d2e00 0%, #7a5c00 100%)',
      border: `2px solid ${isSkull ? '#ef4444' : '#ffd700'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 30,
      boxShadow: `0 0 14px ${isSkull ? '#ef444455' : '#ffd70055'}`,
    }}>
      {isSkull ? '☠' : '♛'}
    </div>
  );
}

function AnimatedCard({ card }: { card: PlayingCard }) {
  if (card.special) return <SpecialCard type={card.special} />;
  return (
    <div style={{ animation: 'cardDeal 0.3s cubic-bezier(.34,1.56,.64,1)' }}>
      <Card suit={card.suit} rank={card.rank} size="sm" hoverable={false} />
    </div>
  );
}

function DeckPile({ count }: { count: number }) {
  const layers = Math.min(Math.ceil(count / 8), 7);
  return (
    <div style={{ position: 'relative', width: 60, height: 86 + layers * 3 }}>
      {Array.from({ length: layers }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: (layers - 1 - i) * 3,
          width: 60, height: 86, borderRadius: 8,
          background: 'linear-gradient(135deg, #1e3a5f, #0f1f3d)',
          border: '2px solid #2a4a7f',
        }} />
      ))}
    </div>
  );
}

/* ─── Bonus card with flip animation ────────────────────────── */

function BonusCardDisplay({ bonus }: { bonus: BonusCard }) {
  const isPos = bonus.value > 0;
  return (
    <div style={{
      perspective: 200,
      width: 48,
      height: 68,
      flexShrink: 0,
      transform: 'rotate(-14deg)',
      transformOrigin: 'bottom center',
      marginRight: 6,
      alignSelf: 'center',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s cubic-bezier(.4,0,.2,1)',
        transform: bonus.revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Back face */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          borderRadius: 7,
          background: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
          border: '2px solid #d97706',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fbbf24', fontSize: 20, fontWeight: 'bold',
        }}>?</div>
        {/* Front face */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 7,
          background: isPos ? '#14532d' : '#7f1d1d',
          border: `2px solid ${isPos ? '#4ade80' : '#f87171'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isPos ? '#86efac' : '#fca5a5',
          fontSize: 15, fontWeight: 'bold',
        }}>
          {bonus.value > 0 ? `+${bonus.value}` : bonus.value}
        </div>
      </div>
    </div>
  );
}

/* ─── Result popup ──────────────────────────────────────────── */

function ResultPopup({
  result, playerName, playerHand, dealerHand, bonusCard, onNewRound, onExit,
}: {
  result: 'player' | 'dealer' | 'push';
  playerName: string;
  playerHand: PlayingCard[];
  dealerHand: PlayingCard[];
  bonusCard: BonusCard;
  onNewRound: () => void;
  onExit: () => void;
}) {
  const rawPs = handScore(playerHand);
  const bonus = bonusCard.used ? bonusCard.value : 0;
  const ps = rawPs + bonus;
  const ds = handScore(dealerHand);
  const hasSkull = playerHand.some(c => c.special === 'skull');
  const hasCrown = playerHand.some(c => c.special === 'crown');
  const isBlackjack = ps === 21 && playerHand.length === 2 && result === 'player' && !hasCrown;

  const title  = hasSkull  ? '☠ Skull!'
               : hasCrown  ? '♛ Crown!'
               : isBlackjack ? 'Blackjack! 🃏'
               : result === 'player' ? 'You Win! 🎉'
               : result === 'dealer' ? 'Dealer Wins'
               : 'Push 🤝';
  const color  = result === 'player' ? '#86efac'
               : result === 'dealer' ? '#f87171'
               : '#fde68a';

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-20"
      style={{ background: 'rgba(0,0,0,0.65)', animation: 'fadeIn .2s ease-out' }}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col items-center gap-6 w-full mx-4"
        style={{ maxWidth: 300, animation: 'popIn .25s ease-out' }}
      >
        <h2 className="text-4xl font-bold" style={{ color }}>{title}</h2>

        <div className="flex w-full justify-around text-center">
          <div>
            <div className="text-gray-400 text-[11px] uppercase tracking-wider mb-1">{playerName}</div>
            <div className="text-white text-3xl font-bold">{ps > 21 ? 'bust' : ps}</div>
            {bonusCard.used && (
              <div style={{ color: bonusCard.value > 0 ? '#86efac' : '#fca5a5' }}
                   className="text-[10px] mt-0.5">
                bonus {bonusCard.value > 0 ? `+${bonusCard.value}` : bonusCard.value}
              </div>
            )}
          </div>
          <div className="text-gray-600 text-xl self-center">vs</div>
          <div>
            <div className="text-gray-400 text-[11px] uppercase tracking-wider mb-1">Dealer</div>
            <div className="text-white text-3xl font-bold">{ds > 21 ? 'bust' : ds}</div>
          </div>
        </div>

        <button
          onClick={onNewRound}
          className="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 active:scale-95 text-black font-bold text-base transition"
        >
          New Round
        </button>
        <button
          onClick={onExit}
          className="w-full py-2 rounded-xl bg-gray-800 hover:bg-gray-700 active:scale-95 text-gray-400 font-semibold text-sm transition"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

/* ─── Main screen ───────────────────────────────────────────── */

export default function GameScreen({ playerName, onExit }: { playerName: string; onExit: () => void }) {
  const [state, send] = useMachine(gameMachine, { input: { playerName } });
  const { playerHand, dealerHand, dealerRevealed, bonusCard, result, deck } = state.context;

  const isLoadingBoard  = state.matches('loadingBoard');
  const isDealing       = state.matches('dealing');
  const isPlayerTurn    = state.matches('playerTurn');
  const isPlayerDealing = state.matches('playerDealing');
  const isDealerDealing = state.matches('dealerDealing');
  const isResult        = state.matches('result');

  const rawPlayerScore = handScore(playerHand);
  const bonus = bonusCard.used ? bonusCard.value : 0;
  const playerScore = rawPlayerScore + bonus;

  /* ── countdown timer — resets every time state changes ───── */
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  useEffect(() => {
    if (!isPlayerTurn) { setTimeLeft(TIMER_SECONDS); return; }
    setTimeLeft(TIMER_SECONDS);
    const id = setInterval(
      () => setTimeLeft(t => Math.max(0, +(t - 0.1).toFixed(1))),
      100,
    );
    return () => clearInterval(id);
  // state reference changes on every XState transition, including re-entry after HIT/BONUS
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const timerPct   = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft > 8 ? '#22c55e' : timeLeft > 4 ? '#eab308' : '#ef4444';

  /* ── dealer score label ───────────────────────────────────── */
  const dealerLabel = dealerHand.length === 0 ? '—'
    : dealerRevealed ? scoreDisplay(dealerHand)
    : `${scoreDisplay([dealerHand[0]])} + ?`;

  /* ── player score label (with bonus) ─────────────────────── */
  const playerLabel = playerHand.length === 0 ? '—'
    : bonusCard.used
      ? String(playerScore)
      : scoreDisplay(playerHand);

  const showBonus = !isLoadingBoard;

  return (
    <div className="flex flex-1 min-h-0 bg-green-900 relative overflow-hidden">
      <style>{`
        @keyframes cardDeal {
          from { opacity:0; transform:translateY(-18px) scale(.88) rotate(-4deg); }
          to   { opacity:1; transform:translateY(0)     scale(1)   rotate(0deg);  }
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes popIn  {
          from { opacity:0; transform:scale(.9) translateY(12px); }
          to   { opacity:1; transform:scale(1)  translateY(0);    }
        }
      `}</style>

      {/* ── board ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col">

        {/* Dealer half */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-4">
          <DealerIcon />
          <span className="text-green-300/40 text-[10px] font-mono uppercase tracking-[.2em]">Dealer</span>

          <div className="flex items-baseline gap-2">
            <span className="text-white text-4xl font-bold tabular-nums">{dealerLabel}</span>
            {dealerRevealed && handScore(dealerHand) > 21 &&
              <span className="text-red-400 text-sm font-semibold">bust</span>}
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {dealerHand.map((card, i) =>
              !dealerRevealed && i > 0
                ? <CardBack key={i} />
                : <AnimatedCard key={i} card={card} />
            )}
          </div>

          {isDealerDealing && (
            <span className="text-green-300/40 text-sm font-mono animate-pulse">Dealer drawing…</span>
          )}
        </div>

        {/* divider */}
        <div className="mx-8 h-px bg-green-700/30" />

        {/* Player half */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-4">
          <PlayerIcon />
          <span className="text-green-300/40 text-[10px] font-mono uppercase tracking-[.2em]">{playerName}</span>

          {/* cards row — bonus card sits to the left */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {showBonus && (
              <BonusCardDisplay bonus={bonusCard} />
            )}
            {playerHand.map((card, i) => <AnimatedCard key={i} card={card} />)}
          </div>

          {/* score */}
          <div className="flex items-baseline gap-2">
            <span className="text-white text-4xl font-bold tabular-nums">{playerLabel}</span>
            {bonusCard.used && (
              <span style={{ color: bonusCard.value > 0 ? '#86efac' : '#fca5a5' }}
                    className="text-sm font-semibold">
                {bonusCard.value > 0 ? `+${bonusCard.value}` : bonusCard.value}
              </span>
            )}
            {playerScore > 21 &&
              <span className="text-red-400 text-sm font-semibold">bust</span>}
            {playerScore === 21 && playerHand.length === 2 && !bonusCard.used &&
              <span className="text-yellow-300 text-sm font-semibold">blackjack!</span>}
          </div>

          {/* action buttons + timer — only during player's turn */}
          {isPlayerTurn && (
            <div className="flex flex-col items-center gap-3 w-full" style={{ maxWidth: 320 }}>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => send({ type: 'HIT' })}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-base active:scale-95 transition-transform flex items-center justify-center gap-1"
                  style={{ background: '#16a34a', boxShadow: '0 0 16px #16a34a55' }}
                >
                  <span style={{ fontSize: '1.2em', lineHeight: 1 }}>+</span> Hit
                </button>

                <button
                  onClick={() => send({ type: 'USE_BONUS' })}
                  disabled={bonusCard.used}
                  className="flex-1 py-3 rounded-xl font-bold text-black text-base active:scale-95 transition-transform flex items-center justify-center gap-1 disabled:opacity-40 disabled:scale-100"
                  style={{ background: bonusCard.used ? '#713f12' : '#eab308', boxShadow: bonusCard.used ? 'none' : '0 0 16px #eab30855', color: bonusCard.used ? '#92400e' : '#000' }}
                >
                  <span style={{ fontSize: '1.1em', lineHeight: 1 }}>!</span> Bonus
                </button>

                <button
                  onClick={() => send({ type: 'STAND' })}
                  className="flex-1 py-3 rounded-xl font-bold text-white text-base active:scale-95 transition-transform flex items-center justify-center gap-1"
                  style={{ background: '#dc2626', boxShadow: '0 0 16px #dc262655' }}
                >
                  <span style={{ fontSize: '0.9em', lineHeight: 1 }}>■</span> Stand
                </button>
              </div>

              {/* timer */}
              <div className="w-full flex flex-col gap-1">
                <div className="flex justify-between text-[11px] text-white/40 font-mono">
                  <span>Auto-stand</span>
                  <span>{Math.ceil(timeLeft)}s</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,.35)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{ width: `${timerPct}%`, background: timerColor }}
                  />
                </div>
              </div>
            </div>
          )}

          {(isLoadingBoard || isDealing) && (
            <span className="text-green-300/40 text-sm font-mono animate-pulse">
              {isLoadingBoard ? 'Ready…' : 'Dealing…'}
            </span>
          )}

          {isPlayerDealing && (
            <span className="text-green-300/40 text-sm font-mono animate-pulse">Drawing…</span>
          )}
        </div>
      </div>

      {/* ── deck sidebar ─────────────────────────────────────── */}
      <div className="w-20 sm:w-24 flex flex-col items-center pt-8 gap-2 border-l border-green-800/30"
           style={{ background: 'rgba(0,0,0,.18)' }}>
        <DeckPile count={deck.length} />
        <span className="text-green-400/50 text-xs font-mono mt-1">{deck.length}</span>
        <span className="text-green-400/30 text-[10px]">cards</span>
      </div>

      {/* ── result popup ─────────────────────────────────────── */}
      {isResult && result && (
        <ResultPopup
          result={result}
          playerName={playerName}
          playerHand={playerHand}
          dealerHand={dealerHand}
          bonusCard={bonusCard}
          onNewRound={() => send({ type: 'NEW_ROUND' })}
          onExit={onExit}
        />
      )}
    </div>
  );
}

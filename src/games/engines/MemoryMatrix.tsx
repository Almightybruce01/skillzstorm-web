/* ═══════════════════════════════════════════════════════════
   MEMORY MATRIX / MATCH PAIRS ENGINE
   Used by: Memory Matrix, Pattern Blast, Word Connect Storm
   Grid of face-down cards. Flip two at a time. Match pairs.
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { getQuestions, type Grade } from '../questionBank';
import { sfxFlip, sfxMatch, sfxWrong, sfxLevelUp } from '../SoundEngine';

interface CardData {
  id: number;
  content: string;
  pairId: number; // two cards with same pairId are a match
  isQuestion: boolean; // question or answer side
}

const themes: Record<string, { accent: string; bg: string; cardGradient: string }> = {
  memory_matrix: { accent: '#0099ff', bg: 'linear-gradient(180deg, #0a1a2e 0%, #051020 100%)', cardGradient: 'linear-gradient(135deg, rgba(0,153,255,0.25), rgba(0,153,255,0.08))' },
  pattern_blast: { accent: '#ff8000', bg: 'linear-gradient(180deg, #2e1a0a 0%, #1a0d05 100%)', cardGradient: 'linear-gradient(135deg, rgba(255,128,0,0.25), rgba(255,128,0,0.08))' },
  word_connect_storm: { accent: '#9933ff', bg: 'linear-gradient(180deg, #1a0a2e 0%, #0d0520 100%)', cardGradient: 'linear-gradient(135deg, rgba(153,51,255,0.25), rgba(153,51,255,0.08))' },
  default: { accent: '#0099ff', bg: 'linear-gradient(180deg, #0a1a2e 0%, #051020 100%)', cardGradient: 'linear-gradient(135deg, rgba(0,153,255,0.25), rgba(0,153,255,0.08))' },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Grade-specific emoji/simple pairs for K-2 enrichment */
const K2_EXTRA_PAIRS: [string, string][] = [
  ['cat', '🐱'], ['dog', '🐕'], ['red', '🔴'], ['sun', '☀️'],
  ['star', '⭐'], ['heart', '❤️'], ['apple', '🍎'], ['fish', '🐟'],
];

function buildPairs(grade: Grade, pairCount: number): CardData[] {
  const pool = getQuestions(grade, undefined, pairCount * 2);
  const rawPairs: [string, string][] = pool.slice(0, pairCount).map(q => [q.text, q.answer]);
  // K-2: swap in a few emoji pairs
  if (grade === 'K-2') {
    const swapCount = Math.min(4, Math.floor(pairCount / 2));
    for (let i = 0; i < swapCount; i++) {
      rawPairs[i] = K2_EXTRA_PAIRS[i % K2_EXTRA_PAIRS.length];
    }
  }
  const pairs: CardData[] = [];
  let id = 0;
  for (let i = 0; i < pairCount && i < rawPairs.length; i++) {
    const [q, a] = rawPairs[i];
    pairs.push({ id: id++, content: q, pairId: i, isQuestion: true });
    pairs.push({ id: id++, content: a, pairId: i, isQuestion: false });
  }
  return shuffle(pairs);
}

const PAIRS_PER_LEVEL = 8;
const FLIP_BACK_MS = 1000;

export function MemoryMatrix({ gameId, grade, onClose }: { gameId: string; grade: Grade; onClose: () => void }) {
  const theme = themes[gameId] || themes.default;
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [cards, setCards] = useState<CardData[]>(() => buildPairs(grade, PAIRS_PER_LEVEL));
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [lockFlip, setLockFlip] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);
  const gridCols = 4;

  useEffect(() => {
    timerRef.current = window.setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const nextLevel = useCallback(() => {
    setLevel(l => l + 1);
    const nextPairs = Math.min(PAIRS_PER_LEVEL + (level) * 2, 12);
    setCards(() => buildPairs(grade, nextPairs));
    setFlipped(new Set());
    setMatched(new Set());
    setLockFlip(false);
  }, [grade, level]);

  const handleCardClick = (card: CardData) => {
    if (lockFlip || matched.has(card.id) || flipped.has(card.id)) return;

    sfxFlip();
    const newFlipped = new Set(flipped);
    newFlipped.add(card.id);
    setFlipped(newFlipped);
    setMoves(m => m + 1);

    if (newFlipped.size === 2) {
      setLockFlip(true);
      const [a, b] = Array.from(newFlipped);
      const cardA = cards.find(c => c.id === a)!;
      const cardB = cards.find(c => c.id === b)!;

      if (cardA.pairId === cardB.pairId) {
        setMatched(m => new Set(m).add(a).add(b));
        const baseScore = 100 - moves * 2;
        setScore(s => s + Math.max(20, baseScore) * level);
        sfxMatch();
        if (matched.size + 2 === cards.length) sfxLevelUp();
        setFlipped(new Set());
        setLockFlip(false);
      } else {
        sfxWrong();
        setTimeout(() => {
          setFlipped(new Set());
          setLockFlip(false);
        }, FLIP_BACK_MS);
      }
    }
  };

  const allMatched = matched.size === cards.length && cards.length > 0;

  return (
    <div className="game-card !p-0 overflow-hidden animate-pop-in" style={{ border: `1px solid ${theme.accent}30` }}>
      {/* HUD */}
      <div className="flex items-center justify-between p-3 border-b border-white/5" style={{ background: `${theme.accent}08` }}>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-xs font-black" style={{ color: theme.accent }}>SCORE {score}</span>
          <span className="text-xs font-bold text-white/40">LVL {level}</span>
          <span className="text-xs font-bold text-white/40">MOVES {moves}</span>
          <span className="text-xs font-bold text-white/40">⏱ {timer}s</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕ EXIT</button>
      </div>

      {/* Grid */}
      <div
        className="p-4 relative"
        style={{
          background: theme.bg,
          minHeight: '360px',
        }}
      >
        <div
          className="grid gap-2 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            maxWidth: '420px',
            margin: '0 auto',
          }}
        >
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flipped.has(card.id) || matched.has(card.id)}
              isMatched={matched.has(card.id)}
              accent={theme.accent}
              gradient={theme.cardGradient}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>

        {allMatched && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 animate-pop-in">
            <h3 className="text-2xl font-black text-white mb-1">Level Complete!</h3>
            <p className="text-xl font-black mb-4" style={{ color: theme.accent }}>+{Math.max(20, 100 - moves * 2) * level} pts</p>
            <button onClick={nextLevel} className="btn-elite btn-elite-primary text-sm">Next Level</button>
          </div>
        )}
      </div>

      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">
        Flip two cards to match question ↔ answer. Fewer moves = higher score!
      </div>
    </div>
  );
}

interface CardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  accent: string;
  gradient: string;
  onClick: () => void;
}

function Card({ card, isFlipped, isMatched, accent, gradient, onClick }: CardProps) {
  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: '800px', aspectRatio: '1', minHeight: '72px' }}
      onClick={onClick}
    >
      <div
        className="relative w-full h-full rounded-xl"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Face-down */}
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center font-black text-white/60 text-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(145deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
            border: `2px solid ${accent}50`,
            boxShadow: `inset 0 0 20px ${accent}15, 0 0 15px ${accent}25`,
          }}
        >
          ?
        </div>

        {/* Face-up */}
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center p-2 text-center text-sm font-bold overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: isMatched ? `linear-gradient(145deg, rgba(0,255,128,0.25), rgba(0,255,128,0.1))` : gradient,
            border: `2px solid ${isMatched ? '#00ff8050' : accent + '50'}`,
            boxShadow: isMatched ? `0 0 20px rgba(0,255,128,0.4)` : `inset 0 0 15px ${accent}15`,
            color: 'white',
          }}
        >
          {card.content}
        </div>
      </div>
    </div>
  );
}

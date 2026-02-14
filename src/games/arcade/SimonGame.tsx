/* SIMON — Repeat the pattern; 4 colored quadrants */
import { useRef, useEffect, useState, useCallback } from 'react';
import { sfxCorrect, sfxWrong, sfxGameOver, sfxClick } from '../SoundEngine';

const COLORS = ['red', 'blue', 'green', 'yellow'] as const;
const LIGHT_MAP: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
};
const DIM_MAP: Record<string, string> = {
  red: 'bg-red-900/70',
  blue: 'bg-blue-900/70',
  green: 'bg-green-900/70',
  yellow: 'bg-yellow-900/70',
};

export function SimonGame({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('simon_hs') || '0'));
  const [gameOver, setGameOver] = useState(false);
  const [pattern, setPattern] = useState<typeof COLORS[number][]>([]);
  const [inputIndex, setInputIndex] = useState(-1);
  const [phase, setPhase] = useState<'play' | 'input' | 'idle'>('idle');
  const [lit, setLit] = useState<number>(-1);
  const playIndexRef = useRef(0);
  const timeoutRef = useRef<number | undefined>(undefined);

  const playToneForColor = useCallback((_c: string) => {
    sfxCorrect();
  }, []);

  const playPattern = useCallback(() => {
    if (pattern.length === 0) return;
    setPhase('play');
    playIndexRef.current = 0;
    const playNext = () => {
      if (playIndexRef.current >= pattern.length) {
        setPhase('input');
        setInputIndex(0);
        setLit(-1);
        return;
      }
      const color = pattern[playIndexRef.current];
      setLit(COLORS.indexOf(color));
      playToneForColor(color);
      timeoutRef.current = window.setTimeout(() => {
        setLit(-1);
        playIndexRef.current += 1;
        timeoutRef.current = window.setTimeout(playNext, 200);
      }, 400) as unknown as number;
    };
    playNext();
  }, [pattern, playToneForColor]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startRound = useCallback(() => {
    const next = COLORS[Math.floor(Math.random() * 4)];
    setPattern((p) => [...p, next]);
    setScore((s) => s + 1);
  }, []);

  useEffect(() => {
    if (phase !== 'idle' || gameOver) return;
    startRound();
  }, [gameOver]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (gameOver || pattern.length === 0) return;
    if (phase === 'idle') {
      const t = setTimeout(() => playPattern(), 500);
      return () => clearTimeout(t);
    }
  }, [pattern, gameOver, phase, playPattern]);

  const press = (idx: number) => {
    if (phase !== 'input' || gameOver) return;
    const color = COLORS[idx];
    setLit(idx);
    playToneForColor(color);
    setTimeout(() => setLit(-1), 150);
    const expected = pattern[inputIndex];
    if (expected !== color) {
      sfxWrong();
      sfxGameOver();
      setGameOver(true);
      const s = score;
      const hs = parseInt(localStorage.getItem('simon_hs') || '0');
      if (s > hs) {
        setHighScore(s);
        localStorage.setItem('simon_hs', String(s));
      }
      return;
    }
    if (inputIndex + 1 >= pattern.length) {
      setPhase('idle');
      setInputIndex(-1);
      setTimeout(() => startRound(), 800);
    } else {
      setInputIndex((i) => i + 1);
    }
  };

  const restart = () => {
    if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
    setPattern([]);
    setScore(0);
    setGameOver(false);
    setPhase('idle');
    setInputIndex(-1);
    setLit(-1);
    sfxClick();
  };

  return (
    <div className="game-card !p-0 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-slate-800/50">
        <div className="flex items-center gap-4">
          <span className="text-xs font-black text-white">🎮 SIMON</span>
          <span className="text-xs font-black text-white/60">ROUND {score}</span>
          <span className="text-xs text-white/30">HI {highScore}</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕</button>
      </div>
      <div className="relative p-4 flex items-center justify-center" style={{ height: '400px' }}>
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80">
            <h3 className="text-2xl font-black text-white mb-1">Game Over!</h3>
            <p className="text-2xl font-black text-white/80 mb-4">Round {score}</p>
            <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2 w-56 h-56 rounded-full overflow-hidden border-4 border-slate-700 shadow-xl">
          {COLORS.map((color, idx) => (
            <button
              key={color}
              type="button"
              onClick={() => press(idx)}
              className={`transition-all duration-75 ${lit === idx ? LIGHT_MAP[color] : DIM_MAP[color]} hover:brightness-110 active:scale-95`}
              disabled={phase !== 'input'}
            />
          ))}
        </div>
      </div>
      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">Watch the pattern, then repeat by clicking the same order</div>
    </div>
  );
}

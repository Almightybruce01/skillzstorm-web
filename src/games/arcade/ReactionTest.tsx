/* REACTION TEST — Wait for green, then click as fast as you can */
import { useRef, useState, useCallback } from 'react';
import { sfxClick, sfxCorrect, sfxWrong, sfxGameOver } from '../SoundEngine';

const ROUNDS = 5;
const MIN_DELAY = 1000;
const MAX_DELAY = 5000;

export function ReactionTest({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'wait' | 'ready' | 'done'>('idle');
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const v = localStorage.getItem('reaction_best');
    return v ? parseInt(v, 10) : null;
  });
  const waitStartRef = useRef<number>(0);
  const readyAtRef = useRef<number>(0);
  const timeoutRef = useRef<number | undefined>(undefined);

  const startRound = useCallback((nextRound?: number, nextResults?: number[]) => {
    const r = nextRound ?? round;
    const res = nextResults ?? results;
    if (r >= ROUNDS && res.length >= ROUNDS) {
      setGameOver(true);
      sfxGameOver();
      const best = Math.min(...res);
      const stored = highScore ?? Infinity;
      if (best < stored) {
        setHighScore(best);
        localStorage.setItem('reaction_best', String(best));
      }
      return;
    }
    setPhase('wait');
    waitStartRef.current = Date.now();
    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
    timeoutRef.current = window.setTimeout(() => {
      setPhase('ready');
      readyAtRef.current = Date.now();
      timeoutRef.current = undefined;
    }, delay) as unknown as number;
  }, [round, results, highScore]);

  const handleClick = () => {
    if (phase === 'idle') {
      sfxClick();
      setRound(0);
      setResults([]);
      startRound();
      return;
    }
    if (phase === 'wait') {
      sfxWrong();
      setPhase('idle');
      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
      return;
    }
    if (phase === 'ready') {
      const ms = Date.now() - readyAtRef.current;
      sfxCorrect();
      const newResults = [...results, ms];
      const newRound = round + 1;
      setResults(newResults);
      setRound(newRound);
      setPhase('idle');
      setTimeout(() => startRound(newRound, newResults), 800);
    }
  };

  const restart = () => {
    if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current);
    setPhase('idle');
    setRound(0);
    setResults([]);
    setGameOver(false);
    sfxClick();
  };

  const currentResult = results.length > 0 ? results[results.length - 1] : null;
  const bestOfRun = results.length > 0 ? Math.min(...results) : null;

  return (
    <div className="game-card !p-0 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-yellow-500/10">
        <div className="flex items-center gap-4">
          <span className="text-xs font-black text-yellow-500">⚡ REACTION TEST</span>
          <span className="text-xs text-white/50">Round {round + 1}/{ROUNDS}</span>
          {highScore != null && <span className="text-xs text-white/30">Best {highScore} ms</span>}
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕</button>
      </div>
      <div
        className="relative flex flex-col items-center justify-center cursor-pointer select-none"
        style={{ height: '400px' }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === ' ' && handleClick()}
      >
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80">
            <h3 className="text-2xl font-black text-white mb-1">Done!</h3>
            <p className="text-xl text-white/80 mb-1">Best this run: {bestOfRun ?? '—'} ms</p>
            {highScore != null && <p className="text-lg text-yellow-400 mb-4">All-time best: {highScore} ms</p>}
            <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
          </div>
        )}
        {!gameOver && phase === 'idle' && round === 0 && results.length === 0 && (
          <p className="text-xl font-bold text-white/70">Click to start • Wait for green, then click!</p>
        )}
        {!gameOver && phase === 'idle' && round > 0 && (
          <p className="text-lg text-white/60">Last: {currentResult} ms • Click for next round</p>
        )}
        {!gameOver && phase === 'wait' && (
          <div className="w-full h-full flex items-center justify-center bg-red-500/20">
            <span className="text-3xl font-black text-red-400">Wait...</span>
          </div>
        )}
        {!gameOver && phase === 'ready' && (
          <div className="w-full h-full flex items-center justify-center bg-green-500/30">
            <span className="text-3xl font-black text-green-400">CLICK!</span>
          </div>
        )}
      </div>
      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">Click when the screen turns green • Do not click on red (false start)</div>
    </div>
  );
}

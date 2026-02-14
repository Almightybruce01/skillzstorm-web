/* COLOR MATCH — Click the button that matches the TEXT color (ink), not the word meaning */
import { useRef, useEffect, useState, useCallback } from 'react';
import { sfxClick, sfxCorrect, sfxWrong, sfxGameOver, sfxMatch } from '../SoundEngine';

const COLORS = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'] as const;
const COLOR_HEX: Record<string, string> = {
  RED: '#ef4444',
  BLUE: '#3b82f6',
  GREEN: '#22c55e',
  YELLOW: '#eab308',
  PURPLE: '#a855f7',
  ORANGE: '#f97316',
};

export function ColorMatchGame({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('colormatch_hs') || '0'));
  const [gameOver, setGameOver] = useState(false);
  const [word, setWord] = useState<string>('RED');
  const [inkColor, setInkColor] = useState<string>('RED');
  const [timeLeft, setTimeLeft] = useState(30);
  const [roundTime, setRoundTime] = useState(5);
  const gameTimerRef = useRef<number | undefined>(undefined);
  const roundTimerRef = useRef<number | undefined>(undefined);

  const pickNew = useCallback(() => {
    const textColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    let ink = COLORS[Math.floor(Math.random() * COLORS.length)];
    while (ink === textColor) ink = COLORS[Math.floor(Math.random() * COLORS.length)];
    setWord(textColor);
    setInkColor(ink);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    setTimeLeft(30);
    setRoundTime(5);
    pickNew();
    gameTimerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true);
          sfxGameOver();
          return 0;
        }
        return t - 1;
      });
    }, 1000) as unknown as number;
    return () => {
      if (gameTimerRef.current !== undefined) clearInterval(gameTimerRef.current);
    };
  }, [gameOver, pickNew]);

  useEffect(() => {
    if (gameOver || timeLeft <= 0) return;
    setRoundTime(5);
    roundTimerRef.current = window.setInterval(() => {
      setRoundTime((t) => {
        if (t <= 1) {
          setStreak(0);
          pickNew();
          return 5;
        }
        return t - 1;
      });
    }, 1000) as unknown as number;
    return () => {
      if (roundTimerRef.current !== undefined) clearInterval(roundTimerRef.current);
    };
  }, [gameOver, word, inkColor, pickNew]);

  const choose = (color: string) => {
    if (gameOver) return;
    if (roundTimerRef.current !== undefined) {
      clearInterval(roundTimerRef.current);
      roundTimerRef.current = undefined;
    }
    if (color === inkColor) {
      sfxCorrect();
      sfxMatch();
      const newStreak = streak + 1;
      setStreak(newStreak);
      const pts = 10 + newStreak * 5;
      setScore((s) => {
        const next = s + pts;
        const hs = parseInt(localStorage.getItem('colormatch_hs') || '0');
        if (next > hs) {
          setHighScore(next);
          localStorage.setItem('colormatch_hs', String(next));
        }
        return next;
      });
      pickNew();
      setRoundTime(5);
      roundTimerRef.current = window.setInterval(() => {
        setRoundTime((t) => {
          if (t <= 1) {
            setStreak(0);
            pickNew();
            return 5;
          }
          return t - 1;
        });
      }, 1000) as unknown as number;
    } else {
      sfxWrong();
      setStreak(0);
      pickNew();
      setRoundTime(5);
    }
  };

  const restart = () => {
    if (gameTimerRef.current !== undefined) clearInterval(gameTimerRef.current);
    if (roundTimerRef.current !== undefined) clearInterval(roundTimerRef.current);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    sfxClick();
  };

  return (
    <div className="game-card !p-0 overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-white/5 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="flex items-center gap-4">
          <span className="text-xs font-black text-purple-400">🌈 COLOR MATCH</span>
          <span className="text-xs font-black text-white/60">SCORE {score}</span>
          <span className="text-xs text-white/30">HI {highScore}</span>
          <span className="text-xs text-pink-400">Streak {streak}</span>
          <span className="text-xs text-white/50">Game {timeLeft}s · Q {roundTime}s</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕</button>
      </div>
      <div className="relative flex flex-col items-center justify-center p-6" style={{ height: '400px' }}>
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80">
            <h3 className="text-2xl font-black text-white mb-1">Time&apos;s Up!</h3>
            <p className="text-3xl font-black text-purple-400 mb-4">{score}</p>
            <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
          </div>
        )}
        <p className="text-sm text-white/50 mb-2">Click the color of the <strong>text</strong> (not the word):</p>
        <p className="text-4xl font-black mb-8 uppercase tracking-wider" style={{ color: COLOR_HEX[inkColor] }}>
          {word}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => choose(c)}
              className="px-4 py-2 rounded-lg font-bold text-sm border-2 border-white/20 hover:brightness-110 transition-all"
              style={{ backgroundColor: COLOR_HEX[c], color: c === 'YELLOW' ? '#000' : '#fff' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">Match the ink color of the word, not what the word says</div>
    </div>
  );
}

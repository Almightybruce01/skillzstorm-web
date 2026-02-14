/* ═══════════════════════════════════════════════════════════
   BALLOON POP ENGINE
   Used by: Word Balloon Pop, Number Catch, Grammar Clicker
   Balloons float up with answers, pop the correct one
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateMathQuestion, getRandomQuestion, type Grade, type Question } from '../questionBank';

interface Balloon {
  id: number; x: number; y: number; text: string; isCorrect: boolean;
  color: string; size: number; speed: number; wobble: number; popped: boolean;
}

const colorSets: Record<string, string[]> = {
  word_balloon_pop: ['#ff3399', '#0099ff', '#00ff80', '#ffe600', '#9933ff', '#ff8000'],
  number_catch: ['#0099ff', '#00e6e6', '#6644ff', '#00ff80', '#0099ff', '#9933ff'],
  grammar_clicker: ['#9933ff', '#ff3399', '#ff8000', '#ffe600', '#00e6e6', '#0099ff'],
  default: ['#ff3399', '#0099ff', '#00ff80', '#ffe600', '#9933ff', '#ff8000'],
};

const bgThemes: Record<string, { top: string; bottom: string; accent: string }> = {
  word_balloon_pop: { top: '#0a001a', bottom: '#1a0033', accent: '#ff3399' },
  number_catch: { top: '#001a2e', bottom: '#00102b', accent: '#0099ff' },
  grammar_clicker: { top: '#1a000d', bottom: '#260019', accent: '#9933ff' },
  default: { top: '#0a001a', bottom: '#1a0033', accent: '#ff3399' },
};

let nextId = 0;

export function BalloonPop({ gameId, grade, onClose }: { gameId: string; grade: Grade; onClose: () => void }) {
  const colors = colorSets[gameId] || colorSets.default;
  const bg = bgThemes[gameId] || bgThemes.default;
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [question, setQuestion] = useState<Question>(generateMathQuestion(grade));
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [popEffects, setPopEffects] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  const spawnWave = useCallback((q: Question) => {
    const newBalloons: Balloon[] = q.options.map((opt, i) => ({
      id: nextId++,
      x: 15 + Math.random() * 70,
      y: 110 + Math.random() * 20,
      text: opt,
      isCorrect: opt === q.answer,
      color: colors[i % colors.length],
      size: 54 + Math.random() * 16,
      speed: 0.15 + Math.random() * 0.1 + level * 0.02,
      wobble: Math.random() * Math.PI * 2,
      popped: false,
    }));
    setBalloons(newBalloons);
  }, [colors, level]);

  useEffect(() => {
    if (gameOver) return;
    spawnWave(question);
  }, [question, spawnWave, gameOver]);

  // Animate balloons floating up
  useEffect(() => {
    if (gameOver) return;
    intervalRef.current = window.setInterval(() => {
      setBalloons(prev => {
        const updated = prev.map(b => ({
          ...b,
          y: b.y - b.speed,
          wobble: b.wobble + 0.05,
        }));
        // Check if any escaped
        const escaped = updated.filter(b => b.y < -10 && !b.popped);
        if (escaped.some(b => b.isCorrect)) {
          // Correct one escaped — lose a life
          setLives(l => {
            const nl = l - 1;
            if (nl <= 0) setGameOver(true);
            return nl;
          });
          setCombo(0);
          const q = gameId.includes('grammar') ? getRandomQuestion(grade, 'grammar') : generateMathQuestion(grade);
          setQuestion(q);
          return [];
        }
        return updated.filter(b => b.y > -10);
      });
    }, 30);
    return () => clearInterval(intervalRef.current);
  }, [gameOver, grade, gameId]);

  const popBalloon = (balloon: Balloon) => {
    if (balloon.popped || gameOver) return;

    setPopEffects(prev => [...prev, { id: balloon.id, x: balloon.x, y: balloon.y, color: balloon.color }]);
    setTimeout(() => setPopEffects(prev => prev.filter(p => p.id !== balloon.id)), 600);

    if (balloon.isCorrect) {
      const newCombo = combo + 1;
      const bonus = newCombo >= 3 ? 2 : 1;
      setScore(s => s + 10 * level * bonus);
      setCombo(newCombo);
      if (score > 0 && score % 60 < 10) setLevel(l => l + 1);
      setBalloons([]);
      const q = gameId.includes('grammar') ? getRandomQuestion(grade, 'grammar') : generateMathQuestion(grade);
      setQuestion(q);
    } else {
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setGameOver(true);
        return nl;
      });
      setCombo(0);
      setBalloons(prev => prev.map(b => b.id === balloon.id ? { ...b, popped: true } : b));
    }
  };

  const restart = () => {
    setScore(0); setLives(3); setLevel(1); setCombo(0); setGameOver(false);
    setQuestion(generateMathQuestion(grade));
  };

  return (
    <div className="game-card !p-0 overflow-hidden animate-pop-in" style={{ border: `1px solid ${bg.accent}30` }}>
      <div className="flex items-center justify-between p-3 border-b border-white/5" style={{ background: `${bg.accent}08` }}>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black" style={{ color: bg.accent }}>SCORE {score}</span>
          <span className="text-xs font-bold text-white/40">LVL {level}</span>
          {combo >= 2 && <span className="text-xs font-black text-[#ffe600] animate-pop-in">🔥{combo}x</span>}
          <span className="text-xs">{Array.from({ length: 3 }, (_, i) => i < lives ? '❤️' : '🖤').join('')}</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕ EXIT</button>
      </div>

      {/* Question */}
      <div className="text-center py-3 border-b border-white/5" style={{ background: `${bg.top}` }}>
        <p className="text-white/30 text-[10px] font-bold tracking-wider">POP THE CORRECT ANSWER</p>
        <p className="text-2xl font-black text-white">{question.text} = ?</p>
      </div>

      {/* Game Area */}
      <div ref={containerRef} className="relative overflow-hidden" style={{ height: '380px', background: `linear-gradient(180deg, ${bg.top}, ${bg.bottom})` }}>
        {gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80">
            <div className="text-6xl mb-4">🎈</div>
            <h3 className="text-3xl font-black text-white mb-2">Game Over!</h3>
            <p className="text-4xl font-black mb-1" style={{ color: bg.accent }}>{score} pts</p>
            <p className="text-white/40 text-sm mb-6">Level {level} • Best Combo: {combo}</p>
            <div className="flex gap-3">
              <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
              <button onClick={onClose} className="btn-elite btn-elite-ghost text-sm">Exit</button>
            </div>
          </div>
        ) : (
          <>
            {/* Balloons */}
            {balloons.filter(b => !b.popped).map(b => (
              <button
                key={b.id}
                onClick={() => popBalloon(b)}
                className="absolute transition-none cursor-pointer select-none active:scale-90 group"
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  transform: `translateX(${Math.sin(b.wobble) * 15}px)`,
                  transition: 'transform 0.1s linear',
                }}
              >
                {/* Balloon body */}
                <div
                  className="rounded-full flex items-center justify-center font-black text-white text-sm shadow-lg group-hover:scale-110 transition-transform duration-150"
                  style={{
                    width: `${b.size}px`,
                    height: `${b.size * 1.2}px`,
                    background: `radial-gradient(ellipse at 30% 30%, ${b.color}cc, ${b.color})`,
                    boxShadow: `0 4px 20px ${b.color}40, inset 0 -4px 8px rgba(0,0,0,0.2)`,
                  }}
                >
                  {/* Shine */}
                  <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-white/30" />
                  <span className="relative z-10 text-xs sm:text-sm" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{b.text}</span>
                </div>
                {/* String */}
                <div className="w-px h-8 mx-auto" style={{ background: `${b.color}60` }} />
              </button>
            ))}

            {/* Pop effects */}
            {popEffects.map(p => (
              <div key={p.id} className="absolute pointer-events-none animate-pop-in" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: p.color,
                      animation: `particle-float 0.5s ease-out forwards`,
                      '--tx': `${(Math.random() - 0.5) * 80}px`,
                      '--ty': `${(Math.random() - 0.5) * 80}px`,
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">
        TAP or CLICK the balloon with the correct answer! Don't let the right one escape!
      </div>
    </div>
  );
}

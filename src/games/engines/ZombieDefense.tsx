/* ═══════════════════════════════════════════════════════════
   ZOMBIE DEFENSE ENGINE
   Used by: WordWave Survival, Science Defender, Data Defender, Storm Defenders
   Enemies approach from sides, answer correctly to destroy them
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateMathQuestion, getRandomQuestion, type Grade, type Question } from '../questionBank';
import { sfxExplosion, sfxWrong, sfxGameOver, sfxCorrect } from '../SoundEngine';

interface Enemy {
  id: number;
  x: number;
  direction: 'left' | 'right';
  speed: number;
  emoji: string;
  hp: number;
}

const themeData: Record<string, { name: string; enemies: string[]; bg: string; accent: string; groundColor: string }> = {
  wordwave_survival: { name: 'WordWave Survival', enemies: ['🧟', '🧟‍♂️', '🧟‍♀️', '💀', '👻'], bg: 'linear-gradient(180deg, #0d1a0d, #001a00)', accent: '#00ff80', groundColor: '#0a3d0a' },
  science_defender: { name: 'Science Defender', enemies: ['🦠', '🧫', '🔬', '⚗️', '🧬'], bg: 'linear-gradient(180deg, #001a1a, #000d1a)', accent: '#00e6e6', groundColor: '#003d3d' },
  data_defender: { name: 'Data Defender', enemies: ['🐛', '🕷️', '🦟', '💻', '⚠️'], bg: 'linear-gradient(180deg, #0d0d1f, #000d1a)', accent: '#0099ff', groundColor: '#0a0a3d' },
  storm_defenders_vr: { name: 'Storm Defenders', enemies: ['🌪️', '⛈️', '🌊', '🔥', '❄️'], bg: 'linear-gradient(180deg, #1a0a00, #0d0500)', accent: '#ff8000', groundColor: '#3d1a00' },
  default: { name: 'Zombie Defense', enemies: ['🧟', '🧟‍♂️', '💀', '👻', '🧟‍♀️'], bg: 'linear-gradient(180deg, #0d1a0d, #001a00)', accent: '#00ff80', groundColor: '#0a3d0a' },
};

let eid = 0;

export function ZombieDefense({ gameId, grade, onClose }: { gameId: string; grade: Grade; onClose: () => void }) {
  const t = themeData[gameId] || themeData.default;
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [wave, setWave] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [question, setQuestion] = useState<Question>(generateMathQuestion(grade));
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [killEffects, setKillEffects] = useState<{ id: number; x: number }[]>([]);
  const tickRef = useRef<number | undefined>(undefined);

  const spawnEnemy = useCallback(() => {
    const dir = Math.random() > 0.5 ? 'left' : 'right';
    setEnemies(prev => [...prev, {
      id: eid++,
      x: dir === 'left' ? -5 : 105,
      direction: dir,
      speed: 0.08 + wave * 0.015 + Math.random() * 0.03,
      emoji: t.enemies[Math.floor(Math.random() * t.enemies.length)],
      hp: 1,
    }]);
  }, [wave, t.enemies]);

  // Spawn enemies periodically
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      spawnEnemy();
    }, Math.max(1200, 3000 - wave * 200));
    return () => clearInterval(interval);
  }, [spawnEnemy, gameOver, wave]);

  // Move enemies
  useEffect(() => {
    if (gameOver) return;
    tickRef.current = window.setInterval(() => {
      setEnemies(prev => {
        const updated = prev.map(e => ({
          ...e,
          x: e.direction === 'left' ? e.x + e.speed : e.x - e.speed,
        }));
        // Check if any reached center (40-60%)
        const reached = updated.filter(e => e.x > 40 && e.x < 60);
        if (reached.length > 0) {
          setLives(l => {
            const nl = l - reached.length;
            if (nl <= 0) setGameOver(true);
            return Math.max(0, nl);
          });
          return updated.filter(e => !(e.x > 40 && e.x < 60));
        }
        return updated;
      });
    }, 50);
    return () => clearInterval(tickRef.current);
  }, [gameOver]);

  const handleAnswer = (opt: string) => {
    if (feedback || gameOver) return;
    if (opt === question.answer) {
      setFeedback('correct');
      sfxCorrect();
      sfxExplosion();
      // Kill closest enemy
      setEnemies(prev => {
        if (prev.length === 0) return prev;
        const sorted = [...prev].sort((a, b) => Math.abs(50 - a.x) - Math.abs(50 - b.x));
        const killed = sorted[0];
        setKillEffects(p => [...p, { id: killed.id, x: killed.x }]);
        setTimeout(() => setKillEffects(p => p.filter(k => k.id !== killed.id)), 500);
        return prev.filter(e => e.id !== killed.id);
      });
      setScore(s => {
        const ns = s + 10 * wave;
        if (ns % 80 < 10) setWave(w => w + 1);
        return ns;
      });
      setTimeout(() => {
        setFeedback(null);
        const subj = gameId.includes('science') ? 'science' : gameId.includes('vocab') || gameId.includes('word') ? 'vocabulary' : undefined;
        setQuestion(subj ? getRandomQuestion(grade, subj) : generateMathQuestion(grade));
      }, 400);
    } else {
      setFeedback('wrong');
      sfxWrong();
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) { setGameOver(true); sfxGameOver(); }
        return nl;
      });
      setTimeout(() => setFeedback(null), 500);
    }
  };

  const restart = () => {
    setScore(0); setLives(5); setWave(1); setGameOver(false);
    setEnemies([]); setFeedback(null);
    setQuestion(generateMathQuestion(grade));
  };

  return (
    <div className="game-card !p-0 overflow-hidden animate-pop-in" style={{ border: `1px solid ${t.accent}30` }}>
      <div className="flex items-center justify-between p-3 border-b border-white/5" style={{ background: `${t.accent}08` }}>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black" style={{ color: t.accent }}>SCORE {score}</span>
          <span className="text-xs font-bold text-white/40">WAVE {wave}</span>
          <span className="text-xs">{Array.from({ length: 5 }, (_, i) => i < lives ? '❤️' : '🖤').join('')}</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕ EXIT</button>
      </div>

      {/* Battlefield */}
      <div className="relative overflow-hidden" style={{ height: '280px', background: t.bg }}>
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80">
            <div className="text-6xl mb-4">{t.enemies[0]}</div>
            <h3 className="text-3xl font-black text-white mb-2">Overrun!</h3>
            <p className="text-4xl font-black mb-1" style={{ color: t.accent }}>{score} pts</p>
            <p className="text-white/40 text-sm mb-6">Wave {wave}</p>
            <div className="flex gap-3">
              <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
              <button onClick={onClose} className="btn-elite btn-elite-ghost text-sm">Exit</button>
            </div>
          </div>
        )}

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: t.groundColor }} />
        <div className="absolute bottom-16 left-0 right-0 h-px" style={{ background: `${t.accent}20` }} />

        {/* Player tower in center */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-4xl z-10" style={{ filter: `drop-shadow(0 0 10px ${t.accent}60)` }}>
          🏰
        </div>

        {/* Enemies */}
        {enemies.map(e => (
          <div
            key={e.id}
            className="absolute bottom-16 transition-none"
            style={{
              left: `${e.x}%`,
              transform: `translateX(-50%) scaleX(${e.direction === 'left' ? 1 : -1})`,
            }}
          >
            <div className="text-3xl" style={{ animation: 'float 1s ease-in-out infinite', filter: `drop-shadow(0 0 6px rgba(255,0,0,0.4))` }}>
              {e.emoji}
            </div>
          </div>
        ))}

        {/* Kill effects */}
        {killEffects.map(k => (
          <div key={k.id} className="absolute bottom-20 animate-pop-in" style={{ left: `${k.x}%`, transform: 'translateX(-50%)' }}>
            <div className="text-2xl">💥</div>
          </div>
        ))}

        {/* Danger indicators */}
        {enemies.filter(e => Math.abs(50 - e.x) < 20).length > 0 && (
          <div className="absolute inset-0 border-2 border-red-500/30 animate-pulse pointer-events-none rounded" />
        )}
      </div>

      {/* Question + Answers */}
      <div className="p-4 border-t border-white/5" style={{ background: `linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5))` }}>
        <p className="text-center text-white/30 text-[10px] font-bold tracking-wider mb-1">ANSWER TO ATTACK</p>
        <p className={`text-center text-2xl font-black mb-4 transition-all duration-200 ${
          feedback === 'correct' ? 'text-[#00ff80] scale-110' : feedback === 'wrong' ? 'text-[#ff2626] scale-95' : 'text-white'
        }`}>
          {question.text}
          {feedback === 'correct' && ' ✓'}
          {feedback === 'wrong' && ` ✗ → ${question.answer}`}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {question.options.map((opt, i) => (
            <button
              key={`${opt}-${i}`}
              onClick={() => handleAnswer(opt)}
              disabled={!!feedback}
              className="py-3 rounded-xl font-black text-white border border-white/[0.06] hover:border-white/20 transition-all active:scale-95 text-sm"
              style={{ background: feedback && opt === question.answer ? 'rgba(0,255,128,0.15)' : 'rgba(255,255,255,0.04)' }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">
        Answer correctly to destroy enemies! Don't let them reach your tower!
      </div>
    </div>
  );
}

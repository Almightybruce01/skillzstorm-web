import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allGames, gradeLevels } from '../engine/gameData';
import { InArticleAd } from '../components/ads/AdBanner';

const catColorMap: Record<string, string> = {
  StormBattle: '#0099ff', StormDash: '#00ff80', StormPuzzle: '#ffe600',
  StormQuick: '#ff3399', Storm3D: '#9933ff', StormVR: '#00e6e6',
};

export function GameDetailPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = allGames.find(g => g.id === gameId);
  const [playing, setPlaying] = useState(false);

  if (!game) {
    return (
      <div className="pt-20 min-h-[100vh] w-full flex flex-col items-center justify-center text-center">
        <div className="text-7xl mb-4 animate-float">🔍</div>
        <h1 className="text-3xl font-black text-white mb-3">Game Not Found</h1>
        <Link to="/games" className="btn-elite btn-elite-primary text-sm">← Back to Games</Link>
      </div>
    );
  }

  const accent = catColorMap[game.category] || '#0099ff';
  const gradeColors = game.supportedGrades.map(g => gradeLevels.find(gl => gl.value === g));

  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Back link */}
      <Link to="/games" className="text-white/30 text-sm hover:text-white/60 transition-all duration-300 mb-8 inline-flex items-center gap-2 group">
        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        <span>Back to Games</span>
      </Link>

      {/* Hero */}
      <div className="text-center mb-10 animate-slide-up">
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-[60px] rounded-full scale-[2] animate-pulse-slow" style={{ background: `${accent}20` }} />
          <div className="relative text-[100px] sm:text-[120px] mb-4 animate-float leading-none">{game.iconEmoji}</div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 animate-slide-up delay-100">{game.name}</h1>
        <div className="flex justify-center gap-2 mb-2 animate-slide-up delay-200 flex-wrap">
          {game.isFeatured && (
            <span className="text-xs font-black bg-gradient-to-r from-[#ff2626] to-[#ff3399] text-white px-4 py-1.5 rounded-lg shadow-[0_0_15px_rgba(255,38,38,0.3)]">
              FEATURED
            </span>
          )}
          <span className="text-xs font-bold px-4 py-1.5 rounded-lg" style={{ backgroundColor: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
            {game.category}
          </span>
          {game.isPremium && (
            <span className="text-xs font-black bg-gradient-to-r from-[#ffe600] to-[#ff8000] text-[#0d0d1f] px-4 py-1.5 rounded-lg">PREMIUM</span>
          )}
          {!game.isAvailable && (
            <span className="text-xs font-bold bg-white/10 text-white/50 px-4 py-1.5 rounded-lg">COMING SOON</span>
          )}
        </div>
      </div>

      {/* ═══════ PLAY BUTTON ═══════ */}
      {!playing ? (
        <button
          onClick={() => game.isAvailable && setPlaying(true)}
          className={`w-full py-5 rounded-2xl font-black text-xl text-white mb-10 transition-all duration-300 active:scale-[0.97] relative overflow-hidden animate-slide-up delay-300 ${
            game.isAvailable
              ? 'cursor-pointer hover:scale-[1.02]'
              : 'cursor-not-allowed opacity-60'
          }`}
          style={game.isAvailable ? {
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            boxShadow: `0 6px 30px ${accent}30`,
          } : { background: '#333' }}
          disabled={!game.isAvailable}
        >
          {/* Shimmer overlay */}
          {game.isAvailable && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />}
          {/* Pulse ring */}
          {game.isAvailable && <div className="absolute inset-0 rounded-2xl border-2 animate-ping opacity-20" style={{ borderColor: accent }} />}
          <span className="relative z-10 flex items-center justify-center gap-3">
            {game.isAvailable ? (
              <>
                <span className="text-2xl">▶</span>
                PLAY NOW
              </>
            ) : (
              <>
                <span className="text-2xl">🔒</span>
                COMING SOON
              </>
            )}
          </span>
        </button>
      ) : (
        <MiniGameDemo game={game} accent={accent} onClose={() => setPlaying(false)} />
      )}

      {/* Description */}
      <div className="game-card !p-6 mb-6 animate-slide-up delay-400">
        <h3 className="text-xs font-black tracking-[0.15em] mb-3 flex items-center gap-2" style={{ color: accent }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }} />
          ABOUT THIS GAME
        </h3>
        <p className="text-white/60 leading-relaxed">{game.description}</p>
      </div>

      {/* Grade Levels */}
      <div className="game-card !p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.45s' }}>
        <h3 className="text-xs font-black text-[#9933ff] tracking-[0.15em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9933ff] shadow-[0_0_8px_rgba(153,51,255,0.8)]" />
          GRADE LEVELS
        </h3>
        <div className="flex flex-wrap gap-2">
          {gradeColors.map((gc) => gc && (
            <span
              key={gc.value}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 cursor-default"
              style={{
                backgroundColor: `${gc.color}10`,
                color: gc.color,
                border: `1px solid ${gc.color}25`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 20px ${gc.color}20`; e.currentTarget.style.borderColor = `${gc.color}50`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = `${gc.color}25`; }}
            >
              {gc.label} — {gc.subtitle}
            </span>
          ))}
        </div>
      </div>

      {/* Knowledge Gates */}
      <div className="game-card !p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <h3 className="text-xs font-black text-[#ff8000] tracking-[0.15em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff8000] shadow-[0_0_8px_rgba(255,128,0,0.8)]" />
          KNOWLEDGE GATES
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <GateInfo icon="🔒" title="Checkpoint" desc="Answer between levels" color="#0099ff" />
          <GateInfo icon="🔥" title="Boss Gate" desc="3 rapid-fire questions" color="#ff2626" />
          <GateInfo icon="⚡" title="Speed Gate" desc="5-second timer" color="#ffe600" />
          <GateInfo icon="⭐" title="Streak Gate" desc="3 in a row" color="#9933ff" />
        </div>
      </div>

      {/* Power-ups */}
      <div className="game-card !p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.55s' }}>
        <h3 className="text-xs font-black text-[#ffe600] tracking-[0.15em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ffe600] shadow-[0_0_8px_rgba(255,230,0,0.8)]" />
          POWER-UPS
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <PowerUp icon="⏱️" name="Slow Time" color="#0099ff" />
          <PowerUp icon="🛡️" name="Hint Shield" color="#9933ff" />
          <PowerUp icon="⭐" name="2x Points" color="#ffe600" />
          <PowerUp icon="❤️" name="Extra Life" color="#ff2626" />
        </div>
      </div>

      <InArticleAd />

      {/* Download CTA */}
      <div className="game-card !p-8 text-center animate-slide-up" style={{ animationDelay: '0.6s', background: `linear-gradient(135deg, ${accent}08, ${accent}04)` }}>
        <h3 className="font-black text-white mb-2 text-lg">Play on Mobile</h3>
        <p className="text-white/40 text-sm mb-6">Download SkillzStorm for iPhone, iPad & Mac</p>
        <div className="flex gap-3 justify-center">
          <button className="btn-elite btn-elite-ghost text-sm flex items-center gap-2">
            <span>📱</span> App Store
          </button>
          <button className="btn-elite btn-elite-ghost text-sm flex items-center gap-2">
            <span>💻</span> Mac App
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MINI GAME DEMO — actually interactive!
   ═══════════════════════════════════════════════════════════ */
function MiniGameDemo({ game, accent, onClose }: { game: typeof allGames[0]; accent: string; onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState({ text: '', answer: 0, options: [0, 0, 0, 0] });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);

  const generateQuestion = useCallback(() => {
    const maxNum = level <= 2 ? 10 : level <= 4 ? 25 : 50;
    const ops = level <= 2 ? ['+'] : level <= 4 ? ['+', '-', '×'] : ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * maxNum) + 1;
    let b = Math.floor(Math.random() * (maxNum / 2)) + 1;
    let answer: number;
    let text: string;
    if (op === '+') { answer = a + b; text = `${a} + ${b}`; }
    else if (op === '-') { if (a < b) [a, b] = [b, a]; answer = a - b; text = `${a} − ${b}`; }
    else { a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; answer = a * b; text = `${a} × ${b}`; }

    const opts = new Set<number>();
    opts.add(answer);
    while (opts.size < 4) {
      const wrong = answer + Math.floor(Math.random() * 10) - 5;
      if (wrong !== answer && wrong >= 0) opts.add(wrong);
    }
    const shuffled = Array.from(opts).sort(() => Math.random() - 0.5);
    setQuestion({ text, answer, options: shuffled });
    setTimeLeft(10);
    setFeedback(null);
  }, [level]);

  useEffect(() => { generateQuestion(); }, [generateQuestion]);

  useEffect(() => {
    if (gameOver || feedback) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { handleAnswer(-1); return 10; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, feedback, level]);

  const handleAnswer = (selected: number) => {
    if (feedback || gameOver) return;
    if (selected === question.answer) {
      const bonus = streak >= 2 ? 2 : 1;
      setScore(s => s + (10 * level * bonus));
      setStreak(s => s + 1);
      setFeedback('correct');
      setTimeout(() => {
        if ((score + 10 * level) % 50 < 10) setLevel(l => l + 1);
        generateQuestion();
      }, 600);
    } else {
      setStreak(0);
      setFeedback('wrong');
      setLives(l => {
        if (l <= 1) { setGameOver(true); return 0; }
        return l - 1;
      });
      setTimeout(() => { if (!gameOver) generateQuestion(); }, 800);
    }
  };

  return (
    <div className="game-card !p-0 mb-10 animate-pop-in overflow-hidden" style={{ border: `1px solid ${accent}30` }}>
      {/* Game header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5" style={{ background: `${accent}08` }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{game.iconEmoji}</span>
          <div>
            <h3 className="font-black text-white text-sm">{game.name}</h3>
            <p className="text-white/30 text-xs">Level {level} • Knowledge Gate Demo</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-all active:scale-90">
          ✕
        </button>
      </div>

      {/* Game area */}
      <div className="p-6 sm:p-8">
        {gameOver ? (
          <div className="text-center py-8 animate-pop-in">
            <div className="text-6xl mb-4">💥</div>
            <h3 className="text-2xl font-black text-white mb-2">Game Over!</h3>
            <p className="text-4xl font-black mb-4" style={{ color: accent }}>{score} pts</p>
            <p className="text-white/40 text-sm mb-6">Level {level} • Best Streak: {streak}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setScore(0); setLives(3); setLevel(1); setStreak(0); setGameOver(false); generateQuestion(); }} className="btn-elite btn-elite-primary text-sm">
                Play Again
              </button>
              <button onClick={onClose} className="btn-elite btn-elite-ghost text-sm">
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* HUD */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-white/30 text-xs">SCORE</span>
                  <div className="font-black text-lg" style={{ color: accent }}>{score}</div>
                </div>
                <div className="text-sm">
                  <span className="text-white/30 text-xs">LEVEL</span>
                  <div className="font-black text-lg text-white">{level}</div>
                </div>
                {streak >= 2 && (
                  <div className="text-sm animate-pop-in">
                    <span className="text-white/30 text-xs">STREAK</span>
                    <div className="font-black text-lg text-[#ffe600]">🔥{streak}</div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className={`text-lg transition-all duration-300 ${i < lives ? 'opacity-100 scale-100' : 'opacity-20 scale-75'}`}>
                      ❤️
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timer bar */}
            <div className="h-1.5 rounded-full bg-white/5 mb-8 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(timeLeft / 10) * 100}%`,
                  background: timeLeft > 5 ? accent : timeLeft > 2 ? '#ffe600' : '#ff2626',
                  boxShadow: timeLeft <= 3 ? `0 0 10px ${timeLeft <= 2 ? '#ff2626' : '#ffe600'}40` : 'none',
                }}
              />
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <p className="text-white/30 text-xs font-bold tracking-wider mb-3">SOLVE THIS</p>
              <div className={`text-5xl sm:text-6xl font-black text-white transition-all duration-300 ${feedback === 'correct' ? 'scale-110 text-[#00ff80]' : feedback === 'wrong' ? 'scale-95 text-[#ff2626]' : ''}`}>
                {question.text} = ?
              </div>
              {feedback && (
                <p className={`text-sm font-black mt-2 animate-pop-in ${feedback === 'correct' ? 'text-[#00ff80]' : 'text-[#ff2626]'}`}>
                  {feedback === 'correct' ? (streak >= 3 ? '🔥 STREAK BONUS!' : '✓ Correct!') : `✗ Answer: ${question.answer}`}
                </p>
              )}
            </div>

            {/* Answer options */}
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((opt, i) => (
                <button
                  key={`${opt}-${i}`}
                  onClick={() => handleAnswer(opt)}
                  className="py-4 rounded-xl font-black text-xl text-white transition-all duration-200 active:scale-95 border border-white/[0.06] hover:border-white/15"
                  style={{
                    background: feedback && opt === question.answer
                      ? 'rgba(0,255,128,0.15)'
                      : feedback === 'wrong' && opt !== question.answer
                        ? 'rgba(255,255,255,0.02)'
                        : 'rgba(255,255,255,0.04)',
                    borderColor: feedback && opt === question.answer ? 'rgba(0,255,128,0.3)' : undefined,
                  }}
                  onMouseEnter={(e) => { if (!feedback) { e.currentTarget.style.backgroundColor = `${accent}15`; e.currentTarget.style.borderColor = `${accent}30`; } }}
                  onMouseLeave={(e) => { if (!feedback) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; } }}
                  disabled={!!feedback}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GateInfo({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-300 group cursor-default">
      <span className="text-xl group-hover:scale-125 transition-transform duration-300">{icon}</span>
      <div>
        <div className="text-sm font-bold text-white group-hover:transition-colors duration-300"
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = color; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'white'; }}
        >{title}</div>
        <div className="text-white/30 text-xs">{desc}</div>
      </div>
    </div>
  );
}

function PowerUp({ icon, name, color }: { icon: string; name: string; color: string }) {
  return (
    <div className="text-center group cursor-default">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-xl mx-auto mb-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
        style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
      >
        <span className="group-hover:scale-125 transition-transform duration-300">{icon}</span>
      </div>
      <div className="text-white/35 text-xs font-semibold group-hover:text-white/60 transition-colors">{name}</div>
    </div>
  );
}

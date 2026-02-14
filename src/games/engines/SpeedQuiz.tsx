/* ═══════════════════════════════════════════════════════════
   SPEED QUIZ / BRAIN ARENA ENGINE
   Used by: SAT Word Arena, Brain Arena, Flash Fact Frenzy, Speed Multiplication
   Rapid-fire quiz with neon arena style
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateMathQuestion, getRandomQuestion, type Grade, type Question } from '../questionBank';

type ThemeId = 'sat_word_arena' | 'flash_fact_frenzy' | 'speed_multiplication' | 'brain_arena' | 'default';

const themes: Record<ThemeId, { accent: string; glow: string; bg: string }> = {
  sat_word_arena: { accent: '#ffe600', glow: 'rgba(255,230,0,0.4)', bg: 'linear-gradient(135deg,#1a1500,#0d0d00)' },
  flash_fact_frenzy: { accent: '#00e6e6', glow: 'rgba(0,230,230,0.4)', bg: 'linear-gradient(135deg,#001a1a,#000d0d)' },
  speed_multiplication: { accent: '#0099ff', glow: 'rgba(0,153,255,0.4)', bg: 'linear-gradient(135deg,#001a2e,#000d1a)' },
  brain_arena: { accent: '#9933ff', glow: 'rgba(153,51,255,0.4)', bg: 'linear-gradient(135deg,#1a001a,#0d000d)' },
  default: { accent: '#0099ff', glow: 'rgba(0,153,255,0.4)', bg: 'linear-gradient(135deg,#001a2e,#000d1a)' },
};

function getTheme(gameId: string): ThemeId {
  if (gameId === 'sat_word_arena') return 'sat_word_arena';
  if (gameId === 'flash_fact_frenzy') return 'flash_fact_frenzy';
  if (gameId === 'speed_multiplication') return 'speed_multiplication';
  if (gameId === 'brain_arena') return 'brain_arena';
  return 'default';
}

function getSubject(gameId: string): 'math' | 'vocabulary' | undefined {
  if (gameId === 'sat_word_arena') return 'vocabulary';
  if (gameId === 'speed_multiplication') return 'math';
  return undefined;
}

export function SpeedQuiz({ gameId, grade, onClose }: { gameId: string; grade: Grade; onClose: () => void }) {
  const themeId = getTheme(gameId) as ThemeId;
  const subject = getSubject(gameId);
  const theme = themes[themeId] || themes.default;

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answered, setAnswered] = useState(false);
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const timerDuration = Math.max(3, 8 - (level - 1) * 0.3);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const timerRef = useRef<number | undefined>(undefined);
  const flashRef = useRef<number | undefined>(undefined);
  const answeredRef = useRef(false);
  const gameOverRef = useRef(false);

  answeredRef.current = answered;
  gameOverRef.current = gameOver;

  const loadQuestion = useCallback(() => {
    const q = subject === 'math' ? generateMathQuestion(grade) : getRandomQuestion(grade, subject);
    setQuestion(q);
    setAnswered(false);
    setTimeLeft(Math.max(3, 8 - (level - 1) * 0.3));
  }, [grade, subject, level]);

  const handleWrong = useCallback(() => {
    if (answeredRef.current) return;
    setAnswered(true);
    setFlash('wrong');
    setLives((l) => {
      const next = l - 1;
      if (next <= 0) setGameOver(true);
      return next;
    });
    setStreak(0);
    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = window.setTimeout(() => {
      setFlash(null);
      if (!gameOverRef.current) loadQuestion();
    }, 400);
  }, [loadQuestion]);

  useEffect(() => {
    if (gameOver) return;
    loadQuestion();
  }, [gameOver, level, loadQuestion]);

  useEffect(() => {
    if (gameOver || answered || !question) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.05) {
          clearInterval(timerRef.current);
          handleWrong();
          return 0;
        }
        return t - 0.05;
      });
    }, 50);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [question, answered, gameOver, handleWrong]);

  const handleAnswer = (selected: string) => {
    if (answered) return;
    setAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);

    if (selected === question!.answer) {
      setFlash('correct');
      setScore((s) => s + 10 + Math.min(streak * 2, 20));
      setStreak((s) => s + 1);
      setQuestionsAnswered((q) => q + 1);
      if (questionsAnswered + 1 >= 5) {
        setLevel((l) => l + 1);
        setQuestionsAnswered(0);
      }
    } else {
      setFlash('wrong');
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) setGameOver(true);
        return next;
      });
      setStreak(0);
    }

    if (flashRef.current) clearTimeout(flashRef.current);
    flashRef.current = window.setTimeout(() => {
      setFlash(null);
      if (!gameOverRef.current) loadQuestion();
    }, 400);
  };

  const streakLabel = streak >= 10 ? 'UNSTOPPABLE' : streak >= 5 ? 'ON FIRE' : null;

  if (gameOver) {
    return (
      <div className="game-card fixed inset-4 z-50 flex flex-col items-center justify-center rounded-2xl" style={{ background: theme.bg }}>
        <h2 className="text-3xl font-black mb-2" style={{ color: theme.accent }}>GAME OVER</h2>
        <p className="text-xl text-white/80 mb-6">Final Score: <span style={{ color: theme.accent }}>{score}</span></p>
        <button className="btn-elite btn-elite-primary" onClick={onClose}>Exit</button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden transition-opacity duration-150"
      style={{ background: theme.bg }}
    >
      {/* Flash overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-150 z-10 ${
          flash === 'correct' ? 'opacity-100' : flash === 'wrong' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: flash === 'correct' ? 'rgba(0,255,128,0.2)' : flash === 'wrong' ? 'rgba(255,38,38,0.25)' : 'transparent',
        }}
      />

      {/* HUD */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-6">
          <span className="text-white/90 font-bold">Score: <span style={{ color: theme.accent }}>{score}</span></span>
          <span className="text-white/80">Level {level}</span>
          <span className="flex items-center gap-1">
            {streak > 0 && <span className="text-lg">🔥</span>}
            <span className={streak >= 5 ? 'font-black' : ''} style={{ color: streak >= 5 ? theme.accent : undefined }}>
              {streak} streak
              {streakLabel && <span className="ml-2 text-sm font-extrabold opacity-90">({streakLabel})</span>}
            </span>
          </span>
          <span className="flex gap-1">
            {'❤️'.repeat(lives)}
          </span>
        </div>
        <button className="btn-elite btn-elite-ghost px-4 py-2" onClick={onClose}>✕ Exit</button>
      </div>

      {/* Main arena */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
        {/* Circular timer ring + question */}
        <div className="relative">
          <svg className="w-72 h-72 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
            <circle
              cx="100" cy="100" r="92"
              fill="none"
              stroke={theme.accent}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 92}`}
              strokeDashoffset={`${2 * Math.PI * 92 * (1 - timeLeft / timerDuration)}`}
              style={{
                transition: 'stroke-dashoffset 0.05s linear, filter 0.2s ease',
                filter: `drop-shadow(0 0 ${timeLeft < 2 ? 20 : 12}px ${theme.glow})`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-center text-xl md:text-2xl font-bold text-white px-6 max-w-[220px] leading-tight">
              {question?.text}
            </p>
          </div>
        </div>

        {/* Answer grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          {question?.options.map((opt) => (
            <button
              key={opt}
              disabled={answered}
              onClick={() => handleAnswer(opt)}
              className="game-card btn-elite py-5 px-6 text-lg font-bold text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                background: 'rgba(20,20,45,0.6)',
              }}
              data-color={themeId === 'sat_word_arena' ? 'gold' : themeId === 'brain_arena' ? 'purple' : themeId === 'flash_fact_frenzy' ? 'cyan' : 'blue'}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Controls hint */}
      <p className="text-center text-white/50 text-sm pb-4">Tap an answer before time runs out • 5 correct = level up</p>
    </div>
  );
}

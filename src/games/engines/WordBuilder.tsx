/* ═══════════════════════════════════════════════════════════
   WORD BUILDER ENGINE
   Used by: Sentence Builder Pro, Grammar Gladiator, Essay Builder Rush
   Arrange scrambled words into correct sentence order
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Grade } from '../questionBank';

interface Theme { accent: string; bg: string; tile: string; }

const themes: Record<string, Theme> = {
  sentence_builder_pro: { accent: '#9933ff', bg: '#0d001a', tile: '#9933ff' },
  grammar_gladiator: { accent: '#ff8000', bg: '#1a0a00', tile: '#ff8000' },
  essay_builder_rush: { accent: '#00ff80', bg: '#001a0d', tile: '#00ff80' },
  default: { accent: '#0099ff', bg: '#001a2e', tile: '#0099ff' },
};

const sentenceBank: Record<string, string[]> = {
  'K-2': [
    'The cat sat on the mat',
    'I like to play games',
    'She has a red ball',
    'We go to school every day',
    'He can run very fast',
    'The dog likes to play fetch',
    'My mom makes good food',
    'Birds can fly in the sky',
    'I have two big eyes',
    'The sun is very bright',
  ],
  '3-5': [
    'The quick brown fox jumps over the lazy dog',
    'Scientists discovered a new planet yesterday',
    'Reading books improves your vocabulary skills',
    'The children played happily in the sunny park',
    'Mathematics helps us solve real world problems',
    'Our teacher explained the science experiment clearly',
    'The ocean contains many different species of fish',
    'Exercise keeps your body healthy and strong',
  ],
  '6-8': [
    'The committee decided to postpone the annual conference',
    'Despite the heavy rain the team continued practicing diligently',
    'Photosynthesis is the process by which plants make food',
    'The industrial revolution transformed manufacturing across Europe',
    'Students should develop critical thinking skills early on',
    'The experiment demonstrated a significant correlation between variables',
  ],
  '9-12': [
    'The theoretical framework establishes fundamental principles for analysis',
    'Photosynthesis converts light energy into chemical energy efficiently',
    'Constitutional amendments reflect the evolving values of democratic society',
    'Quantum mechanics challenges our classical understanding of physical reality',
    'Economic indicators suggest a gradual recovery from the recent recession',
    'The philosophical implications of artificial intelligence remain deeply contested',
  ],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function WordBuilder({ gameId, grade, onClose }: { gameId: string; grade: Grade; onClose: () => void }) {
  const t = themes[gameId] || themes.default;
  const sentences = sentenceBank[grade] || sentenceBank['3-5'];

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [correctSentences, setCorrectSentences] = useState(0);

  // Current sentence
  const currentSentence = sentences[sentenceIdx % sentences.length];
  const correctWords = currentSentence.split(' ');
  const [scrambled, setScrambled] = useState<string[]>(() => shuffle([...correctWords]));
  const [selected, setSelected] = useState<string[]>([]);
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);

  // Timer
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<number | undefined>(undefined);

  const maxTime = Math.max(8, 15 - (level - 1));

  const nextSentence = useCallback(() => {
    const nextIdx = (sentenceIdx + 1) % sentences.length;
    setSentenceIdx(nextIdx);
    const next = sentences[nextIdx].split(' ');
    setScrambled(shuffle([...next]));
    setSelected([]);
    setTimeLeft(Math.max(8, 15 - level));
  }, [sentenceIdx, sentences, level]);

  // Timer countdown
  useEffect(() => {
    if (gameOver) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up
          setLives(l => {
            const nl = l - 1;
            if (nl <= 0) setGameOver(true);
            return nl;
          });
          nextSentence();
          return maxTime;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameOver, maxTime, nextSentence]);

  const handleWordClick = (word: string, idx: number) => {
    if (gameOver) return;
    const nextCorrectWord = correctWords[selected.length];
    if (word === nextCorrectWord) {
      const newSelected = [...selected, word];
      setSelected(newSelected);
      setScrambled(prev => prev.filter((_, i) => i !== idx));

      // Check if sentence complete
      if (newSelected.length === correctWords.length) {
        const bonus = timeLeft > 5 ? 5 : 0;
        setScore(s => s + 10 * level + bonus);
        setCorrectSentences(c => {
          const nc = c + 1;
          if (nc % 3 === 0) setLevel(l => l + 1);
          return nc;
        });
        setTimeout(() => nextSentence(), 600);
      }
    } else {
      // Wrong word — shake
      setShakeIdx(idx);
      setTimeout(() => setShakeIdx(null), 500);
      setLives(l => {
        const nl = l - 1;
        if (nl <= 0) setGameOver(true);
        return nl;
      });
    }
  };

  const handleUndoWord = (idx: number) => {
    const word = selected[idx];
    if (idx !== selected.length - 1) return; // only undo last
    setSelected(prev => prev.slice(0, -1));
    setScrambled(prev => [...prev, word]);
  };

  const restart = () => {
    setScore(0); setLives(3); setLevel(1); setGameOver(false);
    setCorrectSentences(0); setSentenceIdx(0);
    const words = sentences[0].split(' ');
    setScrambled(shuffle([...words]));
    setSelected([]);
    setTimeLeft(15);
  };

  const timerPct = (timeLeft / maxTime) * 100;

  return (
    <div className="game-card !p-0 overflow-hidden animate-pop-in" style={{ border: `1px solid ${t.accent}30` }}>
      {/* HUD */}
      <div className="flex items-center justify-between p-3 border-b border-white/5" style={{ background: `${t.accent}08` }}>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black" style={{ color: t.accent }}>SCORE {score}</span>
          <span className="text-xs font-bold text-white/40">LVL {level}</span>
          <span className="text-xs">{Array.from({ length: 3 }, (_, i) => i < lives ? '❤️' : '🖤').join('')}</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕ EXIT</button>
      </div>

      {/* Timer bar */}
      <div className="h-1 w-full bg-white/5">
        <div
          className="h-full transition-all duration-1000 ease-linear rounded-r"
          style={{
            width: `${timerPct}%`,
            background: timerPct > 40 ? t.accent : timerPct > 20 ? '#ff8000' : '#ff2626',
            boxShadow: `0 0 10px ${timerPct > 40 ? t.accent : '#ff2626'}40`,
          }}
        />
      </div>

      {/* Game Area */}
      <div className="p-6 min-h-[380px] flex flex-col" style={{ background: `linear-gradient(180deg, ${t.bg}, ${t.bg}dd)` }}>
        {gameOver ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-3xl font-black text-white mb-2">Game Over!</h3>
            <p className="text-4xl font-black mb-1" style={{ color: t.accent }}>{score} pts</p>
            <p className="text-white/40 text-sm mb-6">Level {level} • {correctSentences} sentences</p>
            <div className="flex gap-3">
              <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
              <button onClick={onClose} className="btn-elite btn-elite-ghost text-sm">Exit</button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-white/30 text-[10px] font-bold tracking-wider text-center mb-2">BUILD THE SENTENCE</p>
            <p className="text-white/15 text-[10px] text-center mb-6">⏱ {timeLeft}s • Sentence {correctSentences + 1}</p>

            {/* Built sentence area */}
            <div className="min-h-[60px] border-2 border-dashed border-white/10 rounded-2xl p-3 mb-6 flex flex-wrap gap-2 items-center justify-center"
              style={{ background: selected.length > 0 ? `${t.accent}05` : 'transparent' }}
            >
              {selected.length === 0 && (
                <span className="text-white/15 text-sm">Tap words in order...</span>
              )}
              {selected.map((word, i) => (
                <button
                  key={`sel-${i}`}
                  onClick={() => handleUndoWord(i)}
                  className="px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 animate-pop-in"
                  style={{
                    background: `${t.accent}20`,
                    color: t.accent,
                    border: `1px solid ${t.accent}40`,
                    boxShadow: `0 0 10px ${t.accent}15`,
                    cursor: i === selected.length - 1 ? 'pointer' : 'default',
                    opacity: i === selected.length - 1 ? 1 : 0.7,
                  }}
                >
                  {word}
                </button>
              ))}
              {selected.length === correctWords.length && (
                <span className="text-2xl animate-pop-in ml-2">✅</span>
              )}
            </div>

            {/* Scrambled words */}
            <div className="flex flex-wrap gap-2 justify-center">
              {scrambled.map((word, i) => (
                <button
                  key={`scr-${i}-${word}`}
                  onClick={() => handleWordClick(word, i)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 border border-white/10 hover:border-white/25 ${
                    shakeIdx === i ? 'animate-[shake_0.3s_ease-in-out]' : ''
                  }`}
                  style={{
                    background: shakeIdx === i ? 'rgba(255,38,38,0.15)' : 'rgba(255,255,255,0.04)',
                    boxShadow: shakeIdx === i ? '0 0 15px rgba(255,38,38,0.2)' : 'none',
                  }}
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1 mt-auto pt-6">
              {correctWords.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i < selected.length ? t.accent : 'rgba(255,255,255,0.1)',
                    boxShadow: i < selected.length ? `0 0 6px ${t.accent}60` : 'none',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">
        TAP words in the correct order to build the sentence! Tap the last placed word to undo.
      </div>
    </div>
  );
}

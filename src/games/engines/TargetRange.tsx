import { useEffect, useRef, useState, useCallback } from 'react';
import {
  generateMathQuestion,
  getRandomQuestion,
  type Grade,
  type Question,
} from '../questionBank';

type GameId =
  | 'vocabulary_sniper'
  | 'statistics_paintball'
  | 'spelling_sniper'
  | 'context_clue_hunt';

interface Target {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
}

interface TargetRangeProps {
  gameId: string;
  grade: Grade;
  onClose: () => void;
}

const THEMES: Record<string, { bg: string; targetColor: string; shadow: string }> = {
  vocabulary_sniper: {
    bg: 'linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 50%, #40916c 100%)',
    targetColor: '#2d6a4f',
    shadow: '0 4px 12px rgba(45,106,79,0.6)',
  },
  statistics_paintball: {
    bg: 'linear-gradient(135deg, #e63946 0%, #f4a261 30%, #2a9d8f 70%, #264653 100%)',
    targetColor: '#e76f51',
    shadow: '0 4px 12px rgba(231,111,81,0.6)',
  },
  spelling_sniper: {
    bg: 'linear-gradient(135deg, #3c096c 0%, #5a189a 50%, #7b2cbf 100%)',
    targetColor: '#9d4edd',
    shadow: '0 4px 12px rgba(157,78,221,0.6)',
  },
  context_clue_hunt: {
    bg: 'linear-gradient(135deg, #014f86 0%, #2c7da0 50%, #468faf 100%)',
    targetColor: '#61a5c2',
    shadow: '0 4px 12px rgba(97,165,194,0.6)',
  },
  default: {
    bg: 'linear-gradient(135deg, #1e3a5f 0%, #3a7ca5 50%, #2c5282 100%)',
    targetColor: '#4d96ff',
    shadow: '0 4px 12px rgba(77,150,255,0.6)',
  },
};

function getSubject(gameId: string): 'math' | 'vocabulary' {
  const map: Record<string, 'math' | 'vocabulary'> = {
    vocabulary_sniper: 'vocabulary',
    statistics_paintball: 'math',
    spelling_sniper: 'vocabulary',
    context_clue_hunt: 'vocabulary',
  };
  return map[gameId] ?? 'vocabulary';
}

function getNextQuestion(grade: Grade, gameId: string): Question {
  const subject = getSubject(gameId);
  return subject === 'math'
    ? generateMathQuestion(grade)
    : getRandomQuestion(grade, subject);
}

export function TargetRange({ gameId, grade, onClose }: TargetRangeProps) {
  const theme = THEMES[gameId as GameId] ?? THEMES.default;
  const areaRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [splat, setSplat] = useState<{ x: number; y: number; correct: boolean } | null>(null);
  const [flashRed, setFlashRed] = useState(false);
  const [, setCorrectCount] = useState(0);

  const spawnTargets = useCallback(() => {
    const q = getNextQuestion(grade, gameId);
    setQuestion(q);
    const opts = [...q.options];
    const baseSpeed = 0.8 + level * 0.25;
    setTargets(
      opts.map((text, i) => ({
        id: i,
        text,
        x: 20 + Math.random() * 60,
        y: 25 + Math.random() * 50,
        vx: (Math.random() - 0.5) * baseSpeed * 2,
        vy: (Math.random() - 0.5) * baseSpeed * 2,
      }))
    );
  }, [grade, gameId, level]);

  useEffect(() => {
    spawnTargets();
  }, [spawnTargets]);

  useEffect(() => {
    if (!areaRef.current) return;
    const area = areaRef.current;
    const tw = 80;
    const th = 60;

    const tick = () => {
      const w = area.offsetWidth || 400;
      const h = area.offsetHeight || 280;
      const pw = w > 0 ? ((w - tw) / w) * 100 : 85;
      const ph = h > 0 ? ((h - th) / h) * 100 : 80;

      setTargets((prev) =>
        prev.map((t) => {
          let nx = t.x + t.vx;
          let ny = t.y + t.vy;
          let nvx = t.vx;
          let nvy = t.vy;
          if (nx < 0 || nx > pw) nvx = -nvx;
          if (ny < 0 || ny > ph) nvy = -nvy;
          nx = Math.max(0, Math.min(pw, nx));
          ny = Math.max(0, Math.min(ph, ny));
          return { ...t, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    };
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
  }, [targets.length]);

  const handleTargetClick = (text: string) => {
    if (!question) return;
    const correct = text === question.answer;

    if (correct) {
      setScore((s) => s + 10 * level);
      setCorrectCount((c) => {
        const newCorrect = c + 1;
        if (newCorrect >= 4) {
          setLevel((l) => l + 1);
          return 0;
        }
        return newCorrect;
      });
      setSplat({ x: 50, y: 50, correct: true });
      setTimeout(() => {
        setSplat(null);
        spawnTargets();
      }, 400);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setFlashRed(true);
      setTimeout(() => setFlashRed(false), 300);
      setSplat({ x: 50, y: 50, correct: false });
      setTimeout(() => setSplat(null), 400);
      if (newLives <= 0) {
        setTimeout(onClose, 800);
      } else {
        setTimeout(spawnTargets, 500);
      }
    }
  };

  if (lives <= 0) return null;
  if (!question) return null;

  return (
    <div
      className="game-card"
      style={{
        background: theme.bg,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 420,
      }}
    >
      {flashRed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '6px solid rgba(255,0,0,0.6)',
            pointerEvents: 'none',
            animation: 'pulse 0.3s ease-out',
          }}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '8px 8px 0 0',
        }}
      >
        <span style={{ color: '#fff', fontWeight: 600 }}>Score: {score}</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>Level {level}</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>
          Lives: {'❤️'.repeat(lives)}
        </span>
        <button
          onClick={onClose}
          style={{
            padding: '4px 12px',
            background: '#e63946',
            border: 'none',
            borderRadius: 6,
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Exit
        </button>
      </div>

      <p
        style={{
          textAlign: 'center',
          padding: '12px 16px',
          margin: 0,
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
      >
        {question.text}
      </p>

      <div
        ref={areaRef}
        style={{
          position: 'relative',
          flex: 1,
          height: 280,
          margin: '0 12px',
        }}
      >
        {targets.map((t) => (
          <div
            key={t.id}
            onClick={() => handleTargetClick(t.text)}
            style={{
              position: 'absolute',
              left: `${t.x}%`,
              top: `${t.y}%`,
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: theme.targetColor,
              boxShadow: theme.shadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              textAlign: 'center',
              padding: 6,
              transition: 'transform 0.1s',
              userSelect: 'none',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = '')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
          >
            {t.text}
          </div>
        ))}

        {splat && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: splat.correct
                ? 'radial-gradient(circle, rgba(0,255,100,0.8) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'splat 0.4s ease-out',
            }}
          />
        )}
      </div>

      <p
        style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.8)',
          fontSize: '0.85rem',
          marginTop: 8,
        }}
      >
        Click the target with the correct answer!
      </p>

      <style>{`
        @keyframes splat {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        @keyframes pulse {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

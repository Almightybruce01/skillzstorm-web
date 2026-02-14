/* ═══════════════════════════════════════════════════════════
   SPACE SHOOTER ENGINE
   Used by: AstroMath Wars, Multiplication Meteors, Algebra Blaster, Geometry Defender
   Player ship at bottom, asteroids fall with answers, shoot correct one
   ═══════════════════════════════════════════════════════════ */
import { useRef, useEffect, useState, useCallback } from 'react';
import { generateMathQuestion, type Grade, type Question } from '../questionBank';
import { sfxShoot, sfxExplosion, sfxWrong, sfxGameOver, sfxLevelUp } from '../SoundEngine';

interface Theme {
  name: string;
  bg1: string; bg2: string;
  shipColor: string; bulletColor: string;
  asteroidColor: string; starColor: string;
  accentColor: string;
}

const themes: Record<string, Theme> = {
  astromath_wars: { name: 'AstroMath Wars', bg1: '#020024', bg2: '#0a0a2e', shipColor: '#0099ff', bulletColor: '#00e6e6', asteroidColor: '#ff4400', starColor: '#ffffff', accentColor: '#0099ff' },
  multiplication_meteors: { name: 'Meteor Field', bg1: '#1a000a', bg2: '#0d001a', shipColor: '#ff3399', bulletColor: '#ff66bb', asteroidColor: '#ff8000', starColor: '#ffccee', accentColor: '#ff3399' },
  algebra_blaster: { name: 'Algebra Void', bg1: '#001a00', bg2: '#000d1a', shipColor: '#00ff80', bulletColor: '#66ffaa', asteroidColor: '#9933ff', starColor: '#ccffcc', accentColor: '#00ff80' },
  geometry_defender: { name: 'Geometry Space', bg1: '#0d0d1f', bg2: '#1a0033', shipColor: '#ffe600', bulletColor: '#ffff66', asteroidColor: '#0099ff', starColor: '#ffffcc', accentColor: '#ffe600' },
  default: { name: 'Deep Space', bg1: '#020024', bg2: '#0a0a2e', shipColor: '#0099ff', bulletColor: '#00e6e6', asteroidColor: '#ff4400', starColor: '#ffffff', accentColor: '#0099ff' },
};

interface Asteroid {
  x: number; y: number; vx: number; vy: number;
  radius: number; text: string; isCorrect: boolean; rotation: number;
}
interface Bullet { x: number; y: number; }
interface Star { x: number; y: number; size: number; speed: number; brightness: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number; }

export function SpaceShooter({ gameId, grade, onClose }: { gameId: string; grade: Grade; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = themes[gameId] || themes.default;
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [paused] = useState(false);
  const stateRef = useRef({ score: 0, lives: 3, level: 1, gameOver: false, paused: false });

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width = canvas.offsetWidth * 2;
    const H = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(1, 1);

    let shipX = W / 2;
    const shipY = H - 80;
    const shipW = 40, shipH = 50;
    let bullets: Bullet[] = [];
    let asteroids: Asteroid[] = [];
    let stars: Star[] = [];
    let particles: Particle[] = [];
    let question: Question = generateMathQuestion(grade);
    let frameCount = 0;
    let keys: Record<string, boolean> = {};
    let mouseX = W / 2;
    const st = stateRef.current;

    // Generate stars
    for (let i = 0; i < 120; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H, size: Math.random() * 2 + 0.5, speed: Math.random() * 1.5 + 0.3, brightness: Math.random() * 0.6 + 0.4 });
    }

    function spawnAsteroids() {
      asteroids = [];
      question = generateMathQuestion(grade);
      const opts = question.options;
      const spacing = W / (opts.length + 1);
      opts.forEach((opt, i) => {
        asteroids.push({
          x: spacing * (i + 1) + (Math.random() - 0.5) * 40,
          y: -60 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 1 + Math.random() * 0.8 + st.level * 0.15,
          radius: 30 + Math.random() * 10,
          text: opt,
          isCorrect: opt === question.answer,
          rotation: Math.random() * Math.PI * 2,
        });
      });
    }
    spawnAsteroids();

    function addParticles(x: number, y: number, color: string, count: number) {
      for (let i = 0; i < count; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 30 + Math.random() * 20,
          color,
          size: 2 + Math.random() * 4,
        });
      }
    }

    // Input
    const onKeyDown = (e: KeyboardEvent) => { keys[e.key] = true; if (e.key === ' ') shoot(); };
    const onKeyUp = (e: KeyboardEvent) => { keys[e.key] = false; };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * W;
    };
    const onClick = () => shoot();
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.touches[0].clientX - rect.left) / rect.width) * W;
      shoot();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouch, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.touches[0].clientX - rect.left) / rect.width) * W;
    }, { passive: false });

    function shoot() {
      if (st.gameOver || st.paused) return;
      bullets.push({ x: shipX, y: shipY - shipH / 2 });
      sfxShoot();
    }

    function update() {
      if (st.gameOver || st.paused) return;
      frameCount++;

      // Move ship toward mouse/touch
      const dx = mouseX - shipX;
      shipX += dx * 0.12;
      if (keys['ArrowLeft'] || keys['a']) shipX -= 8;
      if (keys['ArrowRight'] || keys['d']) shipX += 8;
      shipX = Math.max(shipW, Math.min(W - shipW, shipX));

      // Stars
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      });

      // Bullets
      bullets = bullets.filter(b => {
        b.y -= 12;
        return b.y > -10;
      });

      // Asteroids
      let needRespawn = false;
      asteroids.forEach(a => {
        a.x += a.vx;
        a.y += a.vy;
        a.rotation += 0.02;
        if (a.x < -50 || a.x > W + 50) a.vx *= -1;

        // Check bullet collision
        bullets = bullets.filter(b => {
          const dist = Math.hypot(b.x - a.x, b.y - a.y);
          if (dist < a.radius + 8) {
            if (a.isCorrect) {
              st.score += 10 * st.level;
              setScore(st.score);
              addParticles(a.x, a.y, theme.accentColor, 20);
              sfxExplosion();
              if (st.score % 50 < 10) { st.level++; setLevel(st.level); sfxLevelUp(); }
              needRespawn = true;
            } else {
              st.lives--;
              setLives(st.lives);
              addParticles(a.x, a.y, '#ff2626', 15);
              sfxWrong();
              if (st.lives <= 0) { st.gameOver = true; setGameOver(true); sfxGameOver(); }
              needRespawn = true;
            }
            a.y = H + 200; // remove
            return false;
          }
          return true;
        });

        // Asteroid reaches bottom
        if (a.y > H + a.radius) {
          if (a.isCorrect) {
            st.lives--;
            setLives(st.lives);
            if (st.lives <= 0) { st.gameOver = true; setGameOver(true); sfxGameOver(); }
          }
          needRespawn = true;
        }
      });

      if (needRespawn && !st.gameOver) {
        setTimeout(() => { if (!st.gameOver) spawnAsteroids(); }, 500);
        asteroids = [];
      }

      // Particles
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.vx *= 0.96;
        p.vy *= 0.96;
        return p.life > 0;
      });
    }

    function draw() {
      if (!ctx) return;
      // Background gradient
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, theme.bg1);
      grd.addColorStop(1, theme.bg2);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        ctx.fillStyle = `rgba(255,255,255,${s.brightness * (0.5 + 0.5 * Math.sin(frameCount * 0.02 + s.x))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Question text
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(question.text + ' = ?', W / 2, 50);

      // Asteroids
      asteroids.forEach(a => {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rotation);

        // Glow
        ctx.shadowColor = a.isCorrect ? theme.accentColor : theme.asteroidColor;
        ctx.shadowBlur = 20;

        // Rock shape
        ctx.fillStyle = a.isCorrect ? theme.asteroidColor : theme.asteroidColor;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const r = a.radius * (0.8 + 0.2 * Math.sin(i * 2.5));
          ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        // Text on asteroid
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.min(18, a.radius * 0.5)}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.rotate(-a.rotation);
        ctx.fillText(a.text, 0, 0);
        ctx.restore();
      });

      // Bullets
      bullets.forEach(b => {
        ctx.fillStyle = theme.bulletColor;
        ctx.shadowColor = theme.bulletColor;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
        // Trail
        ctx.fillStyle = `${theme.bulletColor}40`;
        ctx.beginPath();
        ctx.arc(b.x, b.y + 8, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Ship
      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.shadowColor = theme.shipColor;
      ctx.shadowBlur = 15;
      ctx.fillStyle = theme.shipColor;
      ctx.beginPath();
      ctx.moveTo(0, -shipH / 2);
      ctx.lineTo(-shipW / 2, shipH / 2);
      ctx.lineTo(-shipW / 4, shipH / 3);
      ctx.lineTo(shipW / 4, shipH / 3);
      ctx.lineTo(shipW / 2, shipH / 2);
      ctx.closePath();
      ctx.fill();
      // Engine glow
      ctx.fillStyle = `${theme.bulletColor}${Math.floor(128 + 127 * Math.sin(frameCount * 0.2)).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(0, shipH / 3, 6 + Math.sin(frameCount * 0.3) * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      // Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life / 50;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.life / 50), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    let animId: number;
    function loop() {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [grade, gameId, theme]);

  useEffect(() => {
    stateRef.current = { score, lives, level, gameOver, paused };
  }, [score, lives, level, gameOver, paused]);

  useEffect(() => {
    if (gameOver) return;
    const cleanup = gameLoop();
    return cleanup;
  }, [gameLoop, gameOver]);

  const restart = () => {
    setScore(0); setLives(3); setLevel(1); setGameOver(false);
    stateRef.current = { score: 0, lives: 3, level: 1, gameOver: false, paused: false };
  };

  return (
    <div className="game-card !p-0 overflow-hidden animate-pop-in" style={{ border: `1px solid ${theme.accentColor}30` }}>
      {/* HUD */}
      <div className="flex items-center justify-between p-3 border-b border-white/5" style={{ background: `${theme.accentColor}08` }}>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black" style={{ color: theme.accentColor }}>SCORE {score}</span>
          <span className="text-xs font-bold text-white/40">LVL {level}</span>
          <span className="text-xs">{Array.from({ length: 3 }, (_, i) => i < lives ? '❤️' : '🖤').join('')}</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕ EXIT</button>
      </div>

      {/* Canvas */}
      <div className="relative" style={{ height: '500px' }}>
        {gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ background: `${theme.bg1}ee` }}>
            <div className="text-6xl mb-4">💥</div>
            <h3 className="text-3xl font-black text-white mb-2">Game Over!</h3>
            <p className="text-4xl font-black mb-1" style={{ color: theme.accentColor }}>{score} pts</p>
            <p className="text-white/40 text-sm mb-6">Level {level}</p>
            <div className="flex gap-3">
              <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
              <button onClick={onClose} className="btn-elite btn-elite-ghost text-sm">Exit</button>
            </div>
          </div>
        ) : null}
        <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" style={{ imageRendering: 'auto' }} />
      </div>

      {/* Controls hint */}
      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">
        MOVE: Mouse/Touch/Arrow Keys • SHOOT: Click/Tap/Space • Hit the correct answer!
      </div>
    </div>
  );
}

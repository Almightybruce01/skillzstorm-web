/* ═══════════════════════════════════════════════════════════
   DASH RUNNER ENGINE
   Used by: SkillDash, Bull Run, Equation Escape, etc.
   Auto-scrolling runner — jump obstacles, answer gates between levels
   ═══════════════════════════════════════════════════════════ */
import { useRef, useEffect, useState, useCallback } from 'react';
import { generateMathQuestion, type Grade } from '../questionBank';

interface Theme {
  name: string; bg: string; ground: string; player: string;
  obstacle: string; coin: string; accent: string; sky: string;
}

const themes: Record<string, Theme> = {
  skilldash: { name: 'SkillDash', bg: '#0d0d2b', ground: '#1a1a4d', player: '#0099ff', obstacle: '#ff2626', coin: '#ffe600', accent: '#0099ff', sky: '#060618' },
  bull_run_logic: { name: 'Bull Run', bg: '#1a0a00', ground: '#3d1a00', player: '#ff8000', obstacle: '#ff2626', coin: '#ffe600', accent: '#ff8000', sky: '#0d0500' },
  equation_escape: { name: 'Equation Escape', bg: '#001a0d', ground: '#003d1a', player: '#00ff80', obstacle: '#9933ff', coin: '#00e6e6', accent: '#00ff80', sky: '#000d06' },
  sentence_sprint: { name: 'Sentence Sprint', bg: '#0d001a', ground: '#260040', player: '#9933ff', obstacle: '#ff3399', coin: '#ffe600', accent: '#9933ff', sky: '#060010' },
  default: { name: 'Storm Dash', bg: '#0d0d2b', ground: '#1a1a4d', player: '#0099ff', obstacle: '#ff2626', coin: '#ffe600', accent: '#0099ff', sky: '#060618' },
};

export function DashRunner({ gameId, grade, onClose }: { gameId: string; grade: Grade; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = themes[gameId] || themes.default;
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gateActive, setGateActive] = useState(false);
  const [gateQ, setGateQ] = useState(generateMathQuestion(grade));
  const stateRef = useRef({ score: 0, lives: 3, level: 1, gameOver: false, distance: 0, gateActive: false });

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width = canvas.offsetWidth * 2;
    const H = canvas.height = canvas.offsetHeight * 2;

    const GROUND_Y = H * 0.75;
    let playerY = GROUND_Y;
    let playerVY = 0;
    let isJumping = false;
    const playerX = W * 0.2;
    const playerSize = 30;
    let speed = 5;
    let distance = 0;
    let frame = 0;
    const st = stateRef.current;

    interface Obstacle { x: number; w: number; h: number; type: 'spike' | 'wall' | 'gap'; }
    interface Coin { x: number; y: number; collected: boolean; }
    interface BgElement { x: number; y: number; h: number; w: number; color: string; }
    let obstacles: Obstacle[] = [];
    let coins: Coin[] = [];
    let bgElements: BgElement[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];

    // Generate background buildings/mountains
    for (let i = 0; i < 30; i++) {
      bgElements.push({
        x: Math.random() * W * 3,
        y: GROUND_Y,
        h: 40 + Math.random() * 120,
        w: 20 + Math.random() * 50,
        color: `rgba(255,255,255,${0.01 + Math.random() * 0.03})`,
      });
    }

    function spawnObstacle() {
      const type = ['spike', 'wall', 'spike'][Math.floor(Math.random() * 3)] as 'spike' | 'wall';
      const h = type === 'spike' ? 30 + Math.random() * 20 : 50 + Math.random() * 30;
      obstacles.push({ x: W + 50, w: 20 + Math.random() * 15, h, type });
      // Coin above obstacle
      if (Math.random() > 0.4) {
        coins.push({ x: W + 50, y: GROUND_Y - h - 40 - Math.random() * 30, collected: false });
      }
    }

    function jump() {
      if (!isJumping && !st.gameOver && !st.gateActive) {
        isJumping = true;
        playerVY = -18;
      }
    }

    const onKey = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { e.preventDefault(); jump(); } };
    const onTap = (e: MouseEvent | TouchEvent) => { e.preventDefault(); jump(); };
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('click', onTap);
    canvas.addEventListener('touchstart', onTap, { passive: false });

    function update() {
      if (st.gameOver || st.gateActive) return;
      frame++;
      speed = 5 + st.level * 0.8;
      distance += speed;
      st.distance = distance;

      // Player physics
      playerVY += 1.2; // gravity
      playerY += playerVY;
      if (playerY >= GROUND_Y) {
        playerY = GROUND_Y;
        playerVY = 0;
        isJumping = false;
      }

      // Spawn obstacles
      if (frame % Math.max(40, 80 - st.level * 5) === 0) spawnObstacle();

      // Move obstacles
      obstacles = obstacles.filter(o => {
        o.x -= speed;
        // Collision
        if (o.x < playerX + playerSize && o.x + o.w > playerX - playerSize) {
          if (playerY > GROUND_Y - o.h) {
            st.lives--;
            setLives(st.lives);
            for (let i = 0; i < 10; i++) particles.push({ x: playerX, y: playerY, vx: (Math.random() - 0.5) * 8, vy: -Math.random() * 6, life: 20, color: '#ff2626' });
            if (st.lives <= 0) { st.gameOver = true; setGameOver(true); }
            return false;
          }
        }
        return o.x > -60;
      });

      // Coins
      coins = coins.filter(c => {
        c.x -= speed;
        if (!c.collected && Math.hypot(c.x - playerX, c.y - playerY) < 25) {
          c.collected = true;
          st.score += 5;
          setScore(st.score);
          for (let i = 0; i < 8; i++) particles.push({ x: c.x, y: c.y, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, life: 15, color: theme.coin });
          return false;
        }
        return c.x > -20;
      });

      // BG elements scroll
      bgElements.forEach(b => {
        b.x -= speed * 0.3;
        if (b.x < -b.w) b.x += W * 3;
      });

      // Particles
      particles = particles.filter(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life--; return p.life > 0; });

      // Knowledge Gate every 500 distance
      if (distance > 0 && Math.floor(distance) % 500 < speed && distance > 200) {
        st.gateActive = true;
        setGateActive(true);
        const q = generateMathQuestion(grade);
        setGateQ(q);
      }
    }

    function draw() {
      if (!ctx) return;
      // Sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, theme.sky);
      sky.addColorStop(1, theme.bg);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (let i = 0; i < 50; i++) {
        const sx = (i * 137 + frame * 0.1) % W;
        const sy = (i * 97) % (GROUND_Y - 50);
        ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.3 * Math.sin(frame * 0.01 + i)})`;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // BG elements (buildings/mountains)
      bgElements.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y - b.h, b.w, b.h);
      });

      // Ground
      ctx.fillStyle = theme.ground;
      ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
      // Ground line
      ctx.strokeStyle = `${theme.accent}30`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(W, GROUND_Y);
      ctx.stroke();
      // Ground pattern (scrolling dashes)
      ctx.strokeStyle = `${theme.accent}10`;
      for (let x = -speed * frame % 40; x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, GROUND_Y + 10);
        ctx.lineTo(x + 20, GROUND_Y + 10);
        ctx.stroke();
      }

      // Obstacles
      obstacles.forEach(o => {
        ctx.fillStyle = theme.obstacle;
        ctx.shadowColor = theme.obstacle;
        ctx.shadowBlur = 10;
        if (o.type === 'spike') {
          ctx.beginPath();
          ctx.moveTo(o.x, GROUND_Y);
          ctx.lineTo(o.x + o.w / 2, GROUND_Y - o.h);
          ctx.lineTo(o.x + o.w, GROUND_Y);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h);
        }
        ctx.shadowBlur = 0;
      });

      // Coins
      coins.forEach(c => {
        if (c.collected) return;
        ctx.fillStyle = theme.coin;
        ctx.shadowColor = theme.coin;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `${theme.coin}60`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Player
      ctx.save();
      ctx.translate(playerX, playerY);
      ctx.shadowColor = theme.player;
      ctx.shadowBlur = 15;
      // Body
      ctx.fillStyle = theme.player;
      ctx.fillRect(-playerSize / 2, -playerSize, playerSize, playerSize);
      // Eye
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(playerSize / 4 - 4, -playerSize + 6, 8, 8);
      ctx.fillStyle = '#000';
      ctx.fillRect(playerSize / 4 - 1, -playerSize + 9, 4, 4);
      // Running legs animation
      if (!isJumping) {
        const legOffset = Math.sin(frame * 0.3) * 6;
        ctx.fillStyle = theme.player;
        ctx.fillRect(-6, 0, 6, 4 + legOffset);
        ctx.fillRect(4, 0, 6, 4 - legOffset);
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // Trail particles behind player
      if (frame % 3 === 0 && !st.gateActive) {
        particles.push({ x: playerX - playerSize / 2, y: playerY - 5, vx: -2 - Math.random() * 2, vy: (Math.random() - 0.5) * 2, life: 12, color: `${theme.player}60` });
      }

      // Particles
      particles.forEach(p => {
        ctx.globalAlpha = p.life / 20;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * (p.life / 20), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Distance counter
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.floor(distance)}m`, W - 20, 30);
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
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('click', onTap);
    };
  }, [grade, gameId, theme, gameOver]);

  useEffect(() => {
    stateRef.current = { ...stateRef.current, score, lives, level, gameOver, gateActive };
  }, [score, lives, level, gameOver, gateActive]);

  useEffect(() => {
    if (gameOver || gateActive) return;
    const cleanup = startGame();
    return cleanup;
  }, [startGame, gameOver, gateActive]);

  const handleGateAnswer = (opt: string) => {
    if (opt === gateQ.answer) {
      stateRef.current.score += 20;
      stateRef.current.level++;
      setScore(stateRef.current.score);
      setLevel(stateRef.current.level);
    } else {
      stateRef.current.lives--;
      setLives(stateRef.current.lives);
      if (stateRef.current.lives <= 0) {
        stateRef.current.gameOver = true;
        setGameOver(true);
      }
    }
    stateRef.current.gateActive = false;
    setGateActive(false);
  };

  const restart = () => {
    setScore(0); setLives(3); setLevel(1); setGameOver(false); setGateActive(false);
    stateRef.current = { score: 0, lives: 3, level: 1, gameOver: false, distance: 0, gateActive: false };
  };

  return (
    <div className="game-card !p-0 overflow-hidden animate-pop-in" style={{ border: `1px solid ${theme.accent}30` }}>
      <div className="flex items-center justify-between p-3 border-b border-white/5" style={{ background: `${theme.accent}08` }}>
        <div className="flex items-center gap-4">
          <span className="text-xs font-black" style={{ color: theme.accent }}>SCORE {score}</span>
          <span className="text-xs font-bold text-white/40">LVL {level}</span>
          <span className="text-xs">{Array.from({ length: 3 }, (_, i) => i < lives ? '❤️' : '🖤').join('')}</span>
        </div>
        <button onClick={onClose} className="text-white/30 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-all">✕ EXIT</button>
      </div>

      <div className="relative" style={{ height: '420px' }}>
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20" style={{ background: `${theme.bg}ee` }}>
            <div className="text-6xl mb-4">💥</div>
            <h3 className="text-3xl font-black text-white mb-2">Game Over!</h3>
            <p className="text-4xl font-black mb-1" style={{ color: theme.accent }}>{score} pts</p>
            <p className="text-white/40 text-sm mb-6">Level {level} • {Math.floor(stateRef.current.distance)}m</p>
            <div className="flex gap-3">
              <button onClick={restart} className="btn-elite btn-elite-primary text-sm">Play Again</button>
              <button onClick={onClose} className="btn-elite btn-elite-ghost text-sm">Exit</button>
            </div>
          </div>
        )}
        {gateActive && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6" style={{ background: `${theme.bg}f0` }}>
            <div className="text-4xl mb-2 animate-pop-in">🔒</div>
            <h3 className="text-xl font-black text-white mb-1">KNOWLEDGE GATE</h3>
            <p className="text-white/30 text-xs mb-6">Answer to continue running!</p>
            <p className="text-3xl font-black text-white mb-6">{gateQ.text} = ?</p>
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {gateQ.options.map((opt, i) => (
                <button key={i} onClick={() => handleGateAnswer(opt)} className="py-3 rounded-xl font-black text-white border border-white/10 hover:border-white/30 transition-all active:scale-95" style={{ background: `${theme.accent}15` }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="p-2 text-center text-white/20 text-[10px] border-t border-white/5">
        JUMP: Tap / Click / Space / ↑ • Dodge obstacles • Collect coins • Answer Knowledge Gates!
      </div>
    </div>
  );
}

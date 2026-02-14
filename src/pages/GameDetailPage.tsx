import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allGames, gradeLevels, type GradeLevel } from '../engine/gameData';
import { InArticleAd } from '../components/ads/AdBanner';
import { GameLauncher } from '../games/GameLauncher';
import type { Grade } from '../games/questionBank';

const catColorMap: Record<string, string> = {
  StormBattle: '#0099ff', StormDash: '#00ff80', StormPuzzle: '#ffe600',
  StormQuick: '#ff3399', Storm3D: '#9933ff', StormVR: '#00e6e6',
};

export function GameDetailPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = allGames.find(g => g.id === gameId);
  const [playing, setPlaying] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);

  if (!game) {
    return (
      <div className="pt-24 sm:pt-28 min-h-[100vh] w-full flex flex-col items-center justify-center text-center">
        <div className="text-7xl mb-4 animate-float">🔍</div>
        <h1 className="text-3xl font-black text-white mb-3">Game Not Found</h1>
        <Link to="/games" className="btn-elite btn-elite-primary text-sm">← Back to Games</Link>
      </div>
    );
  }

  const accent = catColorMap[game.category] || '#0099ff';
  const gradeColors = game.supportedGrades.map(g => gradeLevels.find(gl => gl.value === g));
  const playGrade = (selectedGrade || game.supportedGrades[0]) as Grade;

  return (
    <div className="pt-24 sm:pt-28 min-h-[100vh] w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
        </div>
      </div>

      {/* Grade Selector — pick your grade before playing */}
      {!playing && game.isAvailable && (
        <div className="mb-6 animate-slide-up delay-300">
          <p className="text-white/30 text-xs font-bold text-center tracking-wider mb-3">SELECT YOUR GRADE</p>
          <div className="flex flex-wrap justify-center gap-2">
            {game.supportedGrades.map(g => {
              const gc = gradeLevels.find(gl => gl.value === g);
              const isActive = (selectedGrade || game.supportedGrades[0]) === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 border"
                  style={isActive ? {
                    backgroundColor: `${gc?.color}20`,
                    borderColor: `${gc?.color}50`,
                    color: gc?.color,
                    boxShadow: `0 0 15px ${gc?.color}15`,
                  } : {
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderColor: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {gc?.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Play Button or Game */}
      {!playing ? (
        <button
          onClick={() => game.isAvailable && setPlaying(true)}
          className={`w-full py-5 rounded-2xl font-black text-xl text-white mb-10 transition-all duration-300 active:scale-[0.97] relative overflow-hidden animate-slide-up delay-300 ${
            game.isAvailable ? 'cursor-pointer hover:scale-[1.02]' : 'cursor-not-allowed opacity-60'
          }`}
          style={game.isAvailable ? {
            background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            boxShadow: `0 6px 30px ${accent}30`,
          } : { background: '#333' }}
          disabled={!game.isAvailable}
        >
          {game.isAvailable && <div className="absolute inset-0 rounded-2xl border-2 animate-ping opacity-20" style={{ borderColor: accent }} />}
          <span className="relative z-10 flex items-center justify-center gap-3">
            {game.isAvailable ? (
              <><span className="text-2xl">▶</span> PLAY NOW</>
            ) : (
              <><span className="text-2xl">🔒</span> COMING SOON</>
            )}
          </span>
        </button>
      ) : (
        <div className="mb-10">
          <GameLauncher gameId={game.id} grade={playGrade} onClose={() => setPlaying(false)} />
        </div>
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

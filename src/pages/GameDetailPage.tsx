import { useParams, Link } from 'react-router-dom';
import { allGames, gradeLevels } from '../engine/gameData';
import { InArticleAd } from '../components/ads/AdBanner';

export function GameDetailPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = allGames.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="pt-20 min-h-[100vh] w-full flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4 animate-float">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-2">Game Not Found</h1>
        <Link to="/games" className="text-[#0099ff] font-bold hover:underline transition-all">← Back to Games</Link>
      </div>
    );
  }

  const gradeColors = game.supportedGrades.map(g => gradeLevels.find(gl => gl.value === g));

  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Back link */}
      <Link to="/games" className="text-white/40 text-sm hover:text-[#0099ff] transition-all duration-300 mb-6 inline-flex items-center gap-1 group">
        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Back to Games
      </Link>

      {/* Hero */}
      <div className="text-center mb-8 animate-slide-up">
        <div className="relative inline-block">
          {/* Glow behind emoji */}
          <div className="absolute inset-0 blur-3xl bg-[#0099ff]/20 rounded-full scale-150 animate-pulse-slow" />
          <div className="relative text-8xl mb-4 animate-float">{game.iconEmoji}</div>
        </div>
        <h1 className="text-4xl font-black text-white mb-3 animate-slide-up delay-100">{game.name}</h1>
        <div className="flex justify-center gap-2 mb-4 animate-slide-up delay-200 flex-wrap">
          {game.isFeatured && (
            <span className="text-xs font-black bg-gradient-to-r from-[#ff2626] to-[#ff3399] text-white px-4 py-1.5 rounded-lg shadow-[0_0_12px_rgba(255,38,38,0.3)]">
              FEATURED
            </span>
          )}
          <span className="text-xs font-bold bg-white/10 text-white/60 px-4 py-1.5 rounded-lg">{game.category}</span>
          {game.isPremium && <span className="text-xs font-black bg-gradient-to-r from-[#ffe600] to-[#ff8000] text-black px-4 py-1.5 rounded-lg">PREMIUM</span>}
          {!game.isAvailable && <span className="text-xs font-bold bg-gray-600 text-white px-4 py-1.5 rounded-lg">COMING SOON</span>}
        </div>
      </div>

      {/* Play Button */}
      <button
        className={`w-full py-5 rounded-2xl font-bold text-xl text-white mb-8 transition-all duration-300 active:scale-[0.97] btn-shimmer overflow-hidden animate-slide-up delay-300 ${
          game.isAvailable
            ? 'gradient-hero shadow-lg shadow-[#0099ff]/25 hover:shadow-[#0099ff]/40 hover:scale-[1.02]'
            : 'bg-gray-700 cursor-not-allowed'
        }`}
        disabled={!game.isAvailable}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {game.isAvailable ? (
            <>
              <span className="text-2xl">🎮</span>
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

      {/* Description */}
      <div className="glass-card glass-card-blue p-6 mb-6 animate-slide-up delay-400">
        <h3 className="text-xs font-black text-[#0099ff] tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0099ff] shadow-[0_0_6px_rgba(0,153,255,0.8)]" />
          ABOUT
        </h3>
        <p className="text-white/70 leading-relaxed">{game.description}</p>
      </div>

      {/* Grade Levels */}
      <div className="glass-card glass-card-purple p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.45s' }}>
        <h3 className="text-xs font-black text-[#9933ff] tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9933ff] shadow-[0_0_6px_rgba(153,51,255,0.8)]" />
          GRADE LEVELS
        </h3>
        <div className="flex flex-wrap gap-2">
          {gradeColors.map((gc) => gc && (
            <span 
              key={gc.value} 
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 cursor-default" 
              style={{ 
                backgroundColor: `${gc.color}15`, 
                color: gc.color, 
                border: `1px solid ${gc.color}30`,
                boxShadow: `0 0 0 0 ${gc.color}00`
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.boxShadow = `0 0 12px ${gc.color}20`; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.boxShadow = `0 0 0 0 ${gc.color}00`; }}
            >
              {gc.label} — {gc.subtitle}
            </span>
          ))}
        </div>
      </div>

      {/* Knowledge Gates Info */}
      <div className="glass-card glass-card-fire p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <h3 className="text-xs font-black text-[#ff8000] tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff8000] shadow-[0_0_6px_rgba(255,128,0,0.8)]" />
          KNOWLEDGE GATES
        </h3>
        <div className="space-y-3">
          <GateInfo icon="🔒" title="Checkpoint Gate" desc="Answer 1 question between levels to advance" color="#0099ff" />
          <GateInfo icon="🔥" title="Boss Gate" desc="3 rapid-fire questions at boss levels" color="#ff2626" />
          <GateInfo icon="⚡" title="Speed Gate" desc="Answer in 5 seconds or less" color="#ffe600" />
          <GateInfo icon="⭐" title="Streak Gate" desc="Get 3 correct in a row to pass" color="#9933ff" />
        </div>
      </div>

      {/* Power-ups */}
      <div className="glass-card glass-card-gold p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.55s' }}>
        <h3 className="text-xs font-black text-[#ffe600] tracking-widest mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ffe600] shadow-[0_0_6px_rgba(255,230,0,0.8)]" />
          POWER-UPS
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <PowerUp icon="⏱️" name="Slow Time" color="#0099ff" />
          <PowerUp icon="🛡️" name="Hint Shield" color="#9933ff" />
          <PowerUp icon="⭐" name="2x Points" color="#ffe600" />
          <PowerUp icon="❤️" name="Extra Life" color="#ff2626" />
        </div>
      </div>

      {/* Ad placement */}
      <InArticleAd />

      {/* Download CTA */}
      <div className="glass-card p-8 text-center animate-slide-up btn-shimmer overflow-hidden" style={{ animationDelay: '0.6s', background: 'linear-gradient(135deg, rgba(0,153,255,0.1), rgba(153,51,255,0.1))' }}>
        <h3 className="font-black text-white mb-2 text-lg">Play on Mobile</h3>
        <p className="text-white/50 text-sm mb-5">Download SkillzStorm for iPhone, iPad & Mac</p>
        <div className="flex gap-3 justify-center">
          <button className="bg-white/10 px-6 py-3 rounded-xl font-bold text-sm text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 border border-white/5 hover:border-white/15">
            <span>📱</span> App Store
          </button>
          <button className="bg-white/10 px-6 py-3 rounded-xl font-bold text-sm text-white hover:bg-white/15 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 border border-white/5 hover:border-white/15">
            <span>💻</span> Mac App
          </button>
        </div>
      </div>
    </div>
  );
}

function GateInfo({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all duration-300 group cursor-default">
      <span className="text-xl transition-transform duration-300 group-hover:scale-125">{icon}</span>
      <div>
        <div className="text-white text-sm font-bold group-hover:transition-colors duration-300" style={{ color: 'white' }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = color; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'white'; }}
        >{title}</div>
        <div className="text-white/35 text-xs group-hover:text-white/50 transition-colors">{desc}</div>
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
        <span className="transition-transform duration-300 group-hover:scale-125">{icon}</span>
      </div>
      <div className="text-white/45 text-xs font-semibold group-hover:text-white/70 transition-colors">{name}</div>
    </div>
  );
}

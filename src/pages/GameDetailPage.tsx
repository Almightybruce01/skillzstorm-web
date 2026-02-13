import { useParams, Link } from 'react-router-dom';
import { allGames, gradeLevels } from '../engine/gameData';
import { InArticleAd } from '../components/ads/AdBanner';

export function GameDetailPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = allGames.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="pt-20 min-h-[100vh] w-full flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-white mb-2">Game Not Found</h1>
        <Link to="/games" className="text-[#0099ff] font-bold">← Back to Games</Link>
      </div>
    );
  }

  const gradeColors = game.supportedGrades.map(g => gradeLevels.find(gl => gl.value === g));

  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Back link */}
      <Link to="/games" className="text-white/50 text-sm hover:text-white transition-colors mb-6 inline-block">
        ← Back to Games
      </Link>

      {/* Hero */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-4 animate-float">{game.iconEmoji}</div>
        <h1 className="text-3xl font-black text-white mb-2">{game.name}</h1>
        <div className="flex justify-center gap-2 mb-4">
          {game.isFeatured && <span className="text-xs font-bold bg-[#ff2626] text-white px-3 py-1 rounded-lg">FEATURED</span>}
          <span className="text-xs font-bold bg-white/10 text-white/60 px-3 py-1 rounded-lg">{game.category}</span>
          {game.isPremium && <span className="text-xs font-bold bg-[#ffe600] text-black px-3 py-1 rounded-lg">PREMIUM</span>}
          {!game.isAvailable && <span className="text-xs font-bold bg-gray-600 text-white px-3 py-1 rounded-lg">COMING SOON</span>}
        </div>
      </div>

      {/* Play Button */}
      <button
        className={`w-full py-5 rounded-2xl font-bold text-xl text-white mb-8 transition-all hover:scale-[1.02] animate-pulse-slow ${
          game.isAvailable
            ? 'gradient-hero shadow-lg shadow-[#0099ff]/25'
            : 'bg-gray-700 cursor-not-allowed'
        }`}
        disabled={!game.isAvailable}
      >
        {game.isAvailable ? '🎮 PLAY NOW' : '🔒 COMING SOON'}
      </button>

      {/* Description */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-xs font-bold text-[#0099ff] tracking-wider mb-3">ABOUT</h3>
        <p className="text-white/80 leading-relaxed">{game.description}</p>
      </div>

      {/* Grade Levels */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-xs font-bold text-[#9933ff] tracking-wider mb-3">GRADE LEVELS</h3>
        <div className="flex flex-wrap gap-2">
          {gradeColors.map((gc) => gc && (
            <span key={gc.value} className="px-4 py-2 rounded-xl text-sm font-bold" style={{ backgroundColor: `${gc.color}20`, color: gc.color, border: `1px solid ${gc.color}40` }}>
              {gc.label} — {gc.subtitle}
            </span>
          ))}
        </div>
      </div>

      {/* Knowledge Gates Info */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-xs font-bold text-[#ff8000] tracking-wider mb-3">KNOWLEDGE GATES</h3>
        <div className="space-y-3">
          <GateInfo icon="🔒" title="Checkpoint Gate" desc="Answer 1 question between levels to advance" />
          <GateInfo icon="🔥" title="Boss Gate" desc="3 rapid-fire questions at boss levels" />
          <GateInfo icon="⚡" title="Speed Gate" desc="Answer in 5 seconds or less" />
          <GateInfo icon="⭐" title="Streak Gate" desc="Get 3 correct in a row to pass" />
        </div>
      </div>

      {/* Power-ups */}
      <div className="glass-card p-6 mb-6">
        <h3 className="text-xs font-bold text-[#ffe600] tracking-wider mb-3">POWER-UPS</h3>
        <div className="grid grid-cols-4 gap-4">
          <PowerUp icon="⏱️" name="Slow Time" />
          <PowerUp icon="🛡️" name="Hint Shield" />
          <PowerUp icon="⭐" name="2x Points" />
          <PowerUp icon="❤️" name="Extra Life" />
        </div>
      </div>

      {/* Ad placement */}
      <InArticleAd />

      {/* Download CTA */}
      <div className="glass-card p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.1), rgba(153,51,255,0.1))' }}>
        <h3 className="font-bold text-white mb-2">Play on Mobile</h3>
        <p className="text-white/50 text-sm mb-4">Download SkillzStorm for iPhone, iPad & Mac</p>
        <div className="flex gap-3 justify-center">
          <button className="bg-white/10 px-6 py-3 rounded-xl font-bold text-sm text-white hover:bg-white/15 transition-all">
            📱 App Store
          </button>
          <button className="bg-white/10 px-6 py-3 rounded-xl font-bold text-sm text-white hover:bg-white/15 transition-all">
            💻 Mac App
          </button>
        </div>
      </div>
    </div>
  );
}

function GateInfo({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-white text-sm font-bold">{title}</div>
        <div className="text-white/40 text-xs">{desc}</div>
      </div>
    </div>
  );
}

function PowerUp({ icon, name }: { icon: string; name: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl mx-auto mb-1">{icon}</div>
      <div className="text-white/50 text-xs">{name}</div>
    </div>
  );
}

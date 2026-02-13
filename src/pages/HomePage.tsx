import { Link } from 'react-router-dom';
import { categories, getFeaturedGames, allGames } from '../engine/gameData';
import { InArticleAd, FooterAd } from '../components/ads/AdBanner';

export function HomePage() {
  const featured = getFeaturedGames();

  return (
    <div className="pt-16 min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-[#0099ff]/10 blur-[120px] top-1/4 -left-48 animate-pulse-slow" />
        <div className="absolute w-96 h-96 rounded-full bg-[#9933ff]/10 blur-[120px] top-1/2 -right-48 animate-pulse-slow" />
        <div className="absolute w-96 h-96 rounded-full bg-[#00e6e6]/5 blur-[120px] bottom-0 left-1/3 animate-pulse-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-6xl sm:text-8xl font-black leading-none mb-4">
            <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">SKILLZ</span>
            <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">STORM</span>
          </h1>
          <p className="text-[#00e6e6] font-bold tracking-[0.3em] text-sm mb-8 neon-glow-green">
            PLAY HARD. THINK HARDER.
          </p>
          <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg">
            {allGames.length}+ arcade games. K-12 learning. No login required.
            <br />Fast play. Real skills. Addictive fun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/games"
              className="gradient-hero px-10 py-4 rounded-2xl font-bold text-lg text-white shadow-lg shadow-[#0099ff]/25 hover:shadow-[#0099ff]/40 transition-all hover:scale-105 animate-pulse-slow"
            >
              🎮 PLAY NOW — Free
            </Link>
            <Link
              to="/store"
              className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-bold text-lg text-white hover:bg-white/10 transition-all"
            >
              🛒 Storm Store
            </Link>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="glass-card p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          <StatItem label="Games" value={`${allGames.length}+`} color="text-[#0099ff]" />
          <StatItem label="Grades" value="K–12" color="text-[#00ff80]" />
          <StatItem label="Categories" value="6" color="text-[#9933ff]" />
          <StatItem label="Price" value="Free" color="text-[#ffe600]" />
        </section>

        {/* Featured Games */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">⭐</span>
            <h2 className="text-xl font-bold tracking-wider text-white">FEATURED GAMES</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featured.map((game) => (
              <Link key={game.id} to={`/game/${game.id}`} className="glass-card p-5 hover:border-[#0099ff]/30 transition-all hover:scale-[1.02] group">
                <div className="text-4xl mb-3 text-center group-hover:scale-110 transition-transform">{game.iconEmoji}</div>
                <h3 className="font-bold text-white text-sm text-center mb-1">{game.name}</h3>
                <p className="text-white/40 text-xs text-center line-clamp-2">{game.description}</p>
                <div className="flex justify-center mt-3 gap-1">
                  {game.isFeatured && <span className="text-[10px] font-bold bg-[#ff2626] text-white px-2 py-0.5 rounded-md">HOT</span>}
                  <span className="text-[10px] font-bold bg-white/10 text-white/60 px-2 py-0.5 rounded-md">{game.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad placement between sections */}
        <InArticleAd />

        {/* Game Categories */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-bold tracking-wider text-white">GAME MODES</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                to={`/games/${cat.value}`}
                className="glass-card p-6 text-center hover:border-[#0099ff]/20 transition-all hover:scale-[1.02]"
              >
                <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl"
                     style={{ background: `linear-gradient(135deg, ${cat.colors[0]}, ${cat.colors[1]})` }}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-white mb-1">{cat.label}</h3>
                <p className="text-white/40 text-xs">{cat.subtitle}</p>
                <p className="text-[#0099ff] text-xs mt-2 font-bold">
                  {allGames.filter(g => g.category === cat.value).length} games
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-xl font-bold tracking-wider text-white text-center mb-8">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Step num="01" title="Choose Your Grade" desc="Select K-2, 3-5, 6-8, or 9-12. Difficulty scales automatically." />
            <Step num="02" title="Pick a Game" desc="50+ arcade-style games across 6 categories. Every game is free." />
            <Step num="03" title="Play & Learn" desc="Knowledge Gates test skills between levels. Fun first, learning hidden inside." />
          </div>
        </section>

        {/* Footer Ad */}
        <FooterAd />

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 text-center text-white/30 text-sm">
          <p className="font-bold text-white/50 mb-2">
            <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">SKILLZ</span>
            <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">STORM</span>
            {' '}— Play Hard. Think Harder.
          </p>
          <div className="flex items-center justify-center gap-4 mb-2">
            <Link to="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <span>•</span>
            <span>COPPA Compliant</span>
          </div>
          <p>&copy; 2026 SkillzStorm. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-black ${color}`}>{value}</div>
      <div className="text-white/40 text-xs mt-1">{label}</div>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="glass-card p-6 text-center">
      <div className="text-3xl font-black bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent mb-3">{num}</div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-white/50 text-sm">{desc}</p>
    </div>
  );
}

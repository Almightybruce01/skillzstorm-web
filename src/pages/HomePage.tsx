import { Link } from 'react-router-dom';
import { categories, getFeaturedGames, allGames } from '../engine/gameData';
import { InArticleAd, FooterAd } from '../components/ads/AdBanner';

export function HomePage() {
  const featured = getFeaturedGames();

  return (
    <div className="pt-16 w-full min-h-[100vh] bg-[#0d0d1f]">
      {/* Animated Background — fills entire viewport */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#0099ff]/10 blur-[180px] top-[10%] -left-48 animate-pulse-slow" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#9933ff]/10 blur-[180px] top-[40%] -right-48 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00e6e6]/5 blur-[150px] bottom-[10%] left-1/3 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#ff3399]/5 blur-[120px] top-[60%] left-[10%] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#ffe600]/5 blur-[100px] top-[20%] right-[20%] animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
        
        {/* Floating particles */}
        <div className="absolute w-1 h-1 rounded-full bg-[#0099ff] top-[25%] left-[20%] animate-float opacity-40" style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#9933ff] top-[45%] left-[70%] animate-float opacity-30" style={{ animationDelay: '1s', animationDuration: '5s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-[#00e6e6] top-[65%] left-[40%] animate-float opacity-40" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        <div className="absolute w-2 h-2 rounded-full bg-[#ff3399] top-[15%] left-[80%] animate-float opacity-20" style={{ animationDelay: '0.5s', animationDuration: '6s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-[#ffe600] top-[75%] left-[15%] animate-float opacity-30" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#00ff80] top-[35%] left-[55%] animate-float opacity-25" style={{ animationDelay: '3s', animationDuration: '5.5s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center py-20 sm:py-28">
          {/* Badge */}
          <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#00ff80] animate-glow" />
            <span className="text-white/60 text-xs font-bold tracking-wider">LIVE NOW — FREE TO PLAY</span>
          </div>

          <h1 className="text-7xl sm:text-9xl font-black leading-none mb-5 animate-slide-up delay-100">
            <span className="bg-gradient-to-r from-[#0099ff] via-[#6644ff] to-[#9933ff] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,153,255,0.3)]">SKILLZ</span>
            <span className="bg-gradient-to-r from-[#ff8000] via-[#ff4400] to-[#ff2626] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,128,0,0.3)]">STORM</span>
          </h1>

          <p className="text-[#00e6e6] font-black tracking-[0.4em] text-sm sm:text-base mb-8 neon-glow-cyan animate-slide-up delay-200">
            PLAY HARD. THINK HARDER.
          </p>

          <p className="text-white/50 max-w-xl mx-auto mb-12 text-lg leading-relaxed animate-slide-up delay-300">
            {allGames.length}+ arcade games. K-12 learning. No login required.
            <br />
            <span className="text-white/70 font-semibold">Fast play. Real skills. Addictive fun.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-400">
            <Link
              to="/games"
              className="group relative gradient-hero px-10 py-4 rounded-2xl font-bold text-lg text-white shadow-lg shadow-[#0099ff]/20 hover:shadow-[#0099ff]/40 transition-all duration-300 hover:scale-105 btn-shimmer overflow-hidden active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl group-hover:animate-bounce-in">🎮</span>
                PLAY NOW — Free
              </span>
            </Link>
            <Link
              to="/store"
              className="group bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-bold text-lg text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl group-hover:animate-bounce-in">🛒</span>
                Storm Store
              </span>
            </Link>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="glass-card glass-card-blue p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 animate-slide-up delay-500">
          <StatItem label="Games" value={`${allGames.length}+`} color="text-[#0099ff]" glow="neon-glow-blue" />
          <StatItem label="Grades" value="K–12" color="text-[#00ff80]" glow="neon-glow-green" />
          <StatItem label="Categories" value="6" color="text-[#9933ff]" glow="neon-glow-purple" />
          <StatItem label="Price" value="Free" color="text-[#ffe600]" glow="neon-glow-yellow" />
        </section>

        {/* Featured Games */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl animate-glow">⭐</span>
            <h2 className="text-xl font-black tracking-wider text-white">FEATURED GAMES</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featured.map((game, i) => (
              <Link 
                key={game.id} 
                to={`/game/${game.id}`} 
                className="glass-card glass-card-blue p-5 transition-all duration-300 hover:scale-[1.04] group active:scale-[0.97] btn-shimmer overflow-hidden animate-pop-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-4xl mb-3 text-center transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_12px_rgba(0,153,255,0.4)]">
                  {game.iconEmoji}
                </div>
                <h3 className="font-bold text-white text-sm text-center mb-1 group-hover:text-[#0099ff] transition-colors duration-300">{game.name}</h3>
                <p className="text-white/35 text-xs text-center line-clamp-2 group-hover:text-white/50 transition-colors">{game.description}</p>
                <div className="flex justify-center mt-3 gap-1">
                  {game.isFeatured && (
                    <span className="text-[10px] font-black bg-gradient-to-r from-[#ff2626] to-[#ff3399] text-white px-2 py-0.5 rounded-md shadow-[0_0_8px_rgba(255,38,38,0.3)]">
                      HOT
                    </span>
                  )}
                  <span className="text-[10px] font-bold bg-white/10 text-white/50 px-2 py-0.5 rounded-md group-hover:bg-[#0099ff]/20 group-hover:text-[#0099ff] transition-all">
                    {game.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad placement between sections */}
        <InArticleAd />

        {/* Game Categories */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-black tracking-wider text-white">GAME MODES</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.value}
                to={`/games/${cat.value}`}
                className="glass-card p-6 text-center transition-all duration-300 hover:scale-[1.03] group active:scale-[0.97] btn-shimmer overflow-hidden animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${cat.colors[0]}, ${cat.colors[1]})`,
                    boxShadow: `0 4px 15px ${cat.colors[0]}30`
                  }}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-[#0099ff] transition-colors duration-300">{cat.label}</h3>
                <p className="text-white/35 text-xs group-hover:text-white/50 transition-colors">{cat.subtitle}</p>
                <p className="text-[#0099ff] text-xs mt-3 font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {allGames.filter(g => g.category === cat.value).length} games →
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <h2 className="text-xl font-black tracking-wider text-white">HOW IT WORKS</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Step num="01" title="Choose Your Grade" desc="Select K-2, 3-5, 6-8, or 9-12. Difficulty scales automatically." color="from-[#0099ff] to-[#6644ff]" delay="0s" />
            <Step num="02" title="Pick a Game" desc="50+ arcade-style games across 6 categories. Every game is free." color="from-[#9933ff] to-[#ff3399]" delay="0.15s" />
            <Step num="03" title="Play & Learn" desc="Knowledge Gates test skills between levels. Fun first, learning hidden inside." color="from-[#ff8000] to-[#ff2626]" delay="0.3s" />
          </div>
        </section>

        {/* Subject Tags */}
        <section className="mb-16 text-center">
          <h2 className="text-sm font-bold tracking-widest text-white/30 mb-6">SUBJECTS COVERED</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['Math', 'Algebra', 'Geometry', 'Fractions', 'Vocabulary', 'Grammar', 'Spelling', 'Science', 'Chemistry', 'Physics', 'History', 'Financial Literacy', 'SAT Prep', 'Logic', 'Reading'].map((subj, i) => (
              <span 
                key={subj}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/5 text-white/40 border border-white/5 hover:bg-[#0099ff]/10 hover:text-[#0099ff] hover:border-[#0099ff]/20 transition-all duration-300 cursor-default animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {subj}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Ad */}
        <FooterAd />

        {/* Footer */}
        <footer className="border-t border-white/5 py-10 text-center">
          <p className="font-black text-lg mb-3">
            <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">SKILLZ</span>
            <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">STORM</span>
            <span className="text-white/40 font-normal text-sm"> — Play Hard. Think Harder.</span>
          </p>
          <div className="flex items-center justify-center gap-4 mb-3 text-sm">
            <Link to="/privacy" className="text-white/30 hover:text-[#0099ff] transition-colors duration-300">Privacy Policy</Link>
            <span className="text-white/10">•</span>
            <Link to="/terms" className="text-white/30 hover:text-[#0099ff] transition-colors duration-300">Terms of Service</Link>
            <span className="text-white/10">•</span>
            <span className="text-white/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff80] inline-block" />
              COPPA Compliant
            </span>
          </div>
          <p className="text-white/20 text-xs">&copy; 2026 SkillzStorm. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function StatItem({ label, value, color, glow }: { label: string; value: string; color: string; glow: string }) {
  return (
    <div className="text-center group cursor-default">
      <div className={`text-3xl font-black ${color} ${glow} transition-all duration-300 group-hover:scale-110`}>{value}</div>
      <div className="text-white/40 text-xs mt-1 font-semibold tracking-wider group-hover:text-white/60 transition-colors">{label}</div>
    </div>
  );
}

function Step({ num, title, desc, color, delay }: { num: string; title: string; desc: string; color: string; delay: string }) {
  return (
    <div className="glass-card p-7 text-center group hover:scale-[1.02] transition-all duration-300 active:scale-[0.98] animate-slide-up" style={{ animationDelay: delay }}>
      <div className={`text-4xl font-black bg-gradient-to-br ${color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}>
        {num}
      </div>
      <h3 className="font-bold text-white mb-2 text-lg">{title}</h3>
      <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

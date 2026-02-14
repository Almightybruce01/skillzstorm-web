/* ═══════════════════════════════════════════════════════════
   ARCADE PAGE — Friv-style non-educational game grid
   Colorful tiles, instant play, classic games
   ═══════════════════════════════════════════════════════════ */
import { useState } from 'react';
import { arcadeGames, arcadeTags, type ArcadeGame } from '../games/arcade/arcadeData';
import { ArcadeLauncher } from '../games/arcade/ArcadeLauncher';
import { initAudio, startMusic, stopMusic } from '../games/SoundEngine';

export function ArcadePage() {
  const [activeGame, setActiveGame] = useState<ArcadeGame | null>(null);
  const [filter, setFilter] = useState('all');
  const [musicOn, setMusicOn] = useState(false);

  const filtered = filter === 'all'
    ? arcadeGames
    : arcadeGames.filter(g => g.tags.includes(filter));

  const playGame = (game: ArcadeGame) => {
    initAudio();
    setActiveGame(game);
  };

  const closeGame = () => {
    setActiveGame(null);
    stopMusic();
    setMusicOn(false);
  };

  const toggleBgMusic = () => {
    initAudio();
    if (musicOn) { stopMusic(); setMusicOn(false); }
    else { startMusic(); setMusicOn(true); }
  };

  return (
    <div className="pt-24 sm:pt-28 min-h-[100vh] w-full">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* Playing a game */}
        {activeGame ? (
          <div className="animate-pop-in">
            <button onClick={closeGame} className="text-white/30 text-sm hover:text-white/60 transition-all mb-4 inline-flex items-center gap-2 group">
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              Back to Arcade
            </button>
            <div className="max-w-2xl mx-auto">
              <ArcadeLauncher gameId={activeGame.id} onClose={closeGame} />
            </div>
          </div>
        ) : (
          <>
            {/* Hero */}
            <div className="text-center mb-10 animate-slide-up">
              <div className="text-6xl sm:text-8xl mb-4 animate-float">🕹️</div>
              <h1 className="text-5xl sm:text-7xl font-black mb-3">
                <span className="bg-gradient-to-r from-[#ff3399] via-[#ffe600] to-[#00ff80] bg-clip-text text-transparent">ARCADE</span>
              </h1>
              <p className="text-white/40 text-sm max-w-md mx-auto mb-4">
                Classic games. No learning required. Just pure fun.
              </p>

              {/* Music toggle */}
              <button
                onClick={toggleBgMusic}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  musicOn
                    ? 'border-[#ffe600]/40 text-[#ffe600] bg-[#ffe600]/10'
                    : 'border-white/10 text-white/30 hover:text-white/60 hover:border-white/20'
                }`}
              >
                {musicOn ? '🎵 Music ON' : '🔇 Music OFF'}
              </button>
            </div>

            {/* Filter tags — Friv-style */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {arcadeTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 active:scale-95 border ${
                    filter === tag
                      ? 'border-[#ffe600]/40 text-[#ffe600] bg-[#ffe600]/10 shadow-[0_0_10px_rgba(255,230,0,0.1)]'
                      : 'border-white/5 text-white/30 hover:text-white/60 hover:border-white/15 bg-white/[0.02]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Friv-style colorful game grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {filtered.map((game, idx) => (
                <button
                  key={game.id}
                  onClick={() => playGame(game)}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 active:scale-95 border border-white/5 hover:border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${game.color}30, ${game.color}08)`,
                    animationDelay: `${idx * 0.03}s`,
                    boxShadow: `0 4px 20px ${game.color}10`,
                  }}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at center, ${game.color}20, transparent 70%)` }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full p-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl mb-1 group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-lg"
                      style={{ filter: `drop-shadow(0 0 8px ${game.color}60)` }}
                    >
                      {game.emoji}
                    </span>
                    <span className="text-[10px] sm:text-xs font-black text-white/70 group-hover:text-white transition-colors text-center leading-tight">
                      {game.name}
                    </span>
                  </div>

                  {/* Play indicator on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-black" style={{ background: `${game.color}90` }}>
                      ▶
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 text-center text-white/15 text-xs">
              {arcadeGames.length} arcade games • Click any game to play instantly
            </div>
          </>
        )}
      </div>
    </div>
  );
}

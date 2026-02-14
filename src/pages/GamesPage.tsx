import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { allGames, categories, gradeLevels, type GameCategory, type GradeLevel } from '../engine/gameData';

export function GamesPage() {
  const { category } = useParams<{ category?: string }>();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'all'>(
    (category as GameCategory) || 'all'
  );
  const [search, setSearch] = useState('');

  const filteredGames = allGames.filter((game) => {
    if (selectedCategory !== 'all' && game.category !== selectedCategory) return false;
    if (selectedGrade !== 'all' && !game.supportedGrades.includes(selectedGrade)) return false;
    if (search && !game.name.toLowerCase().includes(search.toLowerCase()) && !game.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-4xl font-black text-white mb-2">
          {selectedCategory !== 'all'
            ? categories.find(c => c.value === selectedCategory)?.label || 'Games'
            : (
              <span>
                <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">ALL</span>
                {' '}
                <span className="text-white">GAMES</span>
              </span>
            )}
        </h1>
        <p className="text-white/40">
          <span className="text-[#0099ff] font-bold">{filteredGames.length}</span> games available
        </p>
      </div>

      {/* Search */}
      <div className="glass-card glass-card-blue flex items-center gap-3 px-5 py-3.5 mb-6 animate-slide-up delay-100 group focus-within:border-[#0099ff]/30 focus-within:shadow-[0_0_20px_rgba(0,153,255,0.1)] transition-all duration-300">
        <span className="text-white/30 group-focus-within:text-[#0099ff] transition-colors duration-300">🔍</span>
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white w-full outline-none placeholder-white/25 text-sm"
        />
        {search && (
          <button 
            onClick={() => setSearch('')} 
            className="text-white/30 hover:text-white hover:bg-white/10 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
          >
            ✕
          </button>
        )}
      </div>

      {/* Grade filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 animate-slide-up delay-200">
        <FilterPill label="All Grades" active={selectedGrade === 'all'} onClick={() => setSelectedGrade('all')} />
        {gradeLevels.map((g) => (
          <FilterPill key={g.value} label={g.label} active={selectedGrade === g.value} onClick={() => setSelectedGrade(g.value)} color={g.color} />
        ))}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 animate-slide-up delay-300">
        <FilterPill label="All" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} />
        {categories.map((c) => (
          <FilterPill key={c.value} label={c.label} active={selectedCategory === c.value} onClick={() => setSelectedCategory(c.value)} />
        ))}
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4 animate-float">🔍</div>
          <p className="text-white/50 text-lg font-bold">No games found</p>
          <p className="text-white/30 text-sm mt-2">Try a different filter or search</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredGames.map((game, i) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="glass-card glass-card-blue p-4 transition-all duration-300 hover:scale-[1.04] group active:scale-[0.96] btn-shimmer overflow-hidden animate-pop-in"
              style={{ animationDelay: `${Math.min(i * 0.04, 0.8)}s` }}
            >
              <div className="text-3xl mb-2 text-center transition-all duration-300 group-hover:scale-130 group-hover:drop-shadow-[0_0_15px_rgba(0,153,255,0.3)]" style={{ transform: 'scale(1)', transition: 'transform 0.3s, filter 0.3s' }}>
                <span className="inline-block group-hover:scale-125 transition-transform duration-300">
                  {game.iconEmoji}
                </span>
              </div>
              <h3 className="font-bold text-white text-sm text-center mb-1 line-clamp-1 group-hover:text-[#0099ff] transition-colors duration-300">{game.name}</h3>
              <p className="text-white/35 text-xs text-center line-clamp-2 mb-3 group-hover:text-white/50 transition-colors">{game.description}</p>
              <div className="flex justify-center gap-1 flex-wrap">
                {!game.isAvailable && <Badge text="SOON" color="#666" glowColor="transparent" />}
                {game.isPremium && <Badge text="PREMIUM" color="#ffe600" glowColor="rgba(255,230,0,0.2)" />}
                {game.isFeatured && <Badge text="HOT" color="#ff2626" glowColor="rgba(255,38,38,0.2)" />}
                {game.isAvailable && !game.isPremium && <Badge text="FREE" color="#00ff80" glowColor="rgba(0,255,128,0.15)" />}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 active:scale-90 ${
        active
          ? 'bg-[#0099ff]/20 text-[#0099ff] border border-[#0099ff]/40 shadow-[0_0_12px_rgba(0,153,255,0.15)]'
          : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60 border border-transparent'
      }`}
      style={active && color ? { 
        borderColor: `${color}60`, 
        color,
        backgroundColor: `${color}15`,
        boxShadow: `0 0 12px ${color}20`
      } : {}}
    >
      {label}
    </button>
  );
}

function Badge({ text, color, glowColor }: { text: string; color: string; glowColor: string }) {
  return (
    <span 
      className="text-[10px] font-black text-white px-2 py-0.5 rounded-md transition-all duration-300" 
      style={{ backgroundColor: color, boxShadow: `0 0 8px ${glowColor}` }}
    >
      {text}
    </span>
  );
}

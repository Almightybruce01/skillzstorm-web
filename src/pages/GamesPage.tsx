import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { allGames, categories, gradeLevels, type GameCategory, type GradeLevel } from '../engine/gameData';

const catColorMap: Record<string, string> = {
  StormBattle: '#0099ff',
  StormDash: '#00ff80',
  StormPuzzle: '#ffe600',
  StormQuick: '#ff3399',
  Storm3D: '#9933ff',
  StormVR: '#00e6e6',
};

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
    <div className="pt-24 sm:pt-28 min-h-[100vh] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <div className="text-center mb-10 animate-slide-up">
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-3">
          {selectedCategory !== 'all'
            ? <span style={{ color: catColorMap[selectedCategory] || '#0099ff' }}>{categories.find(c => c.value === selectedCategory)?.label || 'Games'}</span>
            : (
              <span>
                <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">ALL</span>
                {' '}
                <span className="text-white">GAMES</span>
              </span>
            )}
        </h1>
        <p className="text-white/35 text-sm">
          <span className="font-black text-lg" style={{ color: catColorMap[selectedCategory] || '#0099ff' }}>{filteredGames.length}</span>
          <span className="ml-1">games available — all free to play</span>
        </p>
      </div>

      {/* Search */}
      <div className="game-card flex items-center gap-3 !p-4 mb-6 animate-slide-up delay-100 group focus-within:!border-[#0099ff]/30 focus-within:!shadow-[0_0_25px_rgba(0,153,255,0.12)] transition-all duration-300">
        <span className="text-white/25 group-focus-within:text-[#0099ff] transition-colors duration-300 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white w-full outline-none placeholder-white/20 text-sm font-medium"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-white/30 hover:text-white hover:bg-white/10 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 text-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Grade filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 animate-slide-up delay-200 scrollbar-none">
        <FilterPill label="All Grades" active={selectedGrade === 'all'} onClick={() => setSelectedGrade('all')} color="#0099ff" />
        {gradeLevels.map((g) => (
          <FilterPill key={g.value} label={g.label} active={selectedGrade === g.value} onClick={() => setSelectedGrade(g.value)} color={g.color} />
        ))}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-2 animate-slide-up delay-300 scrollbar-none">
        <FilterPill label="All Modes" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} color="#0099ff" />
        {categories.map((c) => (
          <FilterPill key={c.value} label={c.label} active={selectedCategory === c.value} onClick={() => setSelectedCategory(c.value)} color={catColorMap[c.value]} />
        ))}
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-24 animate-fade-in">
          <div className="text-7xl mb-4 animate-float">🔍</div>
          <p className="text-white/50 text-xl font-black mb-2">No games found</p>
          <p className="text-white/25 text-sm">Try a different filter or search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredGames.map((game, i) => {
            const color = catColorMap[game.category] || '#0099ff';
            return (
              <Link
                key={game.id}
                to={`/game/${game.id}`}
                className="game-card group text-center animate-pop-in"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.8)}s` }}
              >
                {/* Emoji icon */}
                <div className="text-4xl mb-3 transition-all duration-400 group-hover:scale-[1.35]"
                  style={{ filter: `drop-shadow(0 0 0 transparent)` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 15px ${color}60)`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = `drop-shadow(0 0 0 transparent)`; }}
                >
                  {game.iconEmoji}
                </div>

                <h3 className="font-bold text-white text-sm mb-1 line-clamp-1 group-hover:transition-colors duration-300"
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = color; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'white'; }}
                >{game.name}</h3>
                <p className="text-white/25 text-xs line-clamp-2 mb-3 group-hover:text-white/40 transition-colors">{game.description}</p>

                {/* Badges */}
                <div className="flex justify-center gap-1.5 flex-wrap mb-2">
                  {!game.isAvailable && <Badge text="SOON" bg="#666" />}
                  {game.isPremium && <Badge text="PREMIUM" bg="linear-gradient(135deg, #ffe600, #ff8000)" textColor="#0d0d1f" />}
                  {game.isFeatured && <Badge text="HOT" bg="linear-gradient(135deg, #ff2626, #ff3399)" />}
                  {game.isAvailable && !game.isPremium && <Badge text="FREE" bg={color} />}
                </div>

                {/* Play indicator on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 mt-1">
                  <span className="text-[10px] font-black tracking-[0.15em]" style={{ color }}>▶ PLAY</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string }) {
  const c = color || '#0099ff';
  return (
    <button
      onClick={onClick}
      className="whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 active:scale-90 border"
      style={active ? {
        borderColor: `${c}50`,
        color: c,
        backgroundColor: `${c}15`,
        boxShadow: `0 0 15px ${c}15`,
      } : {
        borderColor: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.35)',
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
        }
      }}
    >
      {label}
    </button>
  );
}

function Badge({ text, bg, textColor }: { text: string; bg: string; textColor?: string }) {
  return (
    <span
      className="text-[9px] font-black px-2.5 py-0.5 rounded-md"
      style={{ background: bg, color: textColor || 'white' }}
    >
      {text}
    </span>
  );
}

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
    <div className="pt-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white mb-2">
          {selectedCategory !== 'all'
            ? categories.find(c => c.value === selectedCategory)?.label || 'Games'
            : 'ALL GAMES'}
        </h1>
        <p className="text-white/50">
          {filteredGames.length} games available
        </p>
      </div>

      {/* Search */}
      <div className="glass-card flex items-center gap-3 px-4 py-3 mb-6">
        <span className="text-white/30">🔍</span>
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-white w-full outline-none placeholder-white/30"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-white/30 hover:text-white">✕</button>
        )}
      </div>

      {/* Grade filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <FilterPill label="All Grades" active={selectedGrade === 'all'} onClick={() => setSelectedGrade('all')} />
        {gradeLevels.map((g) => (
          <FilterPill key={g.value} label={g.label} active={selectedGrade === g.value} onClick={() => setSelectedGrade(g.value)} color={g.color} />
        ))}
      </div>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <FilterPill label="All" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} />
        {categories.map((c) => (
          <FilterPill key={c.value} label={c.label} active={selectedCategory === c.value} onClick={() => setSelectedCategory(c.value)} />
        ))}
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-white/50 text-lg">No games found</p>
          <p className="text-white/30 text-sm mt-2">Try a different filter or search</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredGames.map((game) => (
            <Link
              key={game.id}
              to={`/game/${game.id}`}
              className="glass-card p-4 hover:border-[#0099ff]/30 transition-all hover:scale-[1.02] group"
            >
              <div className="text-3xl mb-2 text-center group-hover:scale-110 transition-transform">
                {game.iconEmoji}
              </div>
              <h3 className="font-bold text-white text-sm text-center mb-1 line-clamp-1">{game.name}</h3>
              <p className="text-white/40 text-xs text-center line-clamp-2 mb-3">{game.description}</p>
              <div className="flex justify-center gap-1 flex-wrap">
                {!game.isAvailable && <Badge text="SOON" color="#666" />}
                {game.isPremium && <Badge text="PREMIUM" color="#ffe600" />}
                {game.isFeatured && <Badge text="HOT" color="#ff2626" />}
                {game.isAvailable && !game.isPremium && <Badge text="FREE" color="#00ff80" />}
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
      className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
        active
          ? 'bg-[#0099ff]/30 text-[#0099ff] border border-[#0099ff]/50'
          : 'bg-white/5 text-white/50 hover:bg-white/10 border border-transparent'
      }`}
      style={active && color ? { borderColor: color, color } : {}}
    >
      {label}
    </button>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-md" style={{ backgroundColor: color }}>
      {text}
    </span>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0d0d1f]/80 backdrop-blur-2xl border-b border-white/5">
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] gradient-rainbow animate-rainbow opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              {/* Glow behind logo on hover */}
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#0099ff]/0 to-[#9933ff]/0 group-hover:from-[#0099ff]/30 group-hover:to-[#9933ff]/30 transition-all duration-500 rounded-full scale-150" />
              <span className="relative text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-[#0099ff] via-[#6644ff] to-[#9933ff] bg-clip-text text-transparent group-hover:from-[#33bbff] group-hover:via-[#9966ff] group-hover:to-[#cc66ff] transition-all duration-300">SKILLZ</span>
                <span className="bg-gradient-to-r from-[#ff8000] via-[#ff4400] to-[#ff2626] bg-clip-text text-transparent group-hover:from-[#ffaa33] group-hover:via-[#ff6633] group-hover:to-[#ff4444] transition-all duration-300">STORM</span>
              </span>
            </div>
            <span className="hidden sm:inline text-[10px] font-bold text-[#00e6e6] tracking-[0.25em] neon-glow-cyan opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              PLAY HARD. THINK HARDER.
            </span>
          </Link>
          
          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-1">
            <NavLink to="/" active={location.pathname === '/'} icon="🏠">Home</NavLink>
            <NavLink to="/games" active={location.pathname.startsWith('/games') || location.pathname.startsWith('/game/')} icon="🎮">Games</NavLink>
            <NavLink to="/schools" active={location.pathname === '/schools'} icon="🏫">Schools</NavLink>
            <NavLink to="/store" active={location.pathname === '/store'} icon="🛒">Store</NavLink>
            <Link
              to="/premium"
              className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 btn-shimmer overflow-hidden ${
                location.pathname === '/premium'
                  ? 'bg-gradient-to-r from-[#ffe600]/20 to-[#ff8000]/20 text-[#ffe600] border border-[#ffe600]/30 shadow-[0_0_15px_rgba(255,230,0,0.15)]'
                  : 'bg-gradient-to-r from-[#ffe600]/5 to-[#ff8000]/5 text-[#ffe600] hover:from-[#ffe600]/15 hover:to-[#ff8000]/15 border border-[#ffe600]/10 hover:border-[#ffe600]/30 hover:shadow-[0_0_20px_rgba(255,230,0,0.1)]'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1">
                👑 Premium
              </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className="sm:hidden text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all active:scale-90"
          >
            <div className="space-y-1.5">
              <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
              <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-2 space-y-1 bg-[#0d0d1f]/95 backdrop-blur-2xl border-t border-white/5">
          <MobileNavLink to="/" active={location.pathname === '/'} icon="🏠" onClick={() => setMobileOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/games" active={location.pathname.startsWith('/games')} icon="🎮" onClick={() => setMobileOpen(false)}>Games</MobileNavLink>
          <MobileNavLink to="/schools" active={location.pathname === '/schools'} icon="🏫" onClick={() => setMobileOpen(false)}>For Schools</MobileNavLink>
          <MobileNavLink to="/store" active={location.pathname === '/store'} icon="🛒" onClick={() => setMobileOpen(false)}>Store</MobileNavLink>
          <MobileNavLink to="/vr" active={location.pathname === '/vr'} icon="🥽" onClick={() => setMobileOpen(false)}>VR</MobileNavLink>
          <MobileNavLink to="/about" active={location.pathname === '/about'} icon="ℹ️" onClick={() => setMobileOpen(false)}>About</MobileNavLink>
          <MobileNavLink to="/premium" active={location.pathname === '/premium'} icon="👑" onClick={() => setMobileOpen(false)}>Premium</MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, icon, children }: { to: string; active: boolean; icon: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 group ${
        active
          ? 'bg-[#0099ff]/15 text-[#0099ff] shadow-[0_0_15px_rgba(0,153,255,0.1)]'
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      {/* Active indicator dot */}
      {active && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0099ff] shadow-[0_0_6px_rgba(0,153,255,0.8)]" />
      )}
      <span className="flex items-center gap-1.5">
        <span className={`text-xs transition-transform duration-300 ${active ? '' : 'group-hover:scale-125'}`}>{icon}</span>
        {children}
      </span>
    </Link>
  );
}

function MobileNavLink({ to, active, icon, onClick, children }: { to: string; active: boolean; icon: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 active:scale-[0.98] ${
        active
          ? 'bg-[#0099ff]/15 text-[#0099ff]'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className="text-lg">{icon}</span>
      {children}
    </Link>
  );
}

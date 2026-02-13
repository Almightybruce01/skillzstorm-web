import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0d0d1f]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-black">
              <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">SKILLZ</span>
              <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">STORM</span>
            </span>
            <span className="hidden sm:inline text-[10px] font-bold text-[#00e6e6] tracking-wider">
              PLAY HARD. THINK HARDER.
            </span>
          </Link>
          
          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/games" active={location.pathname.startsWith('/games') || location.pathname.startsWith('/game/')}>Games</NavLink>
            <NavLink to="/vr" active={location.pathname === '/vr'}>VR</NavLink>
            <NavLink to="/store" active={location.pathname === '/store'}>Store</NavLink>
            <Link
              to="/premium"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                location.pathname === '/premium'
                  ? 'bg-[#ffe600]/20 text-[#ffe600]'
                  : 'bg-[#ffe600]/10 text-[#ffe600] hover:bg-[#ffe600]/20'
              }`}
            >
              Premium
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
        active
          ? 'bg-[#0099ff]/20 text-[#0099ff]'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </Link>
  );
}

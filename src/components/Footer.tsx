import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0a18]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <Link to="/" className="inline-block mb-3">
              <span className="text-xl font-black">
                <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">SKILLZ</span>
                <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">STORM</span>
              </span>
            </Link>
            <p className="text-white/30 text-xs leading-relaxed mb-4 max-w-[200px]">
              The arcade learning platform where education meets entertainment. Play Hard. Think Harder.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <SocialIcon href="https://twitter.com/skillzstorm" label="X" icon="𝕏" />
              <SocialIcon href="https://instagram.com/skillzstorm" label="IG" icon="📸" />
              <SocialIcon href="https://tiktok.com/@skillzstorm" label="TT" icon="🎵" />
              <SocialIcon href="https://youtube.com/@skillzstorm" label="YT" icon="▶" />
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4">PLATFORM</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/games">All Games</FooterLink>
              <FooterLink to="/games/arcade">Arcade Games</FooterLink>
              <FooterLink to="/games/dash">Dash & Runner</FooterLink>
              <FooterLink to="/games/puzzle">Puzzle & Strategy</FooterLink>
              <FooterLink to="/games/quick">Quick Play</FooterLink>
              <FooterLink to="/vr">VR Games</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4">COMPANY</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/schools">For Schools</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/premium">Go Premium</FooterLink>
              <FooterLink to="/store">Storm Store</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4">SUPPORT</h4>
            <ul className="space-y-2.5">
              <FooterLink to="/contact">Help Center</FooterLink>
              <FooterLink to="/contact">Report a Bug</FooterLink>
              <FooterLink to="/contact">Request a Feature</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/accessibility">Accessibility</FooterLink>
            </ul>
          </div>

          {/* Get the App */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-bold text-xs tracking-widest mb-4">GET THE APP</h4>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <span className="text-lg">🍎</span>
                <div>
                  <div className="text-[9px] text-white/40 leading-tight">Download on the</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#0099ff] transition-colors">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <span className="text-lg">💻</span>
                <div>
                  <div className="text-[9px] text-white/40 leading-tight">Available on</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#0099ff] transition-colors">Mac App Store</div>
                </div>
              </a>
              <a href="https://skillzstorm.com" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                <span className="text-lg">🌐</span>
                <div>
                  <div className="text-[9px] text-white/40 leading-tight">Play free on</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#0099ff] transition-colors">skillzstorm.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-white/5 bg-[#08081a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/25 font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff80]" />
              COPPA Compliant
            </span>
            <span>•</span>
            <span>Child-Safe Ads</span>
            <span>•</span>
            <span>No Data Collection</span>
            <span>•</span>
            <span>No Login Required</span>
            <span>•</span>
            <span>SSL Encrypted</span>
            <span>•</span>
            <span>School Approved</span>
            <span>•</span>
            <span>Stripe Secure Payments</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-[11px]">
            &copy; 2026 SkillzStorm by EZTeach. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/20 text-[11px]">
            <Link to="/privacy" className="hover:text-white/40 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white/40 transition-colors">Terms</Link>
            <Link to="/accessibility" className="hover:text-white/40 transition-colors">Accessibility</Link>
            <a href="mailto:support@skillzstorm.com" className="hover:text-white/40 transition-colors">support@skillzstorm.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-white/30 text-xs hover:text-[#0099ff] transition-colors duration-300">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm hover:bg-[#0099ff]/15 hover:border-[#0099ff]/30 hover:text-[#0099ff] transition-all duration-300 text-white/40"
    >
      {icon}
    </a>
  );
}

import { Link } from 'react-router-dom';
import { TopBannerAd, InArticleAd } from '../components/ads/AdBanner';

export function VRPage() {
  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <TopBannerAd />

      {/* Hero */}
      <section className="text-center py-12 animate-slide-up">
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-3xl bg-[#00e6e6]/20 rounded-full scale-[2] animate-pulse-slow" />
          <div className="relative text-7xl mb-4 animate-float">🥽</div>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-3 animate-slide-up delay-100">
          <span className="bg-gradient-to-r from-[#00e6e6] via-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">STORMVR</span>
        </h1>
        <p className="text-[#00e6e6] font-black tracking-[0.4em] text-sm mb-4 neon-glow-cyan animate-slide-up delay-200">
          LEARN IN VIRTUAL REALITY
        </p>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed animate-slide-up delay-300">
          Step inside your lessons. Experience math, science, history, and more
          in immersive 3D worlds. Multiple ways to play.
        </p>
      </section>

      {/* How to Play VR */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h2 className="text-xl font-black tracking-wider text-white">4 WAYS TO PLAY VR</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <VRMethod emoji="📱" title="Phone-in-Headset" subtitle="EASIEST — $29.99" description="Insert your iPhone or Android into a StormVR Lite headset. Open the SkillzStorm app, select any VR game, and enjoy full VR." steps={['Buy a StormVR Lite headset ($29.99)', 'Download SkillzStorm from the App Store', 'Open any StormVR game', 'Insert phone into headset', 'Play in full VR!']} ctaText="Get StormVR Lite" ctaLink="/store" color="#0099ff" delay={0} />
          <VRMethod emoji="🌐" title="Web VR (WebXR)" subtitle="FREE — No Download" description="Open skillzstorm.com in your VR headset's browser. Our WebXR games run directly in the browser. Click 'Enter VR' on any StormVR game." steps={['Open your VR headset\'s web browser', 'Go to skillzstorm.com', 'Navigate to any StormVR game', 'Click "Enter VR" button', 'Instant VR — no download!']} ctaText="Play Now" ctaLink="/games/StormVR" color="#00ff80" delay={1} />
          <VRMethod emoji="🎧" title="StormVR Pro Standalone" subtitle="ALL-IN-ONE — $149.99" description="Our premium standalone headset comes with SkillzStorm pre-installed. No phone needed. 6DOF tracking, hand tracking, and high-res displays." steps={['Buy StormVR Pro ($149.99)', 'Power on — SkillzStorm is pre-installed', 'Select your grade level', 'Choose any VR game', 'Full standalone VR experience!']} ctaText="Get StormVR Pro" ctaLink="/store" color="#9933ff" delay={2} />
          <VRMethod emoji="👁️" title="Apple Vision Pro" subtitle="PREMIUM — Spatial Computing" description="SkillzStorm is available on visionOS. Experience educational games as spatial apps with hand tracking and eye tracking." steps={['Open App Store on Vision Pro', 'Search for "SkillzStorm"', 'Download and install', 'Games appear as spatial windows', 'Use hand gestures to play!']} ctaText="Learn More" ctaLink="#visionpro" color="#ff8000" delay={3} />
        </div>
      </section>

      <InArticleAd />

      {/* VR Games Available */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h2 className="text-xl font-black tracking-wider text-white">VR GAMES</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { emoji: '🧮', name: 'VR Math Arena', desc: 'Solve equations in 3D space', color: '#0099ff' },
            { emoji: '🔬', name: 'VR Science Lab', desc: 'Virtual science experiments', color: '#00ff80' },
            { emoji: '🌍', name: 'VR Geo Explorer', desc: 'Travel the world in VR', color: '#9933ff' },
            { emoji: '📐', name: 'Geometry Runner 3D', desc: 'Run through 3D shapes', color: '#ff8000' },
            { emoji: '⚗️', name: 'VR Chemistry', desc: 'Mix elements in 3D', color: '#ff3399' },
            { emoji: '🏺', name: 'VR History', desc: 'Walk through history', color: '#ffe600' },
            { emoji: '🛡️', name: 'Storm Defenders VR', desc: '3D tower defense', color: '#ff2626' },
            { emoji: '🚀', name: 'More Coming...', desc: 'New VR games monthly', color: '#00e6e6' },
          ].map((game, i) => (
            <div 
              key={game.name} 
              className="glass-card p-5 text-center transition-all duration-300 hover:scale-[1.04] group active:scale-[0.97] btn-shimmer overflow-hidden animate-pop-in cursor-default"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="text-3xl mb-2 transition-all duration-300 group-hover:scale-125" style={{ filter: `drop-shadow(0 0 8px ${game.color}40)` }}>
                {game.emoji}
              </div>
              <h3 className="font-bold text-sm mb-1 transition-colors duration-300" style={{ color: 'white' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = game.color; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'white'; }}
              >{game.name}</h3>
              <p className="text-white/35 text-xs group-hover:text-white/50 transition-colors">{game.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware Comparison */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h2 className="text-xl font-black tracking-wider text-white">COMPARE</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="py-4 px-4 text-white/50 text-sm font-bold">Feature</th>
                <th className="py-4 px-4 text-[#0099ff] text-sm font-bold neon-glow-blue">StormVR Lite</th>
                <th className="py-4 px-4 text-[#9933ff] text-sm font-bold neon-glow-purple">StormVR Pro</th>
                <th className="py-4 px-4 text-[#ff8000] text-sm font-bold neon-glow-orange">Web VR</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <CompareRow label="Price" v1="$29.99" v2="$149.99" v3="Free" highlight={2} />
              <CompareRow label="Requires Phone" v1="Yes" v2="No" v3="No" />
              <CompareRow label="Download Needed" v1="App" v2="Built-in" v3="No" />
              <CompareRow label="Tracking" v1="3DOF" v2="6DOF" v3="3DOF" />
              <CompareRow label="Hand Tracking" v1="No" v2="Yes" v3="Limited" />
              <CompareRow label="Display Quality" v1="Phone" v2="2K" v3="Device" />
              <CompareRow label="Controllers" v1="Optional" v2="Included" v3="N/A" />
              <CompareRow label="Best For" v1="Beginners" v2="Power Users" v3="Try First" highlight={2} />
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <h2 className="text-xl font-black tracking-wider text-white">FAQ</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        <div className="space-y-3">
          {[
            { q: "Do I need a VR headset to play SkillzStorm?", a: "No! VR is optional. All 50+ games work on iPhone, iPad, Mac, and web without VR. VR is an extra way to experience immersive games." },
            { q: "What age is VR safe for?", a: "We recommend VR for ages 7+. Our games are designed with comfort settings (teleport movement, rest reminders) to ensure a safe experience." },
            { q: "Can I try VR for free first?", a: "Yes! Visit skillzstorm.com on any VR headset's browser to try Web VR games for free. No download or purchase needed." },
            { q: "Will StormVR work with Meta Quest?", a: "Yes! Our Web VR games work on any headset with a web browser, including Meta Quest 2/3/Pro, Pico 4, and more." },
            { q: "How do I get my order?", a: "Physical items (headsets, glasses) ship within 2-3 business days via standard shipping. Free shipping on orders over $50." },
          ].map((faq, i) => (
            <details key={i} className="glass-card p-5 group cursor-pointer transition-all duration-300 hover:border-white/15 animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <summary className="font-bold text-white list-none flex items-center justify-between">
                <span className="group-hover:text-[#0099ff] transition-colors duration-300">{faq.q}</span>
                <span className="text-white/20 group-open:rotate-180 transition-transform duration-300 ml-4 flex-shrink-0">▾</span>
              </summary>
              <p className="text-white/50 text-sm mt-3 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 animate-slide-up">
        <div className="glass-card p-10 max-w-xl mx-auto btn-shimmer overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.1), rgba(153,51,255,0.1))' }}>
          <h2 className="text-3xl font-black text-white mb-3">Ready for VR?</h2>
          <p className="text-white/45 mb-8">Start with Web VR for free, or get a headset for the full experience.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/games/StormVR" className="gradient-hero px-8 py-3.5 rounded-xl font-bold text-white hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer overflow-hidden">
              <span className="relative z-10">🌐 Try Web VR Free</span>
            </Link>
            <Link to="/store" className="bg-white/10 border border-white/10 px-8 py-3.5 rounded-xl font-bold text-white hover:bg-white/15 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
              🛒 Browse VR Headsets
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="font-black text-white/50 mb-2">
          <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">SKILLZ</span>
          <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">STORM</span>
          <span className="text-white/30 font-normal text-sm"> — Play Hard. Think Harder.</span>
        </p>
        <p className="text-white/20 text-xs">&copy; 2026 SkillzStorm. All rights reserved.</p>
      </footer>
    </div>
  );
}

function VRMethod({ emoji, title, subtitle, description, steps, ctaText, ctaLink, color, delay }: {
  emoji: string; title: string; subtitle: string; description: string;
  steps: string[]; ctaText: string; ctaLink: string; color: string; delay: number;
}) {
  return (
    <div 
      className="glass-card p-7 transition-all duration-300 hover:scale-[1.02] group active:scale-[0.98] animate-slide-up"
      style={{ animationDelay: `${delay * 0.12}s` }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}30`; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}15`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
    >
      <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">{emoji}</div>
      <h3 className="font-black text-white text-lg mb-1">{title}</h3>
      <p className="text-xs font-black mb-3" style={{ color }}>{subtitle}</p>
      <p className="text-white/45 text-sm mb-5">{description}</p>
      <div className="space-y-2 mb-5">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm">
            <span className="font-black text-xs mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ color: 'white', backgroundColor: `${color}25`, fontSize: '10px' }}>{i + 1}</span>
            <span className="text-white/55">{step}</span>
          </div>
        ))}
      </div>
      <Link
        to={ctaLink}
        className="inline-block px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:opacity-80 hover:scale-105 active:scale-95 btn-shimmer overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
      >
        <span className="relative z-10">{ctaText}</span>
      </Link>
    </div>
  );
}

function CompareRow({ label, v1, v2, v3, highlight }: { label: string; v1: string; v2: string; v3: string; highlight?: number }) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-200">
      <td className="py-3 px-4 text-white/50 font-semibold">{label}</td>
      <td className={`py-3 px-4 ${highlight === 0 ? 'text-[#0099ff] font-bold' : 'text-white/70'}`}>{v1}</td>
      <td className={`py-3 px-4 ${highlight === 1 ? 'text-[#9933ff] font-bold' : 'text-white/70'}`}>{v2}</td>
      <td className={`py-3 px-4 ${highlight === 2 ? 'text-[#00ff80] font-bold' : 'text-white/70'}`}>{v3}</td>
    </tr>
  );
}

import { Link } from 'react-router-dom';
import { TopBannerAd, InArticleAd } from '../components/ads/AdBanner';

// ═══════════════════════════════════════════════════════════════
// VR DISTRIBUTION PAGE
//
// Explains how users get SkillzStorm VR games on their headsets
// and drives traffic to the store for hardware purchases.
// ═══════════════════════════════════════════════════════════════

export function VRPage() {
  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <TopBannerAd />

      {/* Hero */}
      <section className="text-center py-12">
        <div className="text-7xl mb-4 animate-float">🥽</div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
          <span className="bg-gradient-to-r from-[#00e6e6] to-[#0099ff] bg-clip-text text-transparent">STORMVR</span>
        </h1>
        <p className="text-[#00e6e6] font-bold tracking-[0.3em] text-sm mb-4 neon-glow-green">
          LEARN IN VIRTUAL REALITY
        </p>
        <p className="text-white/60 max-w-2xl mx-auto text-lg">
          Step inside your lessons. Experience math, science, history, and more
          in immersive 3D worlds. Multiple ways to play.
        </p>
      </section>

      {/* How to Play VR */}
      <section className="mb-16">
        <h2 className="text-xl font-bold tracking-wider text-white text-center mb-8">
          4 WAYS TO PLAY VR
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <VRMethod
            emoji="📱"
            title="Phone-in-Headset"
            subtitle="EASIEST — $29.99"
            description="Insert your iPhone or Android into a StormVR Lite headset. Open the SkillzStorm app, select any VR game, and enjoy full VR. The phone's gyroscope handles all the head tracking."
            steps={[
              'Buy a StormVR Lite headset ($29.99)',
              'Download SkillzStorm from the App Store',
              'Open any StormVR game',
              'Insert phone into headset',
              'Play in full VR!'
            ]}
            ctaText="Get StormVR Lite"
            ctaLink="/store"
            color="#0099ff"
          />
          
          <VRMethod
            emoji="🌐"
            title="Web VR (WebXR)"
            subtitle="FREE — No Download"
            description="Open skillzstorm.com in your VR headset's browser (Meta Quest, Pico, etc.). Our WebXR games run directly in the browser. Click 'Enter VR' on any StormVR game."
            steps={[
              'Open your VR headset\'s web browser',
              'Go to skillzstorm.com',
              'Navigate to any StormVR game',
              'Click "Enter VR" button',
              'Instant VR — no download!'
            ]}
            ctaText="Play Now"
            ctaLink="/games/StormVR"
            color="#00ff80"
          />
          
          <VRMethod
            emoji="🎧"
            title="StormVR Pro Standalone"
            subtitle="ALL-IN-ONE — $149.99"
            description="Our premium standalone headset comes with SkillzStorm pre-installed. No phone needed. 6DOF tracking, hand tracking, and high-res displays. Power on and play."
            steps={[
              'Buy StormVR Pro ($149.99)',
              'Power on — SkillzStorm is pre-installed',
              'Select your grade level',
              'Choose any VR game',
              'Full standalone VR experience!'
            ]}
            ctaText="Get StormVR Pro"
            ctaLink="/store"
            color="#9933ff"
          />
          
          <VRMethod
            emoji="👁️"
            title="Apple Vision Pro"
            subtitle="PREMIUM — Spatial Computing"
            description="SkillzStorm is available on visionOS. Experience educational games as spatial apps with hand tracking and eye tracking. The most immersive way to learn."
            steps={[
              'Open App Store on Vision Pro',
              'Search for "SkillzStorm"',
              'Download and install',
              'Games appear as spatial windows',
              'Use hand gestures to play!'
            ]}
            ctaText="Learn More"
            ctaLink="#visionpro"
            color="#ff8000"
          />
        </div>
      </section>

      <InArticleAd />

      {/* VR Games Available */}
      <section className="mb-16">
        <h2 className="text-xl font-bold tracking-wider text-white text-center mb-8">
          VR GAMES AVAILABLE
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <VRGameCard emoji="🧮" name="VR Math Arena" desc="Solve equations in 3D space" />
          <VRGameCard emoji="🔬" name="VR Science Lab" desc="Virtual science experiments" />
          <VRGameCard emoji="🌍" name="VR Geo Explorer" desc="Travel the world in VR" />
          <VRGameCard emoji="📐" name="Geometry Runner 3D" desc="Run through 3D shapes" />
          <VRGameCard emoji="⚗️" name="VR Chemistry" desc="Mix elements in 3D" />
          <VRGameCard emoji="🏺" name="VR History" desc="Walk through history" />
          <VRGameCard emoji="🛡️" name="Storm Defenders VR" desc="3D tower defense" />
          <VRGameCard emoji="🚀" name="More Coming..." desc="New VR games monthly" />
        </div>
      </section>

      {/* Hardware Comparison */}
      <section className="mb-16">
        <h2 className="text-xl font-bold tracking-wider text-white text-center mb-8">
          COMPARE VR OPTIONS
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-white/60 text-sm font-bold">Feature</th>
                <th className="py-3 px-4 text-[#0099ff] text-sm font-bold">StormVR Lite</th>
                <th className="py-3 px-4 text-[#9933ff] text-sm font-bold">StormVR Pro</th>
                <th className="py-3 px-4 text-[#ff8000] text-sm font-bold">Web VR</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <CompareRow label="Price" v1="$29.99" v2="$149.99" v3="Free" />
              <CompareRow label="Requires Phone" v1="Yes" v2="No" v3="No" />
              <CompareRow label="Download Needed" v1="App" v2="Built-in" v3="No" />
              <CompareRow label="Tracking" v1="3DOF" v2="6DOF" v3="3DOF" />
              <CompareRow label="Hand Tracking" v1="No" v2="Yes" v3="Limited" />
              <CompareRow label="Display Quality" v1="Phone" v2="2K" v3="Device" />
              <CompareRow label="Controllers" v1="Optional" v2="Included" v3="N/A" />
              <CompareRow label="Best For" v1="Beginners" v2="Power Users" v3="Try First" />
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-xl font-bold tracking-wider text-white text-center mb-8">
          VR FAQ
        </h2>
        <div className="space-y-4">
          <FAQ q="Do I need a VR headset to play SkillzStorm?" a="No! VR is optional. All 50+ games work on iPhone, iPad, Mac, and web without VR. VR is an extra way to experience immersive games." />
          <FAQ q="What age is VR safe for?" a="We recommend VR for ages 7+. Our games are designed with comfort settings (teleport movement, rest reminders) to ensure a safe experience." />
          <FAQ q="Can I try VR for free first?" a="Yes! Visit skillzstorm.com on any VR headset's browser to try Web VR games for free. No download or purchase needed." />
          <FAQ q="Will StormVR work with Meta Quest?" a="Yes! Our Web VR games work on any headset with a web browser, including Meta Quest 2/3/Pro, Pico 4, and more." />
          <FAQ q="How do I get my order?" a="Physical items (headsets, glasses) ship within 2-3 business days via standard shipping. Free shipping on orders over $50." />
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <div className="glass-card p-8 max-w-xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.1), rgba(153,51,255,0.1))' }}>
          <h2 className="text-2xl font-black text-white mb-3">Ready for VR?</h2>
          <p className="text-white/50 mb-6">Start with Web VR for free, or get a headset for the full experience.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/games/StormVR"
              className="gradient-hero px-8 py-3 rounded-xl font-bold text-white hover:opacity-90 transition-all"
            >
              🌐 Try Web VR Free
            </Link>
            <Link
              to="/store"
              className="bg-white/10 border border-white/10 px-8 py-3 rounded-xl font-bold text-white hover:bg-white/15 transition-all"
            >
              🛒 Browse VR Headsets
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-white/30 text-sm">
        <p className="font-bold text-white/50 mb-2">
          <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">SKILLZ</span>
          <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">STORM</span>
          {' '}— Play Hard. Think Harder.
        </p>
        <p>&copy; 2026 SkillzStorm. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────

function VRMethod({ emoji, title, subtitle, description, steps, ctaText, ctaLink, color }: {
  emoji: string; title: string; subtitle: string; description: string;
  steps: string[]; ctaText: string; ctaLink: string; color: string;
}) {
  return (
    <div className="glass-card p-6 hover:border-white/20 transition-all">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
      <p className="text-xs font-bold mb-3" style={{ color }}>{subtitle}</p>
      <p className="text-white/50 text-sm mb-4">{description}</p>
      <div className="space-y-2 mb-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className="font-black text-xs mt-0.5" style={{ color }}>{i + 1}</span>
            <span className="text-white/60">{step}</span>
          </div>
        ))}
      </div>
      <Link
        to={ctaLink}
        className="inline-block px-6 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-80"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
      >
        {ctaText}
      </Link>
    </div>
  );
}

function VRGameCard({ emoji, name, desc }: { emoji: string; name: string; desc: string }) {
  return (
    <div className="glass-card p-4 text-center hover:border-[#00e6e6]/30 transition-all hover:scale-[1.02]">
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="font-bold text-white text-sm mb-1">{name}</h3>
      <p className="text-white/40 text-xs">{desc}</p>
    </div>
  );
}

function CompareRow({ label, v1, v2, v3 }: { label: string; v1: string; v2: string; v3: string }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-3 px-4 text-white/60">{label}</td>
      <td className="py-3 px-4 text-white">{v1}</td>
      <td className="py-3 px-4 text-white">{v2}</td>
      <td className="py-3 px-4 text-white">{v3}</td>
    </tr>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="glass-card p-4 group cursor-pointer">
      <summary className="font-bold text-white list-none flex items-center justify-between">
        {q}
        <span className="text-white/30 group-open:rotate-180 transition-transform">▾</span>
      </summary>
      <p className="text-white/50 text-sm mt-3 leading-relaxed">{a}</p>
    </details>
  );
}

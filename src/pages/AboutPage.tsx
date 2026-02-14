import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28 min-h-[100vh] w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero */}
      <section className="text-center py-14 animate-slide-up">
        <h1 className="text-5xl font-black mb-4">
          <span className="bg-gradient-to-r from-[#0099ff] to-[#9933ff] bg-clip-text text-transparent">About </span>
          <span className="bg-gradient-to-r from-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">SkillzStorm</span>
        </h1>
        <p className="text-[#00e6e6] font-black tracking-[0.3em] text-sm mb-6 neon-glow-cyan">PLAY HARD. THINK HARDER.</p>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
          SkillzStorm is the arcade learning platform that makes education addictive. We believe every student 
          deserves access to engaging, high-quality educational games — for free.
        </p>
      </section>

      {/* Mission */}
      <section className="game-card !p-8 mb-8 animate-slide-up delay-100">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🎯</span>
          <div>
            <h2 className="text-xl font-black text-white mb-3">Our Mission</h2>
            <p className="text-white/60 leading-relaxed">
              To bridge the gap between entertainment and education by creating an arcade-style learning platform 
              that students actually <em>want</em> to use. SkillzStorm puts the <strong className="text-white">fun first</strong> and hides the learning inside — 
              so students build real academic skills while having the time of their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="game-card !p-8 mb-8 animate-slide-up delay-200">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🌟</span>
          <div>
            <h2 className="text-xl font-black text-white mb-3">Our Vision</h2>
            <p className="text-white/60 leading-relaxed">
              A world where every K-12 student can access engaging, standards-aligned educational games 
              from any device, anywhere, at any time — completely free. We envision SkillzStorm in every 
              classroom, every home, and every afterschool program across the country.
            </p>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="mb-12 animate-slide-up delay-300">
        <h2 className="text-xl font-black text-white text-center mb-6">What We Cover</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: '➕', subj: 'Math & Algebra', color: '#0099ff' },
            { icon: '📖', subj: 'Vocabulary', color: '#9933ff' },
            { icon: '✏️', subj: 'Grammar & Writing', color: '#ff3399' },
            { icon: '🔬', subj: 'Science', color: '#00ff80' },
            { icon: '⚗️', subj: 'Chemistry', color: '#00e6e6' },
            { icon: '⚡', subj: 'Physics', color: '#ffe600' },
            { icon: '📐', subj: 'Geometry', color: '#ff8000' },
            { icon: '📊', subj: 'Statistics', color: '#0099ff' },
            { icon: '🏛️', subj: 'History', color: '#9933ff' },
            { icon: '💰', subj: 'Financial Literacy', color: '#00ff80' },
            { icon: '🧠', subj: 'Logic & Reasoning', color: '#ff2626' },
            { icon: '📝', subj: 'SAT Prep', color: '#ffe600' },
          ].map(s => (
            <div key={s.subj} className="game-card !p-3 flex items-center gap-3 group cursor-default">
              <span className="text-lg transition-transform duration-300 group-hover:scale-125">{s.icon}</span>
              <span className="text-sm font-semibold text-white/60 group-hover:text-white/90 transition-colors" style={{}}>{s.subj}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Key Numbers */}
      <section className="game-card !p-8 mb-12 animate-slide-up">
        <h2 className="text-xl font-black text-white text-center mb-8">SkillzStorm by the Numbers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <Stat value="50+" label="Arcade Games" color="#0099ff" />
          <Stat value="K–12" label="Grade Levels" color="#00ff80" />
          <Stat value="12+" label="Subjects" color="#9933ff" />
          <Stat value="$0" label="Price to Play" color="#ffe600" />
        </div>
      </section>

      {/* Built By */}
      <section className="game-card !p-8 mb-12 animate-slide-up" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.06), rgba(153,51,255,0.04))' }}>
        <div className="text-center">
          <h2 className="text-xl font-black text-white mb-4">Built by EZTeach</h2>
          <p className="text-white/50 leading-relaxed max-w-2xl mx-auto mb-6">
            SkillzStorm is a product of <strong className="text-white">EZTeach</strong>, an education technology 
            company dedicated to building tools that empower students and educators. From substitute teacher 
            management to arcade learning — we're building the future of education, one product at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/schools" className="btn-elite btn-elite-primary text-sm">
              <span className="relative z-10">For Schools & Districts</span>
            </Link>
            <Link to="/contact" className="btn-elite btn-elite-ghost text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-12 animate-slide-up">
        <h2 className="text-xl font-black text-white text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ValueCard icon="🎮" title="Fun First" desc="If it's not fun, students won't use it. We design games first, then embed learning inside." color="#0099ff" />
          <ValueCard icon="🔓" title="Free & Accessible" desc="No login, no paywall, no barriers. Every student gets full access from day one." color="#00ff80" />
          <ValueCard icon="🛡️" title="Safe & Private" desc="COPPA compliant. No data collection. No tracking. Child-safe ads only." color="#9933ff" />
          <ValueCard icon="📈" title="Standards-Aligned" desc="Our question banks align with Common Core and state standards for K-12." color="#ffe600" />
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="group cursor-default">
      <div className="text-3xl font-black transition-transform duration-300 group-hover:scale-110" style={{ color }}>{value}</div>
      <div className="text-white/40 text-xs mt-1 font-semibold tracking-wider">{label}</div>
    </div>
  );
}

function ValueCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <div className="game-card !p-6 group cursor-default transition-all duration-300 hover:scale-[1.02] active:scale-[0.99]"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}30`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; }}
    >
      <span className="text-2xl inline-block mb-3 transition-transform duration-300 group-hover:scale-125">{icon}</span>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

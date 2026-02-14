import { useState } from 'react';
import { isAdFree, setAdFree } from '../components/ads/AdConfig';

const STRIPE_LINKS = {
  adFree: 'https://buy.stripe.com/YOUR_LINK_ad_free',
  premiumBundle: 'https://buy.stripe.com/YOUR_LINK_premium_bundle',
  coins500: 'https://buy.stripe.com/YOUR_LINK_coins_500',
  coins2500: 'https://buy.stripe.com/YOUR_LINK_coins_2500',
  coins10000: 'https://buy.stripe.com/YOUR_LINK_coins_10000',
  seasonPass: 'https://buy.stripe.com/YOUR_LINK_season_pass',
};

export function PremiumPage() {
  const [userIsAdFree] = useState(isAdFree());

  const handlePurchase = (link: string, isDigital?: string) => {
    window.open(link, '_blank');
    if (isDigital === 'adFree') {
      setAdFree(true);
    }
  };

  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Hero */}
      <section className="text-center py-12 animate-slide-up">
        <div className="relative inline-block">
          <div className="absolute inset-0 blur-3xl bg-[#ffe600]/20 rounded-full scale-[2] animate-pulse-slow" />
          <div className="relative text-7xl mb-4 animate-float">👑</div>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-3 animate-slide-up delay-100">
          <span className="bg-gradient-to-r from-[#ffe600] via-[#ff8000] to-[#ff2626] bg-clip-text text-transparent">GO PREMIUM</span>
        </h1>
        <p className="text-white/50 max-w-xl mx-auto animate-slide-up delay-200">
          Remove ads, get coins, unlock exclusive content. Support SkillzStorm's mission to make learning addictive.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff80]/10 border border-[#00ff80]/20 animate-slide-up delay-300">
          <span className="w-2 h-2 rounded-full bg-[#00ff80] animate-glow" />
          <span className="text-[#00ff80] text-sm font-bold">
            Web purchases = better value (lower fees than App Store!)
          </span>
        </div>
      </section>

      {/* Best Value: Premium Bundle */}
      <div className="relative mb-8 animate-slide-up delay-400">
        <div className="absolute -top-3 left-4 z-10 px-4 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#ffe600] to-[#ff8000] text-black shadow-[0_0_15px_rgba(255,230,0,0.3)]">
          BEST VALUE
        </div>
        <div 
          className="game-card !p-7" 
          style={{ background: 'linear-gradient(135deg, rgba(255,230,0,0.08), rgba(255,128,0,0.05))' }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="text-5xl animate-float" style={{ animationDuration: '2.5s' }}>🏆</span>
            <div>
              <h2 className="text-xl font-black text-white">Premium Bundle</h2>
              <p className="text-white/40 text-sm">Ad-free + 5,000 coins + exclusive content</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-3xl font-black text-[#00ff80] neon-glow-green">$4.99</div>
              <div className="text-xs text-white/30 line-through">$12.99 value</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <Perk icon="⭐" text="Remove all ads" color="#ffe600" />
            <Perk icon="🪙" text="5,000 coins" color="#ff8000" />
            <Perk icon="🎮" text="Exclusive games" color="#0099ff" />
            <Perk icon="🛡️" text="Premium badge" color="#9933ff" />
            <Perk icon="⚡" text="Early access" color="#00ff80" />
            <Perk icon="🎨" text="Exclusive skins" color="#ff3399" />
          </div>
          <button
            onClick={() => handlePurchase(STRIPE_LINKS.premiumBundle, 'adFree')}
            className="btn-elite btn-elite-gold w-full text-lg"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>👑</span> Get Premium Bundle — $4.99
            </span>
          </button>
        </div>
      </div>

      {/* Ad-Free */}
      <div className="game-card !p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.45s' }}>
        <div className="flex items-center gap-4">
          <span className="text-3xl">⭐</span>
          <div className="flex-1">
            <h3 className="font-bold text-white">Remove Ads Forever</h3>
            <p className="text-white/35 text-sm">No banners, no interruptions, pure gaming.</p>
          </div>
          {userIsAdFree ? (
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-[#00ff80]/15 text-[#00ff80] border border-[#00ff80]/30 shadow-[0_0_12px_rgba(0,255,128,0.1)]">ACTIVE ✓</span>
          ) : (
            <button
              onClick={() => handlePurchase(STRIPE_LINKS.adFree, 'adFree')}
              className="btn-elite btn-elite-primary text-sm"
            >
              <span className="relative z-10">$2.99</span>
            </button>
          )}
        </div>
      </div>

      {/* Coin Packs */}
      <h2 className="text-lg font-black text-white mb-4 mt-10 flex items-center gap-2 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <span className="w-2 h-2 rounded-full bg-[#ffe600] shadow-[0_0_6px_rgba(255,230,0,0.8)]" />
        COIN PACKS
      </h2>
      <div className="space-y-3 mb-8">
        <CoinPack icon="🪙" name="500 Coins" desc="Starter pack" price="$0.99" bonus="" onClick={() => handlePurchase(STRIPE_LINKS.coins500)} color="#ffe600" delay="0.55s" />
        <CoinPack icon="💰" name="2,500 Coins" desc="Popular choice" price="$3.99" bonus="+250 BONUS" onClick={() => handlePurchase(STRIPE_LINKS.coins2500)} color="#ff8000" delay="0.6s" />
        <CoinPack icon="💎" name="10,000 Coins" desc="Best per-coin value" price="$9.99" bonus="+2,000 BONUS" onClick={() => handlePurchase(STRIPE_LINKS.coins10000)} color="#9933ff" delay="0.65s" />
      </div>

      {/* Season Pass */}
      <h2 className="text-lg font-black text-white mb-4 mt-10 flex items-center gap-2 animate-slide-up" style={{ animationDelay: '0.7s' }}>
        <span className="w-2 h-2 rounded-full bg-[#9933ff] shadow-[0_0_6px_rgba(153,51,255,0.8)]" />
        SEASON PASS
      </h2>
      <div className="game-card !p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.75s', background: 'linear-gradient(135deg, rgba(0,153,255,0.08), rgba(153,51,255,0.05))' }}>
        <div className="flex items-center gap-4">
          <span className="text-3xl">🛡️</span>
          <div className="flex-1">
            <h3 className="font-bold text-white">Season Pass</h3>
            <p className="text-white/35 text-sm">Unlock all premium games for this season</p>
          </div>
          <button
            onClick={() => handlePurchase(STRIPE_LINKS.seasonPass)}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-[#9933ff] hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer overflow-hidden shadow-[0_4px_15px_rgba(153,51,255,0.2)]"
          >
            <span className="relative z-10">$7.99</span>
          </button>
        </div>
      </div>

      {/* Comparison */}
      <div className="game-card !p-7 mb-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
        <h3 className="font-black text-white text-center mb-6 tracking-wider">WHY BUY ON THE WEBSITE?</h3>
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="group cursor-default">
            <div className="text-sm font-bold text-white/50 mb-2">App Store</div>
            <div className="text-4xl font-black text-white/30 group-hover:text-white/50 transition-colors duration-300">$2.99</div>
            <div className="text-xs text-white/25 mt-1">Apple takes 15-30%</div>
          </div>
          <div className="group cursor-default">
            <div className="text-sm font-black text-[#00ff80] mb-2 neon-glow-green">Website (Stripe)</div>
            <div className="text-4xl font-black text-[#00ff80] group-hover:scale-110 transition-transform duration-300">$2.99</div>
            <div className="text-xs text-white/25 mt-1">Only 2.9% + $0.30 fee</div>
          </div>
        </div>
        <p className="text-center text-white/30 text-xs mt-5">
          Same price for you, more revenue supports our development!
        </p>
      </div>

      {/* Security */}
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center gap-6 text-white/25 mb-3">
          <span className="text-sm hover:text-white/40 transition-colors">🔒 SSL Encrypted</span>
          <span className="text-sm hover:text-white/40 transition-colors">💳 Stripe Secure</span>
          <span className="text-sm hover:text-white/40 transition-colors">↩️ Refund Policy</span>
        </div>
        <p className="text-white/15 text-xs">
          All purchases are processed securely by Stripe. Digital purchases are non-refundable.
          <br />Physical items have a 30-day return policy.
        </p>
      </div>
    </div>
  );
}

function Perk({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-sm group cursor-default">
      <span className="transition-transform duration-300 group-hover:scale-125">{icon}</span>
      <span className="text-white/60 group-hover:text-white/80 transition-colors duration-300" style={{ color: undefined }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = color; }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = ''; }}
      >{text}</span>
    </div>
  );
}

function CoinPack({ icon, name, desc, price, bonus, onClick, color, delay }: {
  icon: string; name: string; desc: string; price: string; bonus: string; onClick: () => void; color: string; delay: string;
}) {
  return (
    <div className="game-card !p-5 flex items-center gap-4 group active:!scale-[0.99] animate-slide-up" style={{ animationDelay: delay }}>
      <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white">{name}</h3>
          {bonus && (
            <span className="text-[10px] font-black bg-[#00ff80]/15 text-[#00ff80] px-2 py-0.5 rounded-md border border-[#00ff80]/20 shadow-[0_0_8px_rgba(0,255,128,0.1)]">{bonus}</span>
          )}
        </div>
        <p className="text-white/35 text-xs">{desc}</p>
      </div>
      <button
        onClick={onClick}
        className="px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-105 active:scale-95 btn-shimmer overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 4px 15px ${color}20` }}
      >
        <span className="relative z-10">{price}</span>
      </button>
    </div>
  );
}

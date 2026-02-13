import { useState } from 'react';
import { isAdFree, setAdFree } from '../components/ads/AdConfig';

// ═══════════════════════════════════════════════════════════════
// PREMIUM PAGE — Web purchases via Stripe
//
// On the APP → digital purchases go through Apple StoreKit (required)
// On the WEB → digital purchases go through Stripe (you keep ~97%)
//
// This means web purchases have BETTER margins:
// - Apple takes 15-30% on iOS
// - Stripe takes only 2.9% + $0.30
//
// Encourage web purchases for better revenue!
// ═══════════════════════════════════════════════════════════════

// ⚠️ REPLACE WITH YOUR REAL STRIPE PAYMENT LINKS
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
    // After successful purchase, Stripe webhook would call your server
    // which would set ad-free status. For now, we set it locally.
    if (isDigital === 'adFree') {
      setAdFree(true);
    }
  };

  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Hero */}
      <section className="text-center py-12">
        <div className="text-7xl mb-4 animate-float">👑</div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3">
          <span className="bg-gradient-to-r from-[#ffe600] to-[#ff8000] bg-clip-text text-transparent">GO PREMIUM</span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">
          Remove ads, get coins, unlock exclusive content. Support SkillzStorm's mission to make learning addictive.
        </p>
        <div className="mt-4 inline-block px-4 py-1 rounded-full bg-[#00ff80]/10 border border-[#00ff80]/30">
          <span className="text-[#00ff80] text-sm font-bold">
            Web purchases = better value (lower fees than App Store!)
          </span>
        </div>
      </section>

      {/* Best Value: Premium Bundle */}
      <div className="relative mb-8">
        <div className="absolute -top-3 left-4 z-10 px-3 py-1 rounded-full text-xs font-black bg-[#ffe600] text-black">
          BEST VALUE
        </div>
        <div className="glass-card p-6 border-[#ffe600]/30" style={{ background: 'linear-gradient(135deg, rgba(255,230,0,0.08), rgba(255,128,0,0.05))' }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🏆</span>
            <div>
              <h2 className="text-xl font-black text-white">Premium Bundle</h2>
              <p className="text-white/50 text-sm">Ad-free + 5,000 coins + exclusive content</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-black text-[#00ff80]">$4.99</div>
              <div className="text-xs text-white/40 line-through">$12.99 value</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            <Perk icon="⭐" text="Remove all ads" />
            <Perk icon="🪙" text="5,000 coins" />
            <Perk icon="🎮" text="Exclusive games" />
            <Perk icon="🛡️" text="Premium badge" />
            <Perk icon="⚡" text="Early access" />
            <Perk icon="🎨" text="Exclusive skins" />
          </div>
          <button
            onClick={() => handlePurchase(STRIPE_LINKS.premiumBundle, 'adFree')}
            className="w-full gradient-gold py-4 rounded-xl font-bold text-lg text-black hover:opacity-90 transition-all"
          >
            Get Premium Bundle — $4.99
          </button>
        </div>
      </div>

      {/* Ad-Free */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl">⭐</span>
          <div className="flex-1">
            <h3 className="font-bold text-white">Remove Ads Forever</h3>
            <p className="text-white/40 text-sm">No banners, no interruptions, pure gaming.</p>
          </div>
          {userIsAdFree ? (
            <span className="px-4 py-2 rounded-xl text-sm font-bold bg-[#00ff80]/20 text-[#00ff80]">ACTIVE ✓</span>
          ) : (
            <button
              onClick={() => handlePurchase(STRIPE_LINKS.adFree, 'adFree')}
              className="px-6 py-2 rounded-xl font-bold text-white gradient-hero hover:opacity-90 transition-all"
            >
              $2.99
            </button>
          )}
        </div>
      </div>

      {/* Coin Packs */}
      <h2 className="text-lg font-bold text-white mb-4 mt-10">COIN PACKS</h2>
      <div className="space-y-3 mb-8">
        <CoinPack
          icon="🪙"
          name="500 Coins"
          desc="Starter pack"
          price="$0.99"
          bonus=""
          onClick={() => handlePurchase(STRIPE_LINKS.coins500)}
        />
        <CoinPack
          icon="💰"
          name="2,500 Coins"
          desc="Popular choice"
          price="$3.99"
          bonus="+250 BONUS"
          onClick={() => handlePurchase(STRIPE_LINKS.coins2500)}
        />
        <CoinPack
          icon="💎"
          name="10,000 Coins"
          desc="Best per-coin value"
          price="$9.99"
          bonus="+2,000 BONUS"
          onClick={() => handlePurchase(STRIPE_LINKS.coins10000)}
        />
      </div>

      {/* Season Pass */}
      <h2 className="text-lg font-bold text-white mb-4 mt-10">SEASON PASS</h2>
      <div className="glass-card p-6 mb-8" style={{ background: 'linear-gradient(135deg, rgba(0,153,255,0.08), rgba(153,51,255,0.05))' }}>
        <div className="flex items-center gap-4">
          <span className="text-3xl">🛡️</span>
          <div className="flex-1">
            <h3 className="font-bold text-white">Season Pass</h3>
            <p className="text-white/40 text-sm">Unlock all premium games for this season</p>
          </div>
          <button
            onClick={() => handlePurchase(STRIPE_LINKS.seasonPass)}
            className="px-6 py-2 rounded-xl font-bold text-white bg-[#9933ff] hover:opacity-90 transition-all"
          >
            $7.99
          </button>
        </div>
      </div>

      {/* Comparison */}
      <div className="glass-card p-6 mb-8">
        <h3 className="font-bold text-white text-center mb-4">WHY BUY ON THE WEBSITE?</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm font-bold text-white/60 mb-2">App Store</div>
            <div className="text-3xl font-black text-white/40">$2.99</div>
            <div className="text-xs text-white/30 mt-1">Apple takes 15-30%</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#00ff80] mb-2">Website (Stripe)</div>
            <div className="text-3xl font-black text-[#00ff80]">$2.99</div>
            <div className="text-xs text-white/30 mt-1">Only 2.9% + $0.30 fee</div>
          </div>
        </div>
        <p className="text-center text-white/40 text-xs mt-4">
          Same price for you, more revenue supports our development!
        </p>
      </div>

      {/* Security */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-6 text-white/30 mb-3">
          <span className="text-sm">🔒 SSL Encrypted</span>
          <span className="text-sm">💳 Stripe Secure</span>
          <span className="text-sm">↩️ Refund Policy</span>
        </div>
        <p className="text-white/20 text-xs">
          All purchases are processed securely by Stripe. Digital purchases are non-refundable.
          <br />Physical items have a 30-day return policy.
        </p>
      </div>
    </div>
  );
}

function Perk({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span>{icon}</span>
      <span className="text-white/70">{text}</span>
    </div>
  );
}

function CoinPack({ icon, name, desc, price, bonus, onClick }: {
  icon: string; name: string; desc: string; price: string; bonus: string; onClick: () => void;
}) {
  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-white">{name}</h3>
          {bonus && (
            <span className="text-[10px] font-black bg-[#00ff80]/20 text-[#00ff80] px-2 py-0.5 rounded-md">{bonus}</span>
          )}
        </div>
        <p className="text-white/40 text-xs">{desc}</p>
      </div>
      <button
        onClick={onClick}
        className="px-5 py-2 rounded-xl font-bold text-white gradient-hero hover:opacity-90 transition-all text-sm"
      >
        {price}
      </button>
    </div>
  );
}

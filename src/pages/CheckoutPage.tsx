import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TopBannerAd } from '../components/ads/AdBanner';

// ═══════════════════════════════════════════════════════════════
// STRIPE CHECKOUT PAGE
//
// This page handles:
// 1. Physical goods (VR headsets, 3D glasses, accessories) → Stripe Checkout
// 2. Digital premium (ad-free) → Stripe for web users
// 3. Viewing cart and proceeding to payment
//
// SETUP INSTRUCTIONS:
// 1. Go to https://dashboard.stripe.com
// 2. Get your Publishable Key (pk_live_...)
// 3. Set up products in Stripe Dashboard
// 4. Create a simple backend (or use Stripe Payment Links)
//    to create checkout sessions
// 5. Replace the placeholder key below
//
// STRIPE PAYMENT LINKS (easiest, no backend):
// - Go to Stripe Dashboard → Payment Links
// - Create a link for each product
// - Users click → Stripe handles everything
// - Money goes to your Stripe account instantly
//
// REVENUE: Stripe takes 2.9% + $0.30 per transaction
// You get paid out to your bank on a rolling 2-day basis
// ═══════════════════════════════════════════════════════════════

// ⚠️ REPLACE WITH YOUR REAL STRIPE PAYMENT LINKS
const STRIPE_LINKS: Record<string, string> = {
  // Physical Products → Stripe Payment Links
  // Create these at: https://dashboard.stripe.com/payment-links
  'vr_lite':      'https://buy.stripe.com/YOUR_LINK_vr_lite',
  'vr_pro':       'https://buy.stripe.com/YOUR_LINK_vr_pro',
  'vr_ultra':     'https://buy.stripe.com/YOUR_LINK_vr_ultra',
  '3d_basic':     'https://buy.stripe.com/YOUR_LINK_3d_basic',
  '3d_polarized': 'https://buy.stripe.com/YOUR_LINK_3d_polarized',
  '3d_clip':      'https://buy.stripe.com/YOUR_LINK_3d_clip',
  'controller':   'https://buy.stripe.com/YOUR_LINK_controller',
  'headphones':   'https://buy.stripe.com/YOUR_LINK_headphones',
  'stand':        'https://buy.stripe.com/YOUR_LINK_stand',
  // Digital Premium (web-only, app uses StoreKit)
  'ad_free':      'https://buy.stripe.com/YOUR_LINK_ad_free',
  'premium':      'https://buy.stripe.com/YOUR_LINK_premium',
  'coins_1000':   'https://buy.stripe.com/YOUR_LINK_coins',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  quantity: number;
}

export function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('skillzstorm_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch {}
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeItem = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('skillzstorm_cart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // If single item, open its Stripe Payment Link
    if (cart.length === 1 && STRIPE_LINKS[cart[0].id]) {
      window.open(STRIPE_LINKS[cart[0].id], '_blank');
      setIsProcessing(false);
      return;
    }
    
    // For multiple items: Redirect to a Stripe Checkout Session
    // This requires a small backend endpoint to create the session.
    // For now, we open the main store link.
    // 
    // TODO: When you set up your backend, create an endpoint like:
    // POST /api/create-checkout-session
    // that accepts cart items and returns a Stripe session URL
    
    window.open('https://buy.stripe.com/YOUR_MAIN_STORE_LINK', '_blank');
    setIsProcessing(false);
  };

  if (showSuccess) {
    return (
      <div className="pt-24 sm:pt-28 min-h-[100vh] w-full flex flex-col items-center justify-center text-center px-4">
        <div className="text-8xl mb-6 animate-float">🎉</div>
        <h1 className="text-3xl font-black text-white mb-3">ORDER CONFIRMED!</h1>
        <p className="text-white/60 mb-6 max-w-md">
          Thank you for your purchase! You'll receive a confirmation email shortly.
          Physical items typically ship within 2-3 business days.
        </p>
        <Link to="/" className="gradient-hero px-8 py-3 rounded-xl font-bold text-white">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 min-h-[100vh] w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <TopBannerAd />
      
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🛒</div>
        <h1 className="text-3xl font-black mb-2">
          <span className="bg-gradient-to-r from-[#ffe600] to-[#ff8000] bg-clip-text text-transparent">CHECKOUT</span>
        </h1>
        <p className="text-white/50">Secure payment powered by Stripe</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-white/50 text-lg mb-4">Your cart is empty</p>
          <Link to="/store" className="text-[#0099ff] font-bold">Browse the Store →</Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-3 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="game-card p-4 flex items-center gap-4">
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{item.name}</h3>
                  <p className="text-white/40 text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#00ff80]">${(item.price * item.quantity).toFixed(2)}</div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-400 hover:text-red-300 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="game-card p-6 mb-6">
            <h3 className="text-xs font-bold text-[#0099ff] tracking-wider mb-4">ORDER SUMMARY</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Shipping</span>
                <span className="text-[#00ff80]">{total >= 50 ? 'FREE' : '$4.99'}</span>
              </div>
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-[#00ff80] text-lg">
                    ${(total + (total >= 50 ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {total < 50 && (
              <p className="text-xs text-[#ffe600] mt-3">
                Add ${(50 - total).toFixed(2)} more for FREE shipping!
              </p>
            )}
          </div>

          {/* Email */}
          <div className="game-card p-4 mb-6">
            <label className="text-xs font-bold text-white/60 block mb-2">Email for order confirmation</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#0099ff]/50 transition-colors"
            />
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className={`w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-[1.01] ${
              isProcessing ? 'bg-gray-600 cursor-wait' : 'gradient-hero shadow-lg shadow-[#0099ff]/25 hover:shadow-[#0099ff]/40'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              `💳 Pay $${(total + (total >= 50 ? 0 : 4.99)).toFixed(2)} with Stripe`
            )}
          </button>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-white/30">
            <div className="flex items-center gap-1 text-xs">
              <span>🔒</span> SSL Encrypted
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span>💳</span> Stripe Secure
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span>↩️</span> 30-Day Returns
            </div>
          </div>

          <p className="text-center text-white/20 text-xs mt-4">
            You'll be redirected to Stripe's secure checkout to complete your purchase.
            <br />Physical items ship within 2-3 business days. Digital items are instant.
          </p>
        </>
      )}
    </div>
  );
}

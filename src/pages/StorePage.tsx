import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InArticleAd, TopBannerAd } from '../components/ads/AdBanner';

interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNum: number;
  emoji: string;
  category: string;
  features: string[];
  inStock: boolean;
  isPhysical: boolean;
}

const products: StoreProduct[] = [
  // VR Headsets (Physical → Stripe)
  { id: 'vr_lite', name: 'StormVR Lite', description: 'Phone-in-headset for immersive VR. Insert your iPhone, launch StormVR games, and learn in virtual reality.', price: '$29.99', priceNum: 29.99, emoji: '🥽', category: 'VR Headsets', features: ['Lightweight design', 'Adjustable straps', 'Works with iPhone/Android', 'Includes controller', 'Fits all ages'], inStock: true, isPhysical: true },
  { id: 'vr_pro', name: 'StormVR Pro', description: 'Premium standalone VR headset with built-in SkillzStorm. No phone needed. 6DOF tracking and hand tracking.', price: '$149.99', priceNum: 149.99, emoji: '🎧', category: 'VR Headsets', features: ['Standalone — no phone', 'Built-in SkillzStorm', 'High-res 2K displays', '6DOF head tracking', 'Hand tracking', '2-hour battery'], inStock: true, isPhysical: true },
  { id: 'vr_ultra', name: 'StormVR Ultra', description: 'Top-tier VR with eye tracking, haptic feedback, and 4K displays. Coming Q3 2026.', price: '$299.99', priceNum: 299.99, emoji: '🔮', category: 'VR Headsets', features: ['Eye tracking', 'Haptic controllers', '4K per-eye', 'Wireless streaming', 'Passthrough AR', '5-hour battery'], inStock: false, isPhysical: true },
  
  // 3D Glasses (Physical)
  { id: '3d_basic', name: 'Storm3D Basic', description: 'Pack of 5 red/cyan 3D glasses. Works with all Storm3D games on any screen.', price: '$4.99', priceNum: 4.99, emoji: '👓', category: '3D Glasses', features: ['Pack of 5', 'Classic red/cyan', 'Works on any screen', 'Scratch-resistant'], inStock: true, isPhysical: true },
  { id: '3d_polarized', name: 'Storm3D Polarized', description: 'Polarized 3D glasses for color-accurate, comfortable viewing.', price: '$14.99', priceNum: 14.99, emoji: '🕶️', category: '3D Glasses', features: ['Polarized lenses', 'No color distortion', 'Comfortable fit', 'Durable frame'], inStock: true, isPhysical: true },
  { id: '3d_clip', name: 'Storm3D Clip-On', description: 'Clip-on 3D lenses for people who wear glasses.', price: '$9.99', priceNum: 9.99, emoji: '👁️', category: '3D Glasses', features: ['Clips onto glasses', 'Universal fit', 'Flip-up design', 'Anti-scratch coating'], inStock: true, isPhysical: true },
  
  // Accessories (Physical)
  { id: 'controller', name: 'StormPad Controller', description: 'Bluetooth game controller optimized for SkillzStorm. Dedicated Storm button for quick actions.', price: '$24.99', priceNum: 24.99, emoji: '🎮', category: 'Accessories', features: ['Bluetooth 5.0', 'iOS & Android & Web', '8-hour battery', 'Storm button', 'Ergonomic design'], inStock: true, isPhysical: true },
  { id: 'headphones', name: 'StormSound Buds', description: 'Wireless earbuds with low-latency gaming mode and spatial audio.', price: '$19.99', priceNum: 19.99, emoji: '🎵', category: 'Accessories', features: ['Low latency mode', 'Spatial audio', '4-hour battery', 'Sweat-resistant'], inStock: true, isPhysical: true },
  { id: 'stand', name: 'StormStand', description: 'Adjustable tablet/phone stand for hands-free gaming.', price: '$12.99', priceNum: 12.99, emoji: '📱', category: 'Accessories', features: ['Adjustable angle', 'Foldable & portable', 'Anti-slip base', 'Fits all devices'], inStock: true, isPhysical: true },
];

const storeCategories = ['All', 'VR Headsets', '3D Glasses', 'Accessories'];

export function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<StoreProduct[]>([]);

  const filtered = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: StoreProduct) => {
    const updated = [...cart, product];
    setCart(updated);
    // Persist for checkout page
    const cartData = updated.map(p => ({ id: p.id, name: p.name, price: p.priceNum, emoji: p.emoji, quantity: 1 }));
    localStorage.setItem('skillzstorm_cart', JSON.stringify(cartData));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.priceNum, 0);

  return (
    <div className="pt-20 min-h-[100vh] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      <TopBannerAd />

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black mb-2">
          <span className="bg-gradient-to-r from-[#ffe600] to-[#ff8000] bg-clip-text text-transparent">STORM STORE</span>
        </h1>
        <p className="text-white/50">VR Headsets • 3D Glasses • Accessories</p>
        <p className="text-xs text-white/30 mt-1">All physical products ship to your door via Stripe secure checkout</p>
      </div>

      {/* Premium CTA */}
      <Link to="/premium" className="block mb-6">
        <div className="glass-card p-4 flex items-center justify-between border-[#ffe600]/20 hover:border-[#ffe600]/40 transition-all"
             style={{ background: 'linear-gradient(135deg, rgba(255,230,0,0.05), rgba(255,128,0,0.03))' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">👑</span>
            <div>
              <span className="font-bold text-white">Looking for Premium?</span>
              <span className="text-white/40 text-sm ml-2">Ad-free, coins, season pass</span>
            </div>
          </div>
          <span className="text-[#ffe600] font-bold text-sm">Go Premium →</span>
        </div>
      </Link>

      {/* VR Info CTA */}
      <Link to="/vr" className="block mb-6">
        <div className="glass-card p-4 flex items-center justify-between border-[#00e6e6]/20 hover:border-[#00e6e6]/40 transition-all"
             style={{ background: 'linear-gradient(135deg, rgba(0,230,230,0.05), rgba(0,153,255,0.03))' }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥽</span>
            <div>
              <span className="font-bold text-white">How does VR work?</span>
              <span className="text-white/40 text-sm ml-2">4 ways to play VR</span>
            </div>
          </div>
          <span className="text-[#00e6e6] font-bold text-sm">Learn More →</span>
        </div>
      </Link>

      {/* Category filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center">
        {storeCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#9933ff]/30 text-[#9933ff] border border-[#9933ff]/50'
                : 'bg-white/5 text-white/50 hover:bg-white/10 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className="glass-card p-4 flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span>🛒</span>
            <span className="font-bold text-white">{cart.length} items</span>
            <span className="text-[#00ff80] font-bold">${cartTotal.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="gradient-hero px-6 py-2 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all"
          >
            Checkout with Stripe →
          </Link>
        </div>
      )}

      {/* Products */}
      <div className="space-y-4">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>

      <InArticleAd />

      {/* Shipping info */}
      <div className="glass-card p-6 mt-8">
        <h3 className="font-bold text-white text-center mb-4">SHIPPING & PAYMENT</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-2">📦</div>
            <div className="text-sm font-bold text-white">2-3 Day Shipping</div>
            <div className="text-xs text-white/40">Standard delivery</div>
          </div>
          <div>
            <div className="text-2xl mb-2">🆓</div>
            <div className="text-sm font-bold text-[#00ff80]">Free Over $50</div>
            <div className="text-xs text-white/40">Free shipping</div>
          </div>
          <div>
            <div className="text-2xl mb-2">↩️</div>
            <div className="text-sm font-bold text-white">30-Day Returns</div>
            <div className="text-xs text-white/40">Easy returns</div>
          </div>
        </div>
      </div>

      {/* Stripe badge */}
      <div className="text-center mt-8 text-white/30 text-sm flex items-center justify-center gap-2">
        <span>🔒</span>
        <span>Powered by Stripe • Secure Payments • 256-bit SSL</span>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }: { product: StoreProduct; onAddToCart: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card p-5 cursor-pointer transition-all hover:border-white/20" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center gap-4">
        <div className="text-4xl w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white">{product.name}</h3>
            <span className="text-[8px] font-black bg-[#0099ff]/20 text-[#0099ff] px-2 py-0.5 rounded-md">SHIPS</span>
          </div>
          <p className="text-white/50 text-sm line-clamp-1">{product.description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-bold text-[#00ff80] text-lg">{product.price}</div>
          {!product.inStock && <div className="text-xs text-gray-500 font-bold">COMING SOON</div>}
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {product.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <span className="text-[#00ff80]">✓</span>
                <span className="text-white/60">{f}</span>
              </div>
            ))}
          </div>
          {product.inStock && (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
              className="w-full gradient-hero py-3 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-all"
            >
              🛒 Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
}

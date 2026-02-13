import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { GamesPage } from './pages/GamesPage'
import { GameDetailPage } from './pages/GameDetailPage'
import { StorePage } from './pages/StorePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { VRPage } from './pages/VRPage'
import { PremiumPage } from './pages/PremiumPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { Navbar } from './components/Navbar'
import { BottomStickyAd } from './components/ads/AdBanner'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0d0d1f]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:category" element={<GamesPage />} />
          <Route path="/game/:gameId" element={<GameDetailPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/vr" element={<VRPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
        {/* Sticky bottom banner ad — auto-hides for ad-free users */}
        <BottomStickyAd />
      </div>
    </Router>
  )
}

export default App

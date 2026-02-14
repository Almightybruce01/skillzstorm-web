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
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { SchoolsPage } from './pages/SchoolsPage'
import { AccessibilityPage } from './pages/AccessibilityPage'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BottomStickyAd } from './components/ads/AdBanner'

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-[#0d0d1f] flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/schools" element={<SchoolsPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
          </Routes>
        </main>
        <Footer />
        {/* Sticky bottom banner ad — auto-hides for ad-free users */}
        <BottomStickyAd />
      </div>
    </Router>
  )
}

export default App

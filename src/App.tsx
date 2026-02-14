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
import { ArcadePage } from './pages/ArcadePage'
import { DashboardPage } from './pages/DashboardPage'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { BottomStickyAd } from './components/ads/AdBanner'

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-[#0d0d1f] flex flex-col relative">
        {/* Global animated color-shifting background */}
        <div className="bg-aurora-global" />
        <div className="bg-grid-overlay" />

        {/* Floating accent particles */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute w-1 h-1 rounded-full bg-[#0099ff] top-[20%] left-[15%] animate-float opacity-30" style={{ animationDuration: '5s' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#9933ff] top-[40%] left-[75%] animate-float opacity-20" style={{ animationDuration: '7s', animationDelay: '1s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-[#00e6e6] top-[60%] left-[35%] animate-float opacity-25" style={{ animationDuration: '4s', animationDelay: '2s' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#ff3399] top-[15%] left-[85%] animate-float opacity-15" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-[#ffe600] top-[75%] left-[10%] animate-float opacity-20" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-[#00ff80] top-[35%] left-[55%] animate-float opacity-20" style={{ animationDuration: '4.5s', animationDelay: '3s' }} />
          <div className="absolute w-1 h-1 rounded-full bg-[#ff8000] top-[85%] left-[65%] animate-float opacity-15" style={{ animationDuration: '6.5s', animationDelay: '2.5s' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-[#0099ff] top-[50%] left-[90%] animate-float opacity-20" style={{ animationDuration: '5s', animationDelay: '4s' }} />
        </div>

        <Navbar />
        <main className="flex-1 w-full relative z-10">
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
            <Route path="/arcade" element={<ArcadePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
        <Footer />
        <BottomStickyAd />
      </div>
    </Router>
  )
}

export default App

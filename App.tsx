
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { IndividualShowroom } from './pages/IndividualShowroom';
import { CorporatePage } from './pages/CorporatePage';
import { DealersPage } from './pages/DealersPage';
import { OrderTracking } from './pages/OrderTracking';
import { CarDetails } from './pages/CarDetails';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('empathon_admin_session');
    if (session === 'valid') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    // Scroll listener for "Back to Top" button
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem('empathon_admin_session', 'valid');
    setIsAuthenticated(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) return null;

  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden relative">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showroom" element={<IndividualShowroom />} />
            <Route path="/corporate" element={<CorporatePage />} />
            <Route path="/dealers" element={<DealersPage />} />
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/showroom/:id" element={<CarDetails />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <AdminDashboard />
                ) : (
                  <AdminLogin onLogin={handleLogin} />
                )
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Scroll to Top Button */}
        <button 
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-40 w-12 h-12 bg-white text-black rounded-full shadow-lg shadow-black/30 flex items-center justify-center border border-black/20 transition-all duration-500 transform hover:scale-110 hover:bg-white/90 ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </Router>
  );
};

export default App;

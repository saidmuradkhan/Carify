import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import HomePage from './pages/HomePage';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import CarsPage from './Components/Cars/CarsPage';
import CarDetail from './Components/Cars/CarDetail';
import BlogPage from './Components/Blog/BlogPage';
import BlogDetail from './Components/Blog/BlogDetail';
import AboutPage from './Components/About/AboutPage';
import FaqPage from './Components/FAQ/FaqPage';
import ContactPage from './Components/Contact/ContactPage';
import Calculator from './Components/Calculator/Calculator';
import WishlistPage from './Components/Wishlist/WishlistPage';
import ShipmentsPage from './Components/Shipments/ShipmentsPage';
import TrackingPage from './Components/Tracking/TrackingPage';
import CarOrderModal from './Components/Modals/CarOrderModal';

function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <AuthProvider>
      <WishlistProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/shipments" element={<ShipmentsPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
            </Routes>
          </main>
          <Footer />
          <CarOrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
          <button 
            type="button"
            aria-label="Looking for a specific car from Korea?"
            className="floating-order-btn"
            onClick={() => setIsOrderModalOpen(true)}
          >
            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 8.5H21M9 14.5H18M16.5 22L9 26.5V22H6C4.80653 22 3.66193 21.5259 2.81802 20.682C1.97411 19.8381 1.5 18.6935 1.5 17.5V5.5C1.5 4.30653 1.97411 3.16193 2.81802 2.31802C3.66193 1.47411 4.80653 1 6 1H24C25.1935 1 26.3381 1.47411 27.182 2.31802C28.0259 3.16193 28.5 4.30653 28.5 5.5V14.5M21 28L28.5 20.5M28.5 20.5V27.25M28.5 20.5H21.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaRegHeart, FaRegUser, FaBars, FaTimes, FaChevronDown, FaCrosshairs } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { WishlistContext } from '../../context/WishlistContext';
import './Navbar.css';

function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-link')) {
        setOpenDropdown(null);
      }
      if (!e.target.closest('.lang-switcher')) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    setIsLangMenuOpen(false);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const navClass = `navbar ${isHome && !isScrolled ? 'navbar-transparent' : 'navbar-solid'}`;

  return (
    <header className={navClass}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/logo/logo.webp" alt="Carify Logo" className="logo-img" />
        </Link>

        <nav className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
            <FaTimes />
          </button>
          <ul>
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/cars" onClick={() => setIsMobileMenuOpen(false)}>Cars</Link></li>
            
            {/* About Us Dropdown */}
            <li className="dropdown-link">
              <button 
                className="dropdown-trigger" 
                onClick={() => toggleDropdown('about')}
              >
                <span className={openDropdown === 'about' ? 'active-dropdown-text' : ''}>
                  About Us
                </span> 
                <FaChevronDown className="nav-chevron" />
              </button>
              {openDropdown === 'about' && (
                <div className="nav-dropdown-menu">
                  <Link to="/about" onClick={() => { setOpenDropdown(null); setIsMobileMenuOpen(false); }}>About Us</Link>
                  <Link to="/blog" onClick={() => { setOpenDropdown(null); setIsMobileMenuOpen(false); }}>Blog</Link>
                  <Link to="/shipments" onClick={() => { setOpenDropdown(null); setIsMobileMenuOpen(false); }}>Our Shipping</Link>
                </div>
              )}
            </li>

            {/* Services Dropdown */}
            <li className="dropdown-link">
              <button 
                className="dropdown-trigger" 
                onClick={() => toggleDropdown('services')}
              >
                <span className={openDropdown === 'services' ? 'active-dropdown-text' : ''}>
                  Services
                </span> 
                <FaChevronDown className="nav-chevron" />
              </button>
              {openDropdown === 'services' && (
                <div className="nav-dropdown-menu">
                  <Link to="/calculator" onClick={() => { setOpenDropdown(null); setIsMobileMenuOpen(false); }}>Car Inspection</Link>
                  <Link to="/cars" onClick={() => { setOpenDropdown(null); setIsMobileMenuOpen(false); }}>Car Search</Link>
                  <Link to="/shipments" onClick={() => { setOpenDropdown(null); setIsMobileMenuOpen(false); }}>Car Delivery</Link>
                </div>
              )}
            </li>

            <li><Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>Documents</Link></li>
            <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <div className="lang-switcher">
            <button className="nav-icon-btn lang-btn" onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}>
              {i18n.language.toUpperCase()} <FaChevronDown className="nav-chevron" />
            </button>
            {isLangMenuOpen && (
              <div className="lang-dropdown">
                <button onClick={() => changeLanguage('en')}>EN</button>
                <button onClick={() => changeLanguage('az')}>AZ</button>
                <button onClick={() => changeLanguage('ru')}>RU</button>
              </div>
            )}
          </div>

          <Link to="/login" className="nav-icon-btn">
            <FaRegUser />
          </Link>

          <Link to="/wishlist" className="nav-icon-btn wishlist-btn">
            <FaRegHeart />
            {wishlist.length > 0 && <span className="wishlist-count">{wishlist.length}</span>}
          </Link>

          <Link to="/tracking" className="btn-tracking">
            <FaCrosshairs /> Tracking
          </Link>

          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(true)}>
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

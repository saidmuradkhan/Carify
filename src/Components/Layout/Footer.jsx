import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaFacebookF, FaTelegramPlane, FaWhatsapp, FaTiktok, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/logo/logo-red.png" alt="Carify Logo" />
          </Link>
          <p className="footer-desc">
            Cənubi Koreyadan Azərbaycana və MDB ölkələrinə birbaşa, vasitəçisiz avtomobil ixracı. Hər zaman güvəndə!
          </p>
        </div>

        <div className="footer-links">
          <h4>Sürətli Keçidlər</h4>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/cars">{t('nav.cars')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
            <li><Link to="/calculator">{t('nav.services')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Əlaqə</h4>
          <ul>
            <li>
              <FaPhone className="contact-icon" />
              <a href="tel:+821072167665">+82 10 7216 7665 (Koreya)</a>
            </li>
            <li>
              <FaPhone className="contact-icon" />
              <a href="tel:+994777665665">+994 77 766 5665 (Azərbaycan)</a>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:orkhan.h@carify-global.com">orkhan.h@carify-global.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Bizi İzləyin</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/carify.kr" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/carify.az" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://t.me/carifykr" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
            <a href="https://wa.me/821072167665" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="https://www.tiktok.com/@carify.llc" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Carify LLC. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

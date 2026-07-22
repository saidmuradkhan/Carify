import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="page-title">Əlaqə</h1>
        
        <div className="contact-layout">
          <div className="contact-form-wrapper">
            <h2>Bizə Yazın</h2>
            {submitted && <div className="success-msg">Mesajınız göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.</div>}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Ad və Soyad</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Adınız" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-poçtunuz" required />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+994 XX XXX XX XX" />
              </div>
              <div className="form-group">
                <label>Mesaj</label>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Mesajınız..." required></textarea>
              </div>
              <button type="submit" className="btn-primary">Göndər</button>
            </form>
          </div>

          <div className="contact-info-wrapper">
            <h2>Əlaqə Məlumatları</h2>
            
            <div className="contact-info-list">
              <div className="contact-info-item">
                <FaMapMarkerAlt className="contact-info-icon" />
                <div>
                  <h4>Koreya Ofisi</h4>
                  <p>490 Jungbong-daero, Seo-gu, Incheon, South Korea</p>
                </div>
              </div>
              <div className="contact-info-item">
                <FaPhone className="contact-info-icon" />
                <div>
                  <h4>Telefon</h4>
                  <p><a href="tel:+821072167665">+82 10 7216 7665 (Koreya)</a></p>
                  <p><a href="tel:+994777665665">+994 77 766 5665 (Azərbaycan)</a></p>
                </div>
              </div>
              <div className="contact-info-item">
                <FaEnvelope className="contact-info-icon" />
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:orkhan.h@carify-global.com">orkhan.h@carify-global.com</a></p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <h4>Sosial Media</h4>
              <div className="social-icons">
                <a href="https://www.instagram.com/carify.kr" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://www.facebook.com/carify.az" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                <a href="https://t.me/carifykr" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
                <a href="https://wa.me/821072167665" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

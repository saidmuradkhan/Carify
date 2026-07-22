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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
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
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Adınız" className={errors.name ? 'input-error' : ''} />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-poçtunuz" className={errors.email ? 'input-error' : ''} />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+994 XX XXX XX XX" />
              </div>
              <div className="form-group">
                <label>Mesaj</label>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Mesajınız..." className={errors.message ? 'input-error' : ''}></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
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

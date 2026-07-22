import { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import './Hero.css';

function Hero() {
  const [containerNo, setContainerNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    new URL('../../assets/hero.png', import.meta.url).href,
    new URL('../../assets/hero1.webp', import.meta.url).href,
    new URL('../../assets/hero2.webp', import.meta.url).href,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((index) => (index + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!containerNo) return;
    
    setLoading(true);
    setResult(null);

    // Mock API call simulation
    setTimeout(() => {
      setLoading(false);
      setResult('Konteyneriniz hazırda Cənubi Koreya, Busan limanındadır.');
    }, 2000);
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-overlay"></div>
        {heroImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Carify Hero Background"
            className={`hero-image ${index === currentImage ? 'active' : ''}`}
          />
        ))}
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title">
          Track Your Container -Always Safe<br />With Carify!
        </h1>
        
        <form onSubmit={handleSearch} className="hero-search-form">
          <input 
            type="text" 
            placeholder="Container Number" 
            value={containerNo}
            onChange={(e) => setContainerNo(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {result && (
          <div className="hero-search-result">
            <p>{result}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;

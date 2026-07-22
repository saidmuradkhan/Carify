import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './Brands.css';

function Brands() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get('/brands');
        setBrands(response.data);
      } catch (error) {
        console.error("Markaları yükləyərkən xəta:", error);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) return null;

  return (
    <section className="section brands">
      <div className="container">
        <h2 className="section-title">Markalar</h2>
        <div className="brands-grid">
          {brands.map(brand => (
            <div key={brand.id} className="brand-card">
              <img src={brand.loqo_url} alt={brand.ad} className="brand-logo" />
              <p className="brand-name">{brand.ad}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Brands;

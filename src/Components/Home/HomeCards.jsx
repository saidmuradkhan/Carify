import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import CarCard from '../Cars/CarCard';
import './HomeCards.css';

function HomeCards() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Just fetch the first 8 cars for the homepage
        const response = await api.get('/cars?_limit=8');
        setCars(response.data);
      } catch (error) {
        console.error("Maşınları yükləyərkən xəta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <section className="section home-cards">
      <div className="container">
        <div className="home-cards-header">
          <h2 className="section-title">Yeni Gələn Avtomobillər</h2>
          <Link to="/cars" className="view-all-link">Hamısına bax</Link>
        </div>
        
        {loading ? (
          <p>Yüklənir...</p>
        ) : (
          <div className="cars-grid">
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeCards;

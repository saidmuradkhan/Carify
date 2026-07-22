import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../context/WishlistContext';
import CarCard from '../Cars/CarCard';
import { FaHeartBroken } from 'react-icons/fa';
import './WishlistPage.css';

function WishlistPage() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="page-title">Seçilmişlər ({wishlist.length})</h1>
        
        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <FaHeartBroken className="empty-icon" />
            <h3>Seçilmişlər siyahınız boşdur</h3>
            <p>Bəyəndiyiniz avtomobilləri seçilmişlərə əlavə edin</p>
            <Link to="/cars" className="btn-primary">Avtomobillərə bax</Link>
          </div>
        ) : (
          <div className="cars-grid">
            {wishlist.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;

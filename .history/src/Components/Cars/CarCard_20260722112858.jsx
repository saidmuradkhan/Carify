import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { WishlistContext } from '../../context/WishlistContext';
import './CarCard.css';

function CarCard({ car }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const isWished = isInWishlist(car.id);

  const toggleWishlist = (e) => {
    e.preventDefault(); // prevent navigation when clicking heart
    if (isWished) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <Link to={`/cars/${car.id}`} className="car-card">
      <div className="car-card-img">
        {/* FIX: db.json-da sahə "sekil" adlanır, "sekiller" deyil */}
        <img src={car.sekil || 'https://placehold.co/400x300'} alt={`${car.marka} ${car.model}`} />
        <button className="wishlist-toggle" onClick={toggleWishlist}>
          {isWished ? <FaHeart className="wished" /> : <FaRegHeart />}
        </button>
        {car.status && (
          <div className={`status-badge ${car.status === 'Stokda' ? 'in-stock' : 'sold'}`}>
            {car.status}
          </div>
        )}
      </div>
      
      <div className="car-card-body">
        <h3 className="car-title">{car.marka} {car.model}</h3>
        <p className="car-price">${car.qiymet_usd?.toLocaleString()}</p>
        
        <div className="car-specs">
          <div className="spec-item">
            <span>İl</span>
            <strong>{car.il}</strong>
          </div>
          <div className="spec-item">
            <span>Yürüş</span>
            <strong>{car.yurus_km?.toLocaleString()} km</strong>
          </div>
          <div className="spec-item">
            <span>Yanacaq</span>
            <strong>{car.yanacaq_novu}</strong>
          </div>
          <div className="spec-item">
            <span>Mühərrik</span>
            {/* FIX: sahə "muherrik_hecmi_l" deyil, "muherrik_hecmi"-dir */}
            <strong>{car.muherrik_hecmi} L</strong>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
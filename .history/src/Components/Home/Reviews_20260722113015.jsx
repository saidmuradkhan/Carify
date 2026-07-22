import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';
import { WishlistContext } from '../../context/WishlistContext';
import { FaHeart, FaRegHeart, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import './CarDetail.css';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Avtomobil tapılmadı:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
    setSelectedImage(0);
  }, [id]);

  if (loading) return <div className="detail-loading">Yüklənir...</div>;
  if (!car) return <div className="detail-loading">Avtomobil tapılmadı</div>;

  const isWished = isInWishlist(car.id);

  const toggleWishlist = () => {
    if (isWished) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  // FIX: db.json-da qalereya massivi "foto" adlanır ("sekiller" deyil).
  // Əgər "foto" boşdursa, ən azı əsas "sekil" şəklini göstər.
  const gallery = car.foto && car.foto.length > 0 ? car.foto : (car.sekil ? [car.sekil] : []);

  return (
    <div className="car-detail-page">
      <div className="container">
        <Link to="/cars" className="back-link"><FaArrowLeft /> Geri qayıt</Link>
        
        <div className="detail-layout">
          <div className="detail-gallery">
            <div className="gallery-main">
              <img 
                src={gallery[selectedImage] || 'https://placehold.co/600x400'} 
                alt={`${car.marka} ${car.model}`} 
              />
            </div>
            {gallery.length > 1 && (
              <div className="gallery-thumbs">
                {gallery.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`${car.marka} ${car.model} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="detail-info">
            <div className="detail-header">
              <div>
                <h1>{car.marka} {car.model}</h1>
                <p className="detail-price">${car.qiymet_usd?.toLocaleString()}</p>
              </div>
              <div className={`status-badge ${car.status === 'Stokda' ? 'in-stock' : 'sold'}`}>
                {car.status}
              </div>
            </div>

            <div className="detail-specs">
              <div className="spec-row">
                <span>İl</span>
                <strong>{car.il}</strong>
              </div>
              <div className="spec-row">
                <span>Yürüş</span>
                <strong>{car.yurus_km?.toLocaleString()} km</strong>
              </div>
              <div className="spec-row">
                <span>Yanacaq Növü</span>
                <strong>{car.yanacaq_novu}</strong>
              </div>
              <div className="spec-row">
                {/* FIX: "muherrik_hecmi_l" deyil, "muherrik_hecmi" */}
                <span>Mühərrik Həcmi</span>
                <strong>{car.muherrik_hecmi}L</strong>
              </div>
              {/* FIX: "oturucu" və "reng" db.json-da olmaya bilər, conditional göstərilir
                  ki, "undefined" görünməsin. Bu sahələri db.json-a əlavə etsən avtomatik çıxacaq. */}
              {car.oturucu && (
                <div className="spec-row">
                  <span>Ötürücü</span>
                  <strong>{car.oturucu}</strong>
                </div>
              )}
              {car.reng && (
                <div className="spec-row">
                  <span>Rəng</span>
                  <strong>{car.reng}</strong>
                </div>
              )}
              {car.boya_qalinligi && (
                <div className="spec-row">
                  <span>Boya Qalınlığı</span>
                  <strong>{car.boya_qalinligi}</strong>
                </div>
              )}
              {car.qeza_tarixcesi && (
                <div className="spec-row">
                  <span>Qəza Tarixçəsi</span>
                  <strong>{car.qeza_tarixcesi}</strong>
                </div>
              )}
            </div>

            {car.qeydler && (
              <div className="detail-notes">
                <h3>Qeydlər</h3>
                <p>{car.qeydler}</p>
              </div>
            )}

            <div className="detail-actions">
              <button className={`btn-wishlist ${isWished ? 'wished' : ''}`} onClick={toggleWishlist}>
                {isWished ? <FaHeart /> : <FaRegHeart />}
                {isWished ? 'Seçilmişlərdən sil' : 'Seçilmişlərə əlavə et'}
              </button>
              <a 
                href="https://wa.me/821072167665" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp"
              >
                <FaWhatsapp /> WhatsApp ilə əlaqə
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
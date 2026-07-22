import { Link } from 'react-router-dom';
import './Shipments.css';

function Shipments() {
  return (
    <section className="section shipments-section">
      <div className="container">
        <div className="section-header-modern">
          <h2 className="section-title-modern">Our Shipping</h2>
          <Link to="/shipments" className="btn-show-all">Show All</Link>
        </div>
        
        <div className="shipping-showcase-card">
          <div className="shipping-showcase-header">
            <div className="shipping-logo-circle">
              <span className="logo-text-small">CARIFY</span>
            </div>
            <h3 className="shipping-models">
              Kia Sorento (2020) &nbsp; Hyundai Santafe (2016) &nbsp; Kia Sorento (2022) &nbsp; Chevrolet Malibu (2016)
            </h3>
          </div>

          <div className="shipping-images-row">
            <div className="ship-img-wrapper">
              <img src="https://flagcdn.com/w320/az.png" alt="Azerbaijan" className="flag-img" />
            </div>
            <div className="ship-img-wrapper">
              <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/blog/1.jpg" alt="Container" />
            </div>
            <div className="ship-img-wrapper">
              <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/blog/2.jpg" alt="Container open" />
            </div>
            <div className="ship-img-wrapper">
              <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/blog/3.jpg" alt="Car 1" />
            </div>
            <div className="ship-img-wrapper">
              <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/blog/4.jpg" alt="Car 2" />
            </div>
            <div className="ship-img-wrapper">
              <img src="https://carify-llc.fra1.cdn.digitaloceanspaces.com/uploads/blog/5.jpg" alt="Car 3" />
            </div>
          </div>

          <div className="shipping-footer-info">
            <span>Shipping date: 3 July 2026</span>
            <span className="divider">|</span>
            <span>Destination country: Baku/Azerbaijan</span>
            <span className="divider">|</span>
            <span>Arrival date: 3 September 2026</span>
            <span className="divider">|</span>
            <span>Shipping type: Container</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shipments;

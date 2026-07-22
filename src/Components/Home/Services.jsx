import { FaSearch, FaBox, FaCog, FaPhoneAlt, FaPercent } from 'react-icons/fa';
import './Services.css';

function Services() {
  const servicesData = [
    {
      id: 1,
      title: "Car search",
      description: "Discover your next car with ease — whether through auctions, online sales, or the local market.",
      icon: <FaSearch />
    },
    {
      id: 2,
      title: "Vehicle delivery",
      description: "Safe and fast vehicle delivery directly to your designated location.",
      icon: <FaBox />
    },
    {
      id: 3,
      title: "Discount Auto Parts",
      description: "Get high-quality auto parts at discounted prices for all models.",
      icon: <FaCog />
    },
    {
      id: 4,
      title: "Customs Clearance",
      description: "We handle all customs paperwork to ensure a smooth import process.",
      icon: <FaPhoneAlt />
    },
    {
      id: 5,
      title: "Car loan",
      description: "Coming Soon...",
      icon: <FaPercent />,
      isComingSoon: true
    }
  ];

  return (
    <section className="section services-section">
      <div className="container">
        <h2 className="section-title-modern">Services</h2>
        
        <div className="services-modern-grid">
          {servicesData.map(service => (
            <div key={service.id} className={`service-modern-card ${service.isComingSoon ? 'coming-soon' : ''}`}>
              <div className="service-modern-icon">
                {service.icon}
              </div>
              <div className="service-modern-content">
                <h4 className="service-modern-title">{service.title}</h4>
                <p className="service-modern-desc">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

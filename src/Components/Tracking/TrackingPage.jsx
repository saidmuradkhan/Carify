import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './TrackingPage.css';

function TrackingPage() {
  const [containerNumber, setContainerNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!containerNumber.trim()) return;
    
    // Mock search - in real app this would query an API
    setSearchResult({
      containerNumber: containerNumber,
      status: 'In Transit',
      origin: 'Incheon, South Korea',
      destination: 'Baku, Azerbaijan',
      departureDate: '2026-07-03',
      estimatedArrival: '2026-09-03',
      shippingType: 'Container'
    });
  };

  return (
    <div className="tracking-page">
      <div className="tracking-layout">
        <div className="tracking-sidebar">
          <form className="tracking-search-form" onSubmit={handleSearch}>
            <div className="tracking-input-wrapper">
              <input 
                type="text" 
                placeholder="Container Number" 
                value={containerNumber}
                onChange={(e) => setContainerNumber(e.target.value)}
                className="tracking-input"
              />
            </div>
            <button type="submit" className="tracking-search-btn">Search</button>
          </form>

          {searchResult && (
            <div className="tracking-result">
              <h3>Container: {searchResult.containerNumber}</h3>
              <div className="tracking-info-list">
                <div className="tracking-info-item">
                  <span className="info-label">Status:</span>
                  <span className="info-value status-transit">{searchResult.status}</span>
                </div>
                <div className="tracking-info-item">
                  <span className="info-label">Origin:</span>
                  <span className="info-value">{searchResult.origin}</span>
                </div>
                <div className="tracking-info-item">
                  <span className="info-label">Destination:</span>
                  <span className="info-value">{searchResult.destination}</span>
                </div>
                <div className="tracking-info-item">
                  <span className="info-label">Departure:</span>
                  <span className="info-value">{searchResult.departureDate}</span>
                </div>
                <div className="tracking-info-item">
                  <span className="info-label">ETA:</span>
                  <span className="info-value">{searchResult.estimatedArrival}</span>
                </div>
                <div className="tracking-info-item">
                  <span className="info-label">Type:</span>
                  <span className="info-value">{searchResult.shippingType}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="tracking-map">
          {import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
            <img 
              src={`https://maps.googleapis.com/maps/api/staticmap?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=48.95332224489578,-0.5055356019877122&zoom=2&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=1200x800`}
              alt="Tracking Map" 
              className="static-tracking-map"
            />
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              <p>Google Maps API Key is missing.</p>
              <p>Please add <code>VITE_GOOGLE_MAPS_API_KEY=your_key_here</code> to your <code>.env</code> file.</p>
              <iframe 
                title="Tracking Map Fallback"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000000!2d50!3d40!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2saz!4v1700000000000!5m2!1sen!2saz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;

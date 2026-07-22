import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FaShip, FaCalendarAlt } from 'react-icons/fa';
import './ShipmentsPage.css';

function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await api.get('/shipments');
        setShipments(response.data);
      } catch (error) {
        console.error("Göndərmələri yükləyərkən xəta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, []);

  return (
    <div className="shipments-page">
      <div className="container">
        <h1 className="page-title">Göndərmələr</h1>
        {loading ? (
          <p className="loading-text">Yüklənir...</p>
        ) : (
          <div className="shipments-page-grid">
            {shipments.map(shipment => (
              <div key={shipment.id} className="shipment-card">
                <div className="shipment-icon">
                  <FaShip />
                </div>
                <div className="shipment-info">
                  <h4>{shipment.tip} - {shipment.olke}</h4>
                  <div className="shipment-date">
                    <FaCalendarAlt />
                    <span>Çıxış: {shipment.gonderme_tarixi}</span>
                  </div>
                  <div className="shipment-date">
                    <FaCalendarAlt />
                    <span>Gözlənilən Çatma: {shipment.catma_tarixi}</span>
                  </div>
                  <div className="shipment-cars">
                    <strong>Avtomobillər: </strong>
                    {shipment.masinlar.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShipmentsPage;

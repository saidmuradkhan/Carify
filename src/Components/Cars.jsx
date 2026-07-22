import { useEffect, useState } from "react";
import api from "../api/axios";

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Yüklənir...</p>;

  return (
    <div className="cars-grid">
      {cars.map((car) => (
        <div key={car.id} className="car-card">
          <img src={car.sekil} alt={`${car.marka} ${car.model}`} />
          <h3>{car.marka}, {car.model}</h3>
          <p>{car.yurus_km.toLocaleString()} km</p>
          <p>{car.muherrik_hecmi} L / {car.yanacaq_novu}</p>
          <p>{car.il}</p>
          <p>$ {car.qiymet_usd.toLocaleString()}</p>
          <span>{car.status}</span>
        </div>
      ))}
    </div>
  );
}

export default CarsPage;
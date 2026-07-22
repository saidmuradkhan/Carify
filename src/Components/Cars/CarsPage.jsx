import { useState, useEffect } from 'react';
import api from '../../api/axios';
import FilterSidebar from './FilterSidebar';
import CarCard from './CarCard';
import './CarsPage.css';

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    marka: '',
    yanacaq_novu: '',
    qiymet_min: '',
    qiymet_max: '',
    il_min: '',
    status: '',
    sort: ''
  });

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

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        let query = '/cars?';
        
        if (filters.marka) query += `marka=${filters.marka}&`;
        if (filters.yanacaq_novu) query += `yanacaq_novu=${filters.yanacaq_novu}&`;
        if (filters.qiymet_min) query += `qiymet_usd_gte=${filters.qiymet_min}&`;
        if (filters.qiymet_max) query += `qiymet_usd_lte=${filters.qiymet_max}&`;
        if (filters.il_min) query += `il_gte=${filters.il_min}&`;
        if (filters.status) query += `status=${filters.status}&`;
        
        if (filters.sort) {
          if (filters.sort === 'qiymet_asc') query += '_sort=qiymet_usd&_order=asc&';
          if (filters.sort === 'qiymet_desc') query += '_sort=qiymet_usd&_order=desc&';
          if (filters.sort === 'il_desc') query += '_sort=il&_order=desc&';
          if (filters.sort === 'il_asc') query += '_sort=il&_order=asc&';
        }

        const response = await api.get(query);
        setCars(response.data);
      } catch (error) {
        console.error("Maşınları yükləyərkən xəta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [filters]);

  return (
    <div className="cars-page">
      <div className="container">
        <h1 className="page-title">Avtomobillər</h1>
        <div className="cars-layout">
          <FilterSidebar filters={filters} setFilters={setFilters} brands={brands} />
          <div className="cars-content">
            <div className="cars-count">
              <p>{cars.length} avtomobil tapıldı</p>
            </div>
            {loading ? (
              <p className="loading-text">Yüklənir...</p>
            ) : cars.length === 0 ? (
              <p className="no-results">Heç bir avtomobil tapılmadı</p>
            ) : (
              <div className="cars-grid">
                {cars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarsPage;

import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './FilterSidebar.css';

function FilterSidebar({ filters, setFilters, brands }) {
  const yanacaqNovleri = ['Benzin', 'Dizel', 'Hibrid', 'Elektrik', 'LPG'];

  const handleChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFilters({
      marka: '',
      yanacaq_novu: '',
      qiymet_min: '',
      qiymet_max: '',
      il_min: '',
      status: '',
      sort: ''
    });
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filtrlər</h3>
        <button className="filter-reset" onClick={handleReset}>Sıfırla</button>
      </div>

      <div className="filter-group">
        <label>Marka</label>
        <select value={filters.marka} onChange={(e) => handleChange('marka', e.target.value)}>
          <option value="">Hamısı</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.ad}>{brand.ad}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Yanacaq Növü</label>
        <select value={filters.yanacaq_novu} onChange={(e) => handleChange('yanacaq_novu', e.target.value)}>
          <option value="">Hamısı</option>
          {yanacaqNovleri.map(nov => (
            <option key={nov} value={nov}>{nov}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Qiymət ($)</label>
        <div className="filter-range">
          <input 
            type="number" 
            placeholder="Min" 
            value={filters.qiymet_min} 
            onChange={(e) => handleChange('qiymet_min', e.target.value)}
          />
          <span>-</span>
          <input 
            type="number" 
            placeholder="Max" 
            value={filters.qiymet_max} 
            onChange={(e) => handleChange('qiymet_max', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Minimum İl</label>
        <input 
          type="number" 
          placeholder="Məs: 2018" 
          value={filters.il_min} 
          onChange={(e) => handleChange('il_min', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={(e) => handleChange('status', e.target.value)}>
          <option value="">Hamısı</option>
          <option value="Stokda">Stokda</option>
          <option value="Satılıb">Satılıb</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sıralama</label>
        <select value={filters.sort} onChange={(e) => handleChange('sort', e.target.value)}>
          <option value="">Standart</option>
          <option value="qiymet_asc">Qiymət: Artan</option>
          <option value="qiymet_desc">Qiymət: Azalan</option>
          <option value="il_desc">İl: Ən yeni</option>
          <option value="il_asc">İl: Ən köhnə</option>
        </select>
      </div>
    </aside>
  );
}

export default FilterSidebar;

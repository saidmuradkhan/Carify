import React, { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';
import api from '../../api/axios';
import './CarOrderModal.css';

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear + 1 - i); // 2027..1990
const MILEAGE_OPTIONS = [0, 10000, 20000, 30000, 50000, 75000, 100000, 150000, 200000, 250000, 300000];
const FUEL_TYPES = ['Benzin', 'Dizel', 'Hibrid', 'Elektrik', 'LPG'];
const PARTS_OPTIONS = ['Yoxdur', '1 hissə', '2 hissə', '3 və çox hissə'];
const COUNTRY_CODES = [
  { code: '+994', flag: 'az', label: 'AZ' },
  { code: '+82', flag: 'kr', label: 'KR' },
  { code: '+7', flag: 'ru', label: 'RU' },
  { code: '+1', flag: 'us', label: 'US' },
];

const initialFormData = {
  brand: '',
  model: '',
  subModel: '',
  yearFrom: '',
  yearTo: '',
  engineCapacity: '',
  fuelType: '',
  mileageFrom: '',
  mileageTo: '',
  color: '',
  repaintedParts: '',
  changedParts: '',
  priceFrom: '',
  priceTo: '',
  customerName: '',
  phoneNumber: '',
  notes: '',
};

function CarOrderModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // FIX: input dəyişən kimi həmin sahənin xəta mesajını təmizlə
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const requiredFields = [
    'brand', 'model', 'yearFrom', 'yearTo', 'engineCapacity',
    'mileageFrom', 'mileageTo', 'repaintedParts', 'changedParts',
    'priceFrom', 'priceTo', 'customerName', 'phoneNumber',
  ];

  const validate = () => {
    const newErrors = {};
    const errorMessages = {
      brand: 'Brand is required',
      model: 'Model is required',
      yearFrom: 'Manufacturing year is required',
      yearTo: 'Manufacturing year is required',
      engineCapacity: 'Engine capacity is required',
      mileageFrom: 'Mileage is required',
      mileageTo: 'Mileage is required',
      repaintedParts: 'Painted parts are required',
      changedParts: 'Changed parts are required',
      priceFrom: 'Price from is required',
      priceTo: 'Price to is required',
      customerName: 'Customer name is required',
      phoneNumber: 'Phone number is required',
    };
    requiredFields.forEach((field) => {
      if (!String(formData[field]).trim()) {
        newErrors[field] = errorMessages[field] || 'This field is required';
      }
    });
    if (formData.yearFrom && formData.yearTo && Number(formData.yearFrom) > Number(formData.yearTo)) {
      newErrors.yearTo = 'Year to must be greater than year from';
    }
    if (formData.priceFrom && formData.priceTo && Number(formData.priceFrom) > Number(formData.priceTo)) {
      newErrors.priceTo = 'Price to must be greater than price from';
    }
    return newErrors;
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitStatus(null);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus(null);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);
    try {
      // FIX: əvvəllər form heç yerə göndərilmirdi. İndi json-server-in
      // "/carOrders" endpoint-inə POST edilir.
      await api.post('/carOrders', {
        ...formData,
        phone: `${countryCode.code} ${formData.phoneNumber}`,
        tarix: new Date().toISOString(),
      });
      setSubmitStatus('success');
      setFormData(initialFormData);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Sifariş göndərilərkən xəta:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="order-modal-overlay" onClick={handleClose}>
      <div className="order-modal-content" onClick={e => e.stopPropagation()}>
        <div className="order-modal-header">
          <h2>Car Order Form</h2>
          <button className="close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="order-status order-status-success">
            Sifarişiniz uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="order-status order-status-error">
            Sifariş göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
          </div>
        )}

        <form className="order-modal-form" onSubmit={handleSubmit} noValidate>
          {/* Brand */}
          <div className="form-group full-width">
            <label><span className="req">*</span> Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="Enter Brand"
              value={formData.brand}
              onChange={handleChange}
              className={errors.brand ? 'input-error' : ''}
            />
            {errors.brand && <span className="error-message">{errors.brand}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Model</label>
              <input
                type="text"
                name="model"
                placeholder="Enter Model"
                value={formData.model}
                onChange={handleChange}
                className={errors.model ? 'input-error' : ''}
              />
              {errors.model && <span className="error-message">{errors.model}</span>}
            </div>
            <div className="form-group">
              <label>Sub-Model <FaInfoCircle className="info-icon" /></label>
              <input
                type="text"
                name="subModel"
                placeholder="Enter Sub-Model"
                value={formData.subModel}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Year</label>
            <div className="form-row">
              <div className="form-group">
                <select
                  name="yearFrom"
                  value={formData.yearFrom}
                  onChange={handleChange}
                  className={errors.yearFrom ? 'input-error' : ''}
                >
                  <option value="" disabled>From Year</option>
                  {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                {errors.yearFrom && <span className="error-message">{errors.yearFrom}</span>}
              </div>
              <div className="form-group">
                <select
                  name="yearTo"
                  value={formData.yearTo}
                  onChange={handleChange}
                  className={errors.yearTo ? 'input-error' : ''}
                >
                  <option value="" disabled>To Year</option>
                  {YEAR_OPTIONS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                {errors.yearTo && <span className="error-message">{errors.yearTo}</span>}
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Engine capacity</label>
              <input
                type="text"
                name="engineCapacity"
                placeholder="E.g. 2200 cc"
                value={formData.engineCapacity}
                onChange={handleChange}
                className={errors.engineCapacity ? 'input-error' : ''}
              />
              {errors.engineCapacity && <span className="error-message">{errors.engineCapacity}</span>}
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                <option value="" disabled>Choose Fuel Type</option>
                {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Mileage</label>
            <div className="form-row">
              <div className="form-group">
                <select
                  name="mileageFrom"
                  value={formData.mileageFrom}
                  onChange={handleChange}
                  className={errors.mileageFrom ? 'input-error' : ''}
                >
                  <option value="" disabled>From km</option>
                  {MILEAGE_OPTIONS.map((m) => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
                </select>
                {errors.mileageFrom && <span className="error-message">{errors.mileageFrom}</span>}
              </div>
              <div className="form-group">
                <select
                  name="mileageTo"
                  value={formData.mileageTo}
                  onChange={handleChange}
                  className={errors.mileageTo ? 'input-error' : ''}
                >
                  <option value="" disabled>To km</option>
                  {MILEAGE_OPTIONS.map((m) => <option key={m} value={m}>{m.toLocaleString()} km</option>)}
                </select>
                {errors.mileageTo && <span className="error-message">{errors.mileageTo}</span>}
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Color</label>
            <input
              type="text"
              name="color"
              placeholder="White, Black, Gray"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Repainted parts <FaInfoCircle className="info-icon" /></label>
              <select
                name="repaintedParts"
                value={formData.repaintedParts}
                onChange={handleChange}
                className={errors.repaintedParts ? 'input-error' : ''}
              >
                <option value="" disabled>Choose</option>
                {PARTS_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.repaintedParts && <span className="error-message">{errors.repaintedParts}</span>}
            </div>
            <div className="form-group">
              <label><span className="req">*</span> Changed parts <FaInfoCircle className="info-icon" /></label>
              <select
                name="changedParts"
                value={formData.changedParts}
                onChange={handleChange}
                className={errors.changedParts ? 'input-error' : ''}
              >
                <option value="" disabled>Choose</option>
                {PARTS_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.changedParts && <span className="error-message">{errors.changedParts}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Price from</label>
              <input
                type="text"
                name="priceFrom"
                placeholder="Min price ($)"
                value={formData.priceFrom}
                onChange={handleChange}
                className={errors.priceFrom ? 'input-error' : ''}
              />
              {errors.priceFrom && <span className="error-message">{errors.priceFrom}</span>}
            </div>
            <div className="form-group">
              <label><span className="req">*</span> Price to</label>
              <input
                type="text"
                name="priceTo"
                placeholder="Max price ($)"
                value={formData.priceTo}
                onChange={handleChange}
                className={errors.priceTo ? 'input-error' : ''}
              />
              {errors.priceTo && <span className="error-message">{errors.priceTo}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Customer Name</label>
            <input
              type="text"
              name="customerName"
              placeholder="Enter Your Name"
              value={formData.customerName}
              onChange={handleChange}
              className={errors.customerName ? 'input-error' : ''}
            />
            {errors.customerName && <span className="error-message">{errors.customerName}</span>}
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Phone Number</label>
            <div className="phone-input">
              <div className="country-code" onClick={() => setIsCountryOpen(!isCountryOpen)}>
                <img src={`https://flagcdn.com/w20/${countryCode.flag}.png`} alt={countryCode.label} className="flag-icon" />
                <span>{countryCode.code}</span>
                <span>&#9662;</span>
                {isCountryOpen && (
                  <div className="country-dropdown">
                    {COUNTRY_CODES.map((c) => (
                      <button
                        type="button"
                        key={c.code}
                        onClick={(e) => { e.stopPropagation(); setCountryCode(c); setIsCountryOpen(false); }}
                      >
                        <img src={`https://flagcdn.com/w20/${c.flag}.png`} alt={c.label} className="flag-icon" />
                        {c.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="XX XXX XX XX"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'input-error' : ''}
              />
            </div>
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group full-width">
            <label>Notes <FaInfoCircle className="info-icon" /></label>
            <input
              type="text"
              name="notes"
              placeholder="Add Additional Options and Notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-send-order" disabled={submitting}>
            {submitting ? 'Göndərilir...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CarOrderModal;
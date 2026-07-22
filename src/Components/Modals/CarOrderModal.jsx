import React from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';
import './CarOrderModal.css';

function CarOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-content" onClick={e => e.stopPropagation()}>
        <div className="order-modal-header">
          <h2>Car Order Form</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form className="order-modal-form">
          {/* Brand */}
          <div className="form-group full-width">
            <label><span className="req">*</span> Brand</label>
            <input type="text" placeholder="Enter Brand" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Model</label>
              <input type="text" placeholder="Enter Model" />
            </div>
            <div className="form-group">
              <label>Sub-Model <FaInfoCircle className="info-icon" /></label>
              <input type="text" placeholder="Enter Sub-Model" />
            </div>
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Year</label>
            <div className="form-row">
              <select defaultValue=""><option value="" disabled>From Year</option></select>
              <select defaultValue=""><option value="" disabled>To Year</option></select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Engine capacity</label>
              <input type="text" placeholder="E.g. 2200 cc" />
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select defaultValue=""><option value="" disabled>Choose Fuel Type</option></select>
            </div>
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Mileage</label>
            <div className="form-row">
              <select defaultValue=""><option value="" disabled>From km</option></select>
              <select defaultValue=""><option value="" disabled>To km</option></select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Color</label>
            <input type="text" placeholder="White, Black, Gray" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Repainted parts <FaInfoCircle className="info-icon" /></label>
              <select defaultValue=""><option value="" disabled>Choose</option></select>
            </div>
            <div className="form-group">
              <label><span className="req">*</span> Changed parts <FaInfoCircle className="info-icon" /></label>
              <select defaultValue=""><option value="" disabled>Choose</option></select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> Price from</label>
              <input type="text" placeholder="Min price ($)" />
            </div>
            <div className="form-group">
              <label><span className="req">*</span> Price to</label>
              <input type="text" placeholder="Max price ($)" />
            </div>
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Customer Name</label>
            <input type="text" placeholder="Enter Your Name" />
          </div>

          <div className="form-group full-width">
            <label><span className="req">*</span> Phone Number</label>
            <div className="phone-input">
              <div className="country-code">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="flag-icon"/> <span>&#9662;</span>
              </div>
              <input type="text" placeholder="+1" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Notes <FaInfoCircle className="info-icon" /></label>
            <input type="text" placeholder="Add Additional Options and Notes" />
          </div>

          <button type="button" className="btn-send-order">Send</button>
        </form>
      </div>
    </div>
  );
}

export default CarOrderModal;

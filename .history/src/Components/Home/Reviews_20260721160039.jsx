import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FaStar } from 'react-icons/fa';
import './Reviews.css';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get('/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error("Rəyləri yükləyərkən xəta:", error);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="section reviews">
      <div className="container">
        <h2 className="section-title">Müştəri Rəyləri</h2>
        <div className="reviews-scroll">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <h4 className="review-author">{review.ad}</h4>
                  <p className="review-car">{review.masin_modeli}</p>
                </div>
                <span className="review-country">{review.olke}</span>
              </div>
              <div className="review-stars">
                {[...Array(review.reytinq)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="review-text">{review.metn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;

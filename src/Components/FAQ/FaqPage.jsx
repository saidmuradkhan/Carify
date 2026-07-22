import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FaChevronDown } from 'react-icons/fa';
import './FaqPage.css';

function FaqPage() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await api.get('/faq');
        setFaqData(response.data);
      } catch (error) {
        console.error("FAQ yükləyərkən xəta:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <h1 className="page-title">Tez-tez Verilən Suallar</h1>
        {loading ? (
          <p className="loading-text">Yüklənir...</p>
        ) : (
          <div className="faq-list">
            {faqData.map(item => (
              <div key={item.id} className={`faq-item ${activeId === item.id ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(item.id)}>
                  <span>{item.sual}</span>
                  <FaChevronDown className="faq-icon" />
                </button>
                <div className="faq-answer">
                  <p>{item.cavab}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FaqPage;

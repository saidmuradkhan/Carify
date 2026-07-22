import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './AboutPage.css';

function AboutPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/team');
        setTeam(response.data);
      } catch (error) {
        console.error("Komandanı yükləyərkən xəta:", error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">Haqqımızda</h1>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Carify LLC</h2>
            <p>
              Carify LLC Cənubi Koreyadan Azərbaycana və digər MDB ölkələrinə birbaşa avtomobil ixrac edən şirkətdir. 
              Mərkəzi ofisimiz Cənubi Koreyanın İnçxon şəhərində yerləşir, Bakıda isə nümayəndəliyimiz fəaliyyət göstərir.
            </p>
            <p>
              Biz müştərilərimizə hərrac, onlayn satış platformaları və yerli bazar vasitəsilə avtomobil seçimi, 
              yerində yoxlama, foto və video hesabat, sığortalı daşınma və gömrük rəsmiləşdirilməsi xidmətləri təqdim edirik.
            </p>
            <p>
              8-dən çox ölkəyə avtomobil çatdıraraq, vasitəçisiz birbaşa xidmət göstəririk. 
              Müştəri məmnuniyyəti bizim əsas prioritetimizdir.
            </p>
          </div>

          <div className="about-stats">
            <div className="about-stat-item">
              <span className="about-stat-number">500+</span>
              <span className="about-stat-label">Avtomobil</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">300+</span>
              <span className="about-stat-label">Müştəri</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">8+</span>
              <span className="about-stat-label">Ölkə</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">3+</span>
              <span className="about-stat-label">İllik Təcrübə</span>
            </div>
          </div>
        </div>

        {team.length > 0 && (
          <div className="team-section">
            <h2 className="section-title">Komandamız</h2>
            <div className="team-grid">
              {team.map(member => (
                <div key={member.id} className="team-card">
                  <div className="team-photo">
                    {/* FIX: db.json-da sahə "foto" adlanır, "foto_url" deyil */}
                    <img src={member.foto} alt={member.ad_soyad} />
                  </div>
                  {/* FIX: db.json-da ad və soyad ayrı sahə deyil, tək "ad_soyad" sahəsidir */}
                  <h3>{member.ad_soyad}</h3>
                  <p className="team-role">{member.vezife}</p>
                  <p className="team-country">{member.olke}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutPage;
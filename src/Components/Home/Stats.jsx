import { FaTrophy, FaGlobe, FaSmile, FaTags, FaDollarSign, FaShieldAlt } from 'react-icons/fa';
import './Stats.css';

function Stats() {
  const statsData = [
    {
      id: 1,
      icon: <FaTrophy />,
      title: 'Təcrübə və Peşəkarlıq',
      desc: 'İllərin təcrübəsi və mütəxəssis komandamızla ən yaxşı xidməti göstəririk.'
    },
    {
      id: 2,
      icon: <FaGlobe />,
      title: 'Qlobal Şəbəkə',
      desc: 'Mərkəzi Cənubi Koreyada olmaqla, MDB və Avropa daxil 8 ölkəyə avtomobil çatdırırıq.'
    },
    {
      id: 3,
      icon: <FaSmile />,
      title: 'Müştəri Məmnuniyyəti',
      desc: 'Hər bir müştərimizə yüksək keyfiyyətli xidmət təqdim edirik.'
    },
    {
      id: 4,
      icon: <FaTags />,
      title: 'Rəqabətli Qiymətlər',
      desc: 'Avtomobil idxalı və ixracı sektorunda ən rəqabətli qiymətləri təklif edirik.'
    },
    {
      id: 5,
      icon: <FaDollarSign />,
      title: 'Sərfəli Tariflər',
      desc: 'Etibarlılıq və keyfiyyəti qoruyaraq sərfəli daşınma tarifləri təmin edirik.'
    },
    {
      id: 6,
      icon: <FaShieldAlt />,
      title: 'Sığortalı Daşınma',
      desc: 'Avtomobilləriniz 5000$-a qədər sığortalı daşınma ilə güvənli əllərdədir.'
    }
  ];

  return (
    <section className="section stats">
      <div className="container">
        <h2 className="section-title">Niyə Biz?</h2>
        <div className="stats-grid">
          {statsData.map(stat => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon-wrapper">
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <h4 className="stat-title">{stat.title}</h4>
              </div>
              <p className="stat-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;

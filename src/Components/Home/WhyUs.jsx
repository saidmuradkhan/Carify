import { FaDollarSign, FaShieldAlt, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import './WhyUs.css';

function WhyUs() {
  const reasons = [
    {
      icon: <FaDollarSign />,
      title: 'Experience and Professionalism',
      description: 'With a few years of experience and a team of specialists, we provide the best services.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Global Network',
      description: 'Headquartered in Incheon, South Korea, with an office in Baku. We deliver cars to 8 countries across the CIS and Europe — a direct bridge between the Korean market and the buyer, no middlemen.'
    },
    {
      icon: <FaHeadset />,
      title: 'Customer Satisfaction',
      description: 'Always providing high-quality service to each of our satisfied customers.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Competitive Prices',
      description: 'Offering the most competitive prices in the car import and export sector.'
    },
    {
      icon: <FaHeadset />,
      title: 'Affordable Rates',
      description: 'Ensuring affordable transportation rates while maintaining trust and quality.'
    },
    {
      icon: <FaDollarSign />,
      title: 'Insured Transportation',
      description: 'Your cars are in safe hands with insured transportation up to $5000.'
    },
    {
      icon: <FaDollarSign />,
      title: 'Efficient Customer Service',
      description: 'Prioritizing quick and safe delivery of cars to clients.'
    }
  ];

  return (
    <section className="section why-us-section">
      <div className="container">
        <h2 className="section-title-modern">Why Us?</h2>
        <div className="why-us-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="why-us-card">
              <div className="why-us-header">
                <div className="why-us-icon">{reason.icon}</div>
                <h3 className="why-us-title">{reason.title}</h3>
              </div>
              <p className="why-us-desc">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;

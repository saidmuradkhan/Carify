import { useState } from 'react';
import './Process.css';

function Process() {
  const steps = [
    {
      title: 'Step 1: Office Visit and Contract Signing',
      content: 'When the client visits our office, we welcome them and explain our services in detail. The client reviews the contract terms, and once agreed, both parties sign the contract.'
    },
    {
      title: 'Step 2: Payment for Services and Car Search',
      content: 'After the client pays the designated service fee, we begin searching for a car matching their requirements. When a suitable car is found, detailed information is provided to the client.'
    },
    {
      title: 'Step 3: Car Inspection and Presentation',
      content: 'Carify LLC team in Korea performs a full on-site inspection: body, underbody, and engine bay, a paint-depth reading, and the car\'s official accident history. The client receives 5 videos and more than 50 photos. In addition, we provide computer diagnostics of the vehicle as a free service for our clients.'
    },
    {
      title: 'Step 4: Car Reservation and Payment',
      content: 'The inspection materials and official documents are presented to the client. If the client approves the car, it is reserved in the buyer\'s name, and the export documents are issued directly in the buyer\'s name. Payment is made by bank transfer within 3 business days based on the official invoice.'
    },
    {
      title: 'Step 5: Car Delivery to Parking Center and Export Documents',
      content: 'As soon as the payment reaches our company\'s account in Korea, the car is paid for in full and brought to our own 60-car yard in Korea. All documentation and preparation procedures are completed here before shipment.'
    },
    {
      title: 'Step 6: Preparing the Car for Export',
      content: 'Within 14 business days from the purchase date, the car is preparing for shipment. There are two ways to deliver the buyer, with a container or RoRo (Roll on, Roll off).'
    },
    {
      title: 'Step 7: Car Delivery',
      content: 'The client is notified 3-10 days before the car arrives in the destination country. Any remaining balance is paid at this stage, and the exact handover date and location are provided.'
    },
    {
      title: 'Step 8: Customs Clearance',
      content: 'The client approaches the customs clearance point with identification documents to receive the car and begin the customs clearance process.'
    }
  ];

  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="process-section container">
      <h2 className="section-title">Vehicle Purchase Process</h2>
      
      <div className="process-layout">
        <div className="process-steps-container">
          <div className="process-steps">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`process-step ${activeStep === index ? 'active' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <h4>{step.title}</h4>
                {activeStep === index && (
                  <div className="step-content">
                    <p>{step.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="process-video">
          <div className="plyr__video-embed video-iframe-container" id="player">
            <iframe 
              id="youtube-6178" 
              frameBorder="0" 
              allowFullScreen 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              title="Player for Ordering Car from Korea, Step 1: Office Visit and Contract Signing" 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/3LoiX7KQ0dQ?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;

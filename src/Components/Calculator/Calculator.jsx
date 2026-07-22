import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './Calculator.css';

function Calculator() {
  const [rates, setRates] = useState(null);
  const [formData, setFormData] = useState({
    istehsal_ili: '',
    muherrik_novu: 'Benzin',
    muherrik_hecmi: '',
    invoys_deyeri: '',
    neqliyyat_xerci: '',
    diger_xercler: ''
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await api.get('/customsRates');
        if (response.data.length > 0) {
          setRates(response.data[0]);
        }
      } catch (error) {
        console.error("Gömrük tarifləri yüklənərkən xəta:", error);
      }
    };
    fetchRates();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculate = (e) => {
    e.preventDefault();
    if (!rates) return;

    const invoys = parseFloat(formData.invoys_deyeri) || 0;
    const neqliyyat = parseFloat(formData.neqliyyat_xerci) || 0;
    const diger = parseFloat(formData.diger_xercler) || 0;
    const hecm = parseFloat(formData.muherrik_hecmi) || 0;

    // Simplified customs calculation based on rates
    const gomrukRusumu = invoys * (rates.gomruk_rusumu_faiz / 100);
    const edv = (invoys + gomrukRusumu + neqliyyat) * (rates.edv_faiz / 100);
    const aksiz = hecm * rates.aksiz_her_sm3;
    
    const toplam = invoys + neqliyyat + diger + gomrukRusumu + edv + aksiz;

    setResult({
      invoys,
      neqliyyat,
      diger,
      gomrukRusumu: Math.round(gomrukRusumu),
      edv: Math.round(edv),
      aksiz: Math.round(aksiz),
      toplam: Math.round(toplam)
    });
  };

  return (
    <div className="calculator-page">
      <div className="container">
        <h1 className="page-title">Gömrük Kalkulyatoru</h1>
        
        <div className="calculator-layout">
          <form onSubmit={calculate} className="calculator-form">
            <div className="form-group">
              <label>İstehsal İli</label>
              <input type="number" name="istehsal_ili" value={formData.istehsal_ili} onChange={handleChange} placeholder="Məs: 2020" required />
            </div>
            
            <div className="form-group">
              <label>Mühərrik Növü</label>
              <select name="muherrik_novu" value={formData.muherrik_novu} onChange={handleChange}>
                <option>Benzin</option>
                <option>Dizel</option>
                <option>Hibrid</option>
                <option>Elektrik</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mühərrik Həcmi (sm³)</label>
              <input type="number" name="muherrik_hecmi" value={formData.muherrik_hecmi} onChange={handleChange} placeholder="Məs: 2000" required />
            </div>

            <div className="form-group">
              <label>İnvoys Dəyəri ($)</label>
              <input type="number" name="invoys_deyeri" value={formData.invoys_deyeri} onChange={handleChange} placeholder="Məs: 15000" required />
            </div>

            <div className="form-group">
              <label>Nəqliyyat Xərci ($)</label>
              <input type="number" name="neqliyyat_xerci" value={formData.neqliyyat_xerci} onChange={handleChange} placeholder="Məs: 1500" />
            </div>

            <div className="form-group">
              <label>Digər Xərclər ($)</label>
              <input type="number" name="diger_xercler" value={formData.diger_xercler} onChange={handleChange} placeholder="Məs: 200" />
            </div>

            <button type="submit" className="btn-primary">Hesabla</button>
          </form>

          <div className="calculator-result">
            <h2>Nəticə</h2>
            {result ? (
              <div className="result-table">
                <div className="result-row">
                  <span>İnvoys Dəyəri</span>
                  <strong>${result.invoys.toLocaleString()}</strong>
                </div>
                <div className="result-row">
                  <span>Nəqliyyat Xərci</span>
                  <strong>${result.neqliyyat.toLocaleString()}</strong>
                </div>
                <div className="result-row">
                  <span>Digər Xərclər</span>
                  <strong>${result.diger.toLocaleString()}</strong>
                </div>
                <div className="result-row">
                  <span>Gömrük Rüsumu</span>
                  <strong>${result.gomrukRusumu.toLocaleString()}</strong>
                </div>
                <div className="result-row">
                  <span>ƏDV</span>
                  <strong>${result.edv.toLocaleString()}</strong>
                </div>
                <div className="result-row">
                  <span>Aksiz</span>
                  <strong>${result.aksiz.toLocaleString()}</strong>
                </div>
                <div className="result-row total">
                  <span>Toplam Xərc</span>
                  <strong>${result.toplam.toLocaleString()}</strong>
                </div>
              </div>
            ) : (
              <p className="result-placeholder">Hesablama nəticəsi burada göstəriləcək</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;

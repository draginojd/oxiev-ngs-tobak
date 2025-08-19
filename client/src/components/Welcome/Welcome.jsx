import React from 'react'
import './Welcome.css'

export default function Welcome(){
  return (
    <section className="welcome-section">
      <div className="container">
        <h2 className="welcome-title">Välkommen till Oxievångs Tobak</h2>
        <p className="welcome-sub">Vi är din lokala spelbutik i Oxie, specialiserade på alla former av spel och betting. Med lång erfarenhet och personlig service hjälper vi dig med allt från Svenska Spel till ATG och mycket mer.</p>

        <div className="welcome-grid">
          <div className="welcome-item">
            <div className="welcome-icon" aria-hidden>
              {/* Use the ATG QR image from public for reliable QR scanning */}
              <img src="/qr-atg.svg" alt="QR ATG" />
            </div>
            <h4>Enkel inloggning</h4>
            <p className="small">QR-koder för snabb åtkomst till dina spelkonton</p>
          </div>

          <div className="welcome-item">
            <div className="welcome-icon"><i className="codicon codicon-location" aria-hidden></i></div>
            <h4>Lokalt i Oxie</h4>
            <p className="small">Mitt i Oxie med lätt tillgång och parkering</p>
          </div>

          <div className="welcome-item">
            <div className="welcome-icon"><i className="codicon codicon-clock" aria-hidden></i></div>
            <h4>Personlig service</h4>
            <p className="small">Kunnig personal som hjälper dig med alla frågor</p>
          </div>
        </div>
      </div>
    </section>
  )
}

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
            <div className="welcome-icon qr" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect width="24" height="24" rx="2" fill="none" />
                {/* white QR modules to contrast the dark red circle */}
                <rect x="2" y="2" width="6" height="6" fill="currentColor" />
                <rect x="3.6" y="3.6" width="2.8" height="2.8" fill="currentColor" />

                <rect x="15" y="2" width="6" height="6" fill="currentColor" />
                <rect x="16.6" y="3.6" width="2.8" height="2.8" fill="currentColor" />

                <rect x="2" y="15" width="6" height="6" fill="currentColor" />
                <rect x="3.6" y="16.6" width="2.8" height="2.8" fill="currentColor" />

                {/* inner modules */}
                <rect x="9" y="6" width="2" height="2" fill="currentColor" />
                <rect x="12" y="6" width="2" height="2" fill="currentColor" />
                <rect x="9" y="9" width="2" height="2" fill="currentColor" />
                <rect x="14" y="10" width="2" height="2" fill="currentColor" />
                <rect x="11" y="12" width="2" height="2" fill="currentColor" />
                <rect x="7" y="14" width="2" height="2" fill="currentColor" />
                <rect x="13" y="15" width="2" height="2" fill="currentColor" />
                <rect x="17" y="17" width="2" height="2" fill="currentColor" />
              </svg>
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

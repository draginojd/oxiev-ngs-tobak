import React from 'react'
import './FindUs.css'

export default function FindUs() {
  return (
    <section id="find-us" className="findus-section">
      <div className="container">
        <h2>Hitta butik</h2>

        <div className="findus-grid">
          <div className="findus-info">
            <p><strong>Oxievångs Tobak</strong></p>
            <p>Oxievångstorget 5<br/>238 41 Oxie, Malmö</p>
            <p>Telefon: <a href="tel:+46701234567">070-123 45 67</a></p>
            <h4>Öppettider</h4>
            <ul>
              <li>Måndag–Fredag: 09:00–19:00</li>
              <li>Lördag: 10:00–16:00</li>
              <li>Söndag: Stängt</li>
            </ul>
          </div>

          <div className="findus-map">
            <a href="https://www.google.com/maps/search/?api=1&query=Oxiev%C3%A5ngstorget+5+Malm%C3%B6" target="_blank" rel="noreferrer noopener">Öppna i Google Maps</a>
            <div className="map-preview" aria-hidden>
              {/* Simple placeholder using background-image from public */}
              <img src="/hero-shop.svg" alt="Karta eller bild på butik" style={{width: '100%', borderRadius: 8}} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

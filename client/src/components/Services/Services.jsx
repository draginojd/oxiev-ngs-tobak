import React from 'react'
import './Services.css'

const ServiceCard = ({ title, desc, img, children, elevated = false, cta }) => (
  <div className={`service-card ${elevated ? 'elevated' : ''}`}>
    <div className="service-card-inner">
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{desc}</p>

      <div className="qr-wrapper" aria-hidden>
        <div className="qr-plate">
          <img src={img} alt={`${title} QR`} className="qr-img" />
        </div>
      </div>

      {children}

      <div className="card-cta">
        <a className="btn-red" href="#" onClick={(e) => e.preventDefault()}>
          {cta || `Logga in på ${title}`}
        </a>
      </div>
    </div>
  </div>
)

export default function Services() {
  return (
    <section className="services-section" id="projects">
      <div className="container">
        <h2 className="section-title">Spela hos oss</h2>
        <div className="services-grid">
          <ServiceCard
            title="Svenska Spel"
            desc="Logga in enkelt med QR-koden nedan"
            img="/qr-svenska.svg"
            cta="Logga in på Svenska Spel"
          >
            <p className="service-note">Scanna QR-koden med din mobil för att logga in på Svenska Spel</p>
          </ServiceCard>

          <ServiceCard
            title="ATG"
            desc="Auktoriserad ATG-återförsäljare med fullständig service"
            img="/qr-atg.svg"
            elevated
            cta="Logga in på ATG"
          >
            <div className="service-info-box">
              <strong>Våra tjänster:</strong>
              <ul>
                <li>Trav och galopp</li>
                <li>Sportspel</li>
                <li>Lotto och skraplotter</li>
                <li>Personlig service</li>
              </ul>
            </div>
          </ServiceCard>
        </div>
      </div>
    </section>
  )
}

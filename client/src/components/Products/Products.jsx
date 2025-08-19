import React from 'react'
import './Products.css'

const Card = ({ icon, title, subtitle, items }) => (
  <div className="product-card">
    <div className="product-icon" aria-hidden>
      <div className="icon-circle">{icon}</div>
    </div>
    <h3 className="product-title">{title}</h3>
    <p className="product-sub">{subtitle}</p>
    <ul className="product-list">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  </div>
)

export default function Products() {
  return (
    <section className="products-section" id="products">
      <div className="container">
        <h2 className="products-title">Våra Produkter</h2>
        <div className="products-grid">
          <Card
            title="Tobak & Cigarretter"
            subtitle="Stort utbud av kvalitetstobak"
            items={[
              'Marlboro, Camel, Lucky Strike',
              'Lös tobak och rulltobak',
              'E-cigaretter och tillbehör',
              'Cigarrer och pipytobak',
            ]}
            icon={(
              <i className="codicon codicon-symbol-file" aria-hidden></i>
            )}
          />

          <Card
            title="Snacks & Godis"
            subtitle="Läckra snacks för alla tillfällen"
            items={[
              'Chips och nötter',
              'Choklad och godis',
              'Tuggummi och pastiller',
              'Energibars och hälsokost',
            ]}
            icon={(
              <i className="codicon codicon-gift" aria-hidden></i>
            )}
          />

          <Card
            title="Drycker"
            subtitle="Fräscha drycker för alla smaker"
            items={[
              'Kaffe och te',
              'Läsk och juicer',
              'Energidrycker',
              'Vatten och sportdrycker',
            ]}
            icon={(
              <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                {/* soda can: wider dark-red can with white wave */}
                <rect x="7" y="3" width="10" height="2" rx="0.6" fill="#b71c1c" />
                <rect x="6" y="5" width="12" height="13" rx="1.6" fill="#b71c1c" />
                <path d="M7 9c1-1 4-1 6 0s3 1 3 1v1s-1-1.2-3-1.2c-1.9 0-3.4 1-6 1.2v-1z" fill="#fff" opacity="0.98"/>
                <rect x="10" y="7" width="4" height="2" rx="0.3" fill="#fff" opacity="0.98"/>
              </svg>
            )}
          />
        </div>
      </div>
    </section>
  )
}

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
              <i className="codicon codicon-beaker" aria-hidden></i>
            )}
          />
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import './News.css'

const notices = [
  {
    id: 1,
    title: 'Nya öppettider från 1 januari',
    tag: 'Nyhet',
    color: 'red',
    body: 'Vi utökar våra öppettider för att bättre kunna hjälpa er! Från och med 1 januari är vi öppna längre på helger.',
    infoTitle: 'Nya öppettider:',
    info: ['Lördag: 10:00 - 18:00 (tidigare 16:00)', 'Söndag: 11:00 - 17:00 (tidigare 15:00)']
  },
  {
    id: 2,
    title: 'Veckans speltips',
    tag: 'Tips',
    color: 'orange',
    body: 'Våra experter har plockat fram veckans bästa speltips för både trav och fotboll. Kom in så hjälper vi dig!',
    cta: 'Läs mer om speltips'
  },
  {
    id: 3,
    title: 'Julkampanj - 15% rabatt på godis',
    tag: 'Kampanj',
    color: 'pink',
    body: 'Under hela december erbjuder vi 15% rabatt på alla godisvaror. Perfekt för julens alla fester och mysdagar!'
  }
]

const Notice = ({ n }) => (
  <article className={`notice-card ${n.color}`}>
    <div className="notice-inner">
      <div className="notice-row">
        <h3 className="notice-title">{n.title}</h3>
        <span className="notice-tag">{n.tag}</span>
      </div>

      <p className="notice-body">{n.body}</p>

      {n.info && (
        <div className="notice-info">
          <strong>{n.infoTitle}</strong>
          <ul>
            {n.info.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </div>
      )}

      {n.cta && (
        <div className="notice-cta">
          <button className="btn-outline">{n.cta}</button>
        </div>
      )}
    </div>
  </article>
)

export default function News() {
  return (
    <section className="news-section">
      <div className="container">
        <header className="news-header">
          <i className="codicon codicon-book" aria-hidden></i>
          <h2>Nyheter &amp; Kampanjer</h2>
        </header>

        <div className="notices-list">
          {notices.map(n => <Notice key={n.id} n={n} />)}
        </div>
      </div>
    </section>
  )
}

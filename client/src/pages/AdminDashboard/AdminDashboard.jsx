import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  const [stats, setStats] = useState({ news: 12, campaigns: 3, admins: 2 })
  const [news, setNews] = useState([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const s = await fetch('/api/admin/stats').then(r => r.json())
        if (mounted && s) setStats(s)
      } catch (e) {}
      try {
        const [n, c] = await Promise.all([
          fetch('/api/admin/news').then(r => r.json()).catch(()=>[]),
          fetch('/api/admin/campaigns').then(r => r.json()).catch(()=>[])
        ])
        if (mounted) {
          // combine news and campaigns and sort by date desc
          const combined = [...(n||[]).map(x=>({ ...x, type:'news' })), ...(c||[]).map(x=>({ ...x, type:'campaign' }))]
            .filter(i=>i && i.date)
            .sort((a,b)=> new Date(b.date) - new Date(a.date))
          setNews(combined)
        }
      } catch (e) {}
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="admin-dashboard">
      <div className="admin-top">
        <div className="top-left">
          <h2>Admin Dashboard</h2>
          <div className="subtitle">ATG & Svenska Spel</div>
        </div>
        <div className="top-right">
          <button className="btn small">Inställningar</button>
          <Link to="/" className="logout">Logga ut</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature"> <strong>Hantera Nyheter</strong><span>Lägg till, redigera nyheter</span></div>
        <div className="feature"> <strong>Användare</strong><span>Hantera admin-konton</span></div>
        <div className="feature"> <strong>Kampanjer</strong><span>Skapa erbjudanden</span></div>
        <div className="feature"> <strong>Schemalägg</strong><span>Planera innehåll</span></div>
      </div>

      <div className="stats-row">
        <div className="stat"> <div className="stat-title">Aktiva Nyheter</div><div className="stat-value">{stats.news ?? 0}</div></div>
        <div className="stat"> <div className="stat-title">Kampanjer</div><div className="stat-value">{stats.campaigns ?? 0}</div></div>
        <div className="stat"> <div className="stat-title">Admin Användare</div><div className="stat-value">{stats.admins ?? 0}</div></div>
      </div>

      <div className="lower">
        <div className="latest">
          <h3>Senaste Nyheter</h3>
          <p className="muted">Översikt över nyligen skapade artiklar</p>
          <ul className="news-list">
            {news && news.length > 0 ? news.map((n, idx) => (
              <li key={idx}>
                <div className="news-title">{n.title}{n.type==='campaign'? ' — Kampanj':''}</div>
                <div className="news-meta">{new Date(n.date).toISOString().slice(0,10)} <span className={`badge ${n.status==='draft'?'draft':'active'}`}>{n.status==='draft'?'Utkast':'Aktiv'}</span></div>
              </li>
            )) : (
              // fallback static
              <>
                <li>
                  <div className="news-title">Nya öppettider under helger</div>
                  <div className="news-meta">2024-01-15 <span className="badge active">Aktiv</span></div>
                </li>
                <li>
                  <div className="news-title">Vinterkampanj - 20% rabatt</div>
                  <div className="news-meta">2024-01-12 <span className="badge active">Aktiv</span></div>
                </li>
                <li>
                  <div className="news-title">Nya produkter i sortimentet</div>
                  <div className="news-meta">2024-01-10 <span className="badge draft">Utkast</span></div>
                </li>
              </>
            )}
          </ul>
        </div>

        <aside className="quick">
          <h3>Snabblänkar</h3>
          <p className="muted">Vanliga administrativa uppgifter</p>
          <ul className="quick-list">
            <li>Skapa ny nyhet</li>
            <li>Lägg till kampanj</li>
            <li>Bjud in admin</li>
            <li>Butiksinställningar</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

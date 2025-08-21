import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  const [stats, setStats] = useState({ news: 12, campaigns: 3, admins: 2 })
  const [news, setNews] = useState([])

  useEffect(() => {
    let mounted = true
    // Prevent page scroll on desktop when admin dashboard is mounted
    try {
      document.documentElement.classList.add('admin-no-scroll')
      document.body.classList.add('admin-no-scroll')
    } catch (e) {}
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
    return () => {
      mounted = false
      try {
        document.documentElement.classList.remove('admin-no-scroll')
        document.body.classList.remove('admin-no-scroll')
      } catch (e) {}
    }
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
        <div className="feature news"> 
          <div className="feature-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="3" y="14" width="18" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          <strong>Hantera Nyheter</strong><span>Lägg till, redigera nyheter</span>
        </div>
        <div className="feature users"> 
          <div className="feature-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          <strong>Användare</strong><span>Hantera admin-konton</span>
        </div>
        <div className="feature campaigns"> 
          <div className="feature-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.6"/><path d="M6 6h12v12H6z" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          <strong>Kampanjer</strong><span>Skapa erbjudanden</span>
        </div>
        <div className="feature schedule"> 
          <div className="feature-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8h10" stroke="currentColor" strokeWidth="1.2"/><path d="M7 12h10" stroke="currentColor" strokeWidth="1.2"/><path d="M7 16h6" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          <strong>Schemalägg</strong><span>Planera innehåll</span>
        </div>
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
              <li key={idx} className={`news-item ${n.tag? n.tag.toLowerCase() : (n.type==='campaign'?'kampanj':'nyhet')}`}>
                <div className="news-card-body list-mode">
                  <div className="news-card-title">{n.title}</div>
                  <div className="news-card-right">
                    <span className={`pill ${n.tag? n.tag.toLowerCase() : (n.type==='campaign'?'kampanj':'nyhet')}`}>{n.tag || (n.type==='campaign' ? 'Kampanj' : 'Nyhet')}</span>
                    <span className={`badge ${n.status==='draft'?'draft':'active'}`}>{n.status==='draft'?'Utkast':'Aktiv'}</span>
                  </div>
                </div>
                <div className="news-meta">{new Date(n.date).toISOString().slice(0,10)}</div>
              </li>
            )) : (
              // fallback static (matches provided attachment)
              <>
                <li className="news-item nyhet">
                  <div className="news-card-body list-mode">
                    <div className="news-card-title">Nya öppettider från 1 januari</div>
                    <div className="news-card-right"><span className="pill nyhet">Nyhet</span><span className="badge active">Aktiv</span></div>
                  </div>
                  <div className="news-meta">2024-01-15</div>
                </li>
                <li className="news-item tips">
                  <div className="news-card-body list-mode">
                    <div className="news-card-title">Veckans speltips</div>
                    <div className="news-card-right"><span className="pill tips">Tips</span><span className="badge active">Aktiv</span></div>
                  </div>
                  <div className="news-meta">2024-01-12</div>
                </li>
                <li className="news-item kampanj">
                  <div className="news-card-body list-mode">
                    <div className="news-card-title">Julkampanj - 15% rabatt på godis</div>
                    <div className="news-card-right"><span className="pill kampanj">Kampanj</span><span className="badge active">Aktiv</span></div>
                  </div>
                  <div className="news-meta">2024-01-10</div>
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

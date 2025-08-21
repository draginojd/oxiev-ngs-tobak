import React, { useState } from 'react'
import './AdminLogin.css'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin() {
    setError('')
    if (!email) return setError('Ange e-postadress')
    if (!password) return setError('Ange lösenord')

    setLoading(true)
    try {
      // API base: use Vite env var when available, otherwise default to localhost:4000
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
      // Attempt to call the API. If no backend exists you'll get a network error.
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        // Redirect to admin dashboard on success
        navigate('/admin/dashboard')
        return
      }

      // parse error message when available
      let msg = 'Inloggning misslyckades'
      try {
        const j = await res.json()
        if (j && j.message) msg = j.message
      } catch (e) {}
      setError(msg)
    } catch (err) {
      console.error('Login request failed', err)
      setError('Kunde inte kontakta servern. Kontrollera att API-servern körs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Admin Inloggning</h2>
        <p className="admin-sub">Logga in för att hantera butikens innehåll</p>

        <label>E-post</label>
        <div className="input-row">
          <input
            type="email"
            placeholder="admin@exempel.se"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="E-post"
          />
        </div>

        <label>Lösenord</label>
        <div className="input-row">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-label="Lösenord"
          />
          <button
            type="button"
            className="pw-toggle"
            onClick={() => setShowPassword(s => !s)}
            aria-pressed={showPassword}
            aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
          >
            {showPassword ? (
              // eye-off icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 3l18 18" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.58 10.58a3 3 0 004.24 4.24" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.12 14.12C12.89 15.35 11.06 16 9 16c-3.86 0-7.14-2.88-8.64-6 1.2-2.48 3.48-4.39 6.13-5.22" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // eye icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="#333" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>

        <button className="admin-btn" type="button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Loggar in...' : 'Logga in'}
        </button>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-foot">
          <Link to="/">Tillbaka till butiken</Link>
        </div>
      </div>
    </div>
  )
}

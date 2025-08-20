import React, { useState } from 'react'
import './FindUs.css'
import { motion } from 'framer-motion'

export default function FindUs() {
  return (
  <motion.section id="find-us" className="findus-section" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.15}} transition={{duration:0.6}}>
      <div className="container">
    <h2 className="findus-title">Hitta hit till oss</h2>

        <div className="findus-cards">
          <div className="findus-card">
            <h3 className="card-title"><span className="codicon codicon-location"></span> Adress &amp; Öppettider</h3>

            <div className="card-body">
              <p className="muted-label">Adress:</p>
              <p className="address">Lertegelvägen 140<br/>238 30 Oxie</p>

              <p className="muted-label" style={{marginTop:'.6rem'}}>Öppettider:</p>
              <ul className="hours">
                <li>Måndag - Fredag: 09:00 - 18:00</li>
                <li>Lördag: 10:00 - 16:00</li>
                <li>Söndag: 11:00 - 15:00</li>
              </ul>

              <p className="muted-label" style={{marginTop:'.6rem'}}>Kontakt:</p>
              <p><span className="codicon codicon-phone"></span> 076-453 22 33</p>
              {/* Small embedded map pinned to the address */}
              <div className="mini-map">
                {/* map iframe will show store by default, or user location when available */}
                <MapWithLocation />
              </div>
            </div>
          </div>

          
        </div>

      </div>
  </motion.section>
  )
}

function MapWithLocation(){
  const mapRef = React.useRef(null)
  const [loading, setLoading] = useState(false)

  React.useEffect(()=>{
    // create map only once
    if(mapRef.current) return
    // fallback center (Oxie)
    const defaultCenter = [55.5595, 13.0620]

    // Wait for Leaflet to be loaded on window.L (it is injected via index.html script tag)
    let waited = 0
    const waitForL = setInterval(()=>{
      if(window.L){
        clearInterval(waitForL)
        const map = window.L.map('findus-leaflet-map', { attributionControl: false }).setView(defaultCenter, 15)
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)

        // geocode store address via Nominatim (no API key)
        fetch('https://nominatim.openstreetmap.org/search?format=json&q=Lertegelv%C3%A4gen%20140%20Oxie')
          .then(r=>r.json())
          .then(data=>{
            if(data && data.length){
              const {lat, lon} = data[0]
              const storeLatLng = [parseFloat(lat), parseFloat(lon)]
              map.setView(storeLatLng, 16)
              window.L.marker(storeLatLng).addTo(map).bindPopup('Oxievångs Tobak').openPopup()
            }
          }).catch(()=>{})

        mapRef.current = map
      }
      waited += 100
      if(waited > 3000){ // fail after 3s
        clearInterval(waitForL)
        console.warn('Leaflet did not load in time; interactive map unavailable')
      }
    }, 100)

    return ()=>{
      try{ if(mapRef.current) mapRef.current.remove() }catch(e){}
      clearInterval(waitForL)
    }
  }, [])

  function locateMe(){
    const map = mapRef.current
    if(!map){ return }
    if(!navigator.geolocation){ alert('Geolocation stöds inte i din webbläsare'); return }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude, longitude} = pos.coords
      map.setView([latitude, longitude], 16)
      window.L.marker([latitude, longitude]).addTo(map).bindPopup('Din plats').openPopup()
      setLoading(false)
    }, err=>{ setLoading(false); alert('Kunde inte hämta din plats: ' + (err.message || err.code)) })
  }

  function directionsFromMe(){
    if(!navigator.geolocation){ alert('Geolocation stöds inte i din webbläsare'); return }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude, longitude} = pos.coords
      const dest = encodeURIComponent('Lertegelvägen 140 Oxie')
      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${dest}`
      window.open(url, '_blank')
      setLoading(false)
    }, err=>{
      setLoading(false)
      // fallback: open directions to destination without origin
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Lertegelvägen 140 Oxie')}`
      window.open(url, '_blank')
    })
  }

  return (
    <div className="map-with-location">
      <div id="findus-leaflet-map" className="map-iframe-wrapper" />
      <div className="map-controls">
        <button className="btn-small" onClick={locateMe} aria-pressed={loading}>{loading ? 'Hämtar…' : 'Visa min plats'}</button>
        <button className="btn-alt" onClick={directionsFromMe} disabled={loading} aria-pressed={loading}>
          {loading ? 'Vänta…' : (
            <>
              Vägbeskrivning
              <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="9" r="2.2" fill="currentColor" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

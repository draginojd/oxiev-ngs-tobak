import React from 'react'
import './Welcome.css'
import { motion } from 'framer-motion'

export default function Welcome(){
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, when: 'beforeChildren' } }
  }
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }

  return (
    <motion.section className="welcome-section" initial="hidden" whileInView="show" viewport={{once:true, amount:0.2}} variants={container}>
      <div className="container">
        <motion.h2 className="welcome-title" variants={item}>Välkommen till Oxievångs Tobak</motion.h2>
        <motion.p className="welcome-sub" variants={item}>Vi är din lokala spelbutik i Oxie, specialiserade på alla former av spel och betting. Med lång erfarenhet och personlig service hjälper vi dig med allt från Svenska Spel till ATG och mycket mer.</motion.p>

        <div className="welcome-grid">
          <motion.div className="welcome-item" variants={item}>
            <div className="welcome-icon qr" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect width="24" height="24" rx="2" fill="none" />
                <rect x="2" y="2" width="6" height="6" fill="currentColor" />
                <rect x="3.6" y="3.6" width="2.8" height="2.8" fill="currentColor" />
                <rect x="15" y="2" width="6" height="6" fill="currentColor" />
                <rect x="16.6" y="3.6" width="2.8" height="2.8" fill="currentColor" />
                <rect x="2" y="15" width="6" height="6" fill="currentColor" />
                <rect x="3.6" y="16.6" width="2.8" height="2.8" fill="currentColor" />
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
          </motion.div>

          <motion.div className="welcome-item" variants={item}>
            <div className="welcome-icon"><i className="codicon codicon-location" aria-hidden></i></div>
            <h4>Lokalt i Oxie</h4>
            <p className="small">Mitt i Oxie med lätt tillgång och parkering</p>
          </motion.div>

          <motion.div className="welcome-item" variants={item}>
            <div className="welcome-icon"><i className="codicon codicon-clock" aria-hidden></i></div>
            <h4>Personlig service</h4>
            <p className="small">Kunnig personal som hjälper dig med alla frågor</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

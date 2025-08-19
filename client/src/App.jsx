import React from 'react'
import './App.css'

// Navigation removed per request
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
// About, Projects and Contact removed to match the live site structure
import Products from './components/Products/Products'
import News from './components/News/News'
import Welcome from './components/Welcome/Welcome'
import FindUs from './components/FindUs/FindUs'
import Footer from './components/Footer/Footer'

const links = [
  { href: '#home', label: 'Hem' },
  { href: '#projects', label: 'Spela' },
  { href: '#find-us', label: 'Hitta butik' },
]

function App() {
  return (
    <>
  <main>
  <Hero />
  <Welcome />
  <Services />
  <Products />
  <News />
  <FindUs />
      </main>
      <Footer />
    </>
  )
}

export default App

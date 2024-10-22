import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, useLocation} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';

import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import FindUs from './components/FindUs';
function App() {
  const location = useLocation();

  return (
    <>
                    <NavBar />
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
                <Route index element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/find-us" element={<FindUs />}/>
              </Routes>
        </AnimatePresence>
    </>
  );
};

export default App;

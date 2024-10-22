import React from 'react'
import { motion } from "framer-motion"
import slide1 from "../assets/slide1.png"
import slide2 from "../assets/slide2.jpg"
import slide3 from "../assets/slide3.png"

function Slider() {




  return (
    <div className="slider-container">
        <div className="slides">
            <div className="slider"  >
            <img src={slide1} alt="no" className="slider-img"   />
            </div>
            <div className="slider">
            <img src={slide2} alt="no" className="slider-img"  />
            </div>
            <div className="slider">
            <img src={slide3} alt="no" className="slider-img"   />
            </div>
        </div>

    </div>
  );
};

export default Slider;
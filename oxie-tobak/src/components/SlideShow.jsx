import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IMAGES from "../assets";

// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';

import Carousel from 'react-bootstrap/Carousel';

const SlideShow = () => {
  return (

    <div className="carousel-container">
             <Carousel className="carousel">
      
            <Carousel.Item>
            <img className="d-block w-100" src={IMAGES.slide1} alt="First slide" />
            <Carousel.Caption>
            <a href="https://www.google.com/" target="_blank">
                <h3>First Slide</h3>
                <p>This is the first slide of the carousel.</p>
            </a>
            </Carousel.Caption>
            </Carousel.Item>
        
            <Carousel.Item>
            <img className="d-block w-100" src={IMAGES.slide2} alt="Second slide" />
            <Carousel.Caption>
            <a href="https://www.google.com/" target="_blank">
                <h3>Second Slide</h3>
                <p>This is the second slide of the carousel.</p>
            </a>
            </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
            <img className="d-block w-100" src={IMAGES.slide3} alt="Third slide" />
            <Carousel.Caption>
            <a href="https://www.google.com/" target="_blank">
                <h3>Third Slide</h3>
                <p>This is the Third slide of the carousel.</p>
            </a>
            </Carousel.Caption>
            </Carousel.Item>

    </Carousel> 
  </div>
);
};
export default SlideShow;

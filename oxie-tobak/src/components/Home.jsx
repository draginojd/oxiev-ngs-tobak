import React, { useEffect, useState } from 'react';
import transition from '../transition';
import { motion } from "framer-motion";
import Slideshow from './SlideShow';
import ImageGallery4 from './ImageGallery4';
import ImageGallery3 from './ImageGallery3';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



export const Home = () => {
  // Move useEffect into the functional component
  useEffect(() => {
    axios.post('http://localhost:4000/api/home')
      .then(response => console.log(response.data))
      .catch(error => console.error('Error tracking Home page:', error));
  }, []); // Empty dependency array to run once on mount

  return (
    <motion.div className="home-containers"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Slideshow className="slideshow" />
      <div className="under-show">
        {/* <IphoneCards className="iphone-cards" /> */}
        <ImageGallery4 className="image-gallery" />
      </div>
      <ImageGallery3 className="image-gallery3" />
    </motion.div>
  );
};

// Exporting the component with transition if needed
export default transition(Home);

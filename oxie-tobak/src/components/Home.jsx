import React, {useState, useEffect} from 'react'
import transition from '../transition'
import { motion } from "framer-motion"
import Slideshow from './SlideShow'
import IphoneCards from './IphoneCards'
import ImageGallery4 from './ImageGallery4'
import ImageGallery3 from './ImageGallery3'
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
useEffect(() => {
  axios.post('http://localhost:4000/api/home')
      .then(response => console.log(response.data))
      .catch(error => console.error('Error tracking Home page:', error));
}, []);


export const Home = () => {
  return (
  
   
    <motion.div className="home-containers"
        initial={{ opacity:0}}
        animate={{  opacity: 1 }}
        exit={{ opacity:0 }}
        transition={{ duration: 0.2}} 
    >
      
 

      <Slideshow className="slideshow"></Slideshow>
      <div className="under-show">
     
     {/*  <IphoneCards className="iphone-cards"> </IphoneCards> */}
      <ImageGallery4 className="image-gallery"></ImageGallery4>
    
        </div>
        <ImageGallery3 className="image-gallery3"></ImageGallery3>
    </motion.div>
    
 
  );
};

/* export default transition(Home); */
export default transition(Home);
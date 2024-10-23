import React from 'react'
import transition from '../transition'
import { motion } from "framer-motion"
import Slideshow from './SlideShow'
import IphoneCards from './IphoneCards'
import 'bootstrap/dist/css/bootstrap.min.css';



export const Home = () => {
  return (
  
   
    <motion.div className="home-containers"
        initial={{ opacity:0}}
        animate={{  opacity: 1 }}
        exit={{ opacity:0 }}
        transition={{ duration: 0.2}} 
    >
      
 

      <Slideshow className="slideshow"></Slideshow>
      <IphoneCards className="iphone-cards"> </IphoneCards>
    
    </motion.div>
    
  );
};

/* export default transition(Home); */
export default transition(Home);
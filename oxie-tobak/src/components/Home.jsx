import React from 'react'
import transition from '../transition'
import { motion } from "framer-motion"
import Slideshow from './SlideShow'
import 'bootstrap/dist/css/bootstrap.min.css';



export const Home = () => {
  return (
  
   
    <motion.div className="home-containers"
        initial={{ opacity:0}}
        animate={{  opacity: 1}}
        exit={{ opacity:0 }}
        transition={{ duration: 0.2}} 
    >
      
      <div className="header">
        <motion.h1 className='wobble'
                initial={{ left: 2}}
                animate={{ scaleY: 1}}
                exit={{ scaleY: 1, duration: 10}}
                transition={{ duration: 1, ease: [1.22, 1, 0.4, 1]}}
        >Home</motion.h1>
      </div>

  
<Slideshow className="slideshow"></Slideshow>
    
    </motion.div>
    
  );
};

/* export default transition(Home); */
export default transition(Home);
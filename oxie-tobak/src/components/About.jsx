import React from 'react';
import transition from '../transition';
import { motion } from "framer-motion";

/*test*/
export const About = () => {
  return (
    <motion.div className="home-containers"
        initial={{ opacity:0}}
        animate={{  opacity: 1}}
        exit={{ opacity:0 }}
        transition={{ duration: 0.2}} 
    >
        <h1>About</h1>
    </motion.div>
  );
};


export default transition(About);
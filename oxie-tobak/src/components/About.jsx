import React, { useEffect } from 'react';
import transition from '../transition';
import { motion } from "framer-motion";
import axios from 'axios';

export const About = () => {
  useEffect(() => {
    // Fetch data from the server
    axios.post('http://localhost:4000/api/aboutus')
      .then(response => {
        console.log(response.data); // You can keep this to see the response
      })
      .catch(error => {
        console.error('Error tracking About Us page:', error);
      });
  }, []); // Runs once when the component mounts

  return (
    <motion.div className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }} 
    >
      <h1>About</h1> {/* Just displaying the h1 */}
    </motion.div>
  );
};

export default transition(About);

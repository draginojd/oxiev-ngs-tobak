import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

function IphoneCards() {
  const [images, setImages] = useState([]); // Initialize state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/images.json'); // Adjusted path to point to the public folder
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Assuming you want to get the iphones array from the JSON
        const imagesWithIds = data.iphones.map((image) => ({
          id: uuidv4(), // Generate a new UUID for each image
          ...image,     // Spread the existing image properties
        }));

        console.log(imagesWithIds);
        setImages(imagesWithIds);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='cards-container'>
      <div className="cards-inner">
        <div className="cards">
          {images.map((image) => (
            <motion.div className="card" key={image.id}>
              <img src={image.url} alt={image.caption} /> {/* Accessing url and caption directly */}
            </motion.div>
          ))}
        </div>
        <div className="news"></div>
      </div>
    </div>
  );
}

export default IphoneCards;

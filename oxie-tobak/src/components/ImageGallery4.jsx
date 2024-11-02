import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ImagesData from '../images.json';

function ImageGallery4() {
  const [images, setImages] = useState([]); // Initialize state

  useEffect(() => {
    // Access 'fourImages' data within ImagesData and add UUIDs
    const imagesWithIds = ImagesData.fourImages.map(image => ({
      id: uuidv4(),
      ...image,
    }));

    setImages(imagesWithIds);
  }, []);

  return (
    <div className="gallery-container">
      {images.map(image => (
        <div key={image.id} className="gallery-inner-container">
          <h4 className="caption">{image.caption}</h4>
          <p className="gallery-img-text">{image.description}</p>
          <img src={image.url} alt={image.caption} />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery4;

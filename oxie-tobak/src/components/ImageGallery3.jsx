import React, {useEffect, useState} from 'react'
import ImagesData from '../images.json';
import { v4 as uuidv4 } from 'uuid';






function ImageGallery3() {
  const [Images, setImages] = useState([]); // Initialize state

  useEffect(() => {
    // Access 'fourImages' data within ImagesData and add UUIDs
    const imagesWithIds = ImagesData.threeImages.map(image => ({
      id: uuidv4(),
      ...image,
    }));

    setImages(imagesWithIds);
  }, []);

  return (
    <div className="gallery-container">
      {Images.map(image => (
        <div className="gallery-inner-container3" key={image.id}>
          <img src={image.url} alt={image.caption} />
          <p className="gallery-img-text">{image.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery3;
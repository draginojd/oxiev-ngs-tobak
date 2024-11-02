import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

// Directly import images.json
import imageData from '../images.json';

function SlideShow() {
  const [Images, setImages] = useState([]); // Initialize state

  useEffect(() => {
    // Access 'carousel' data within imageData and add UUIDs
    const imagesWithIds = imageData.carousel.map(image => ({
      id: uuidv4(),
      ...image,
    }));
    setImages(imagesWithIds);
  }, []);

  return (
    <div className="carousel-container">
      <Carousel className="carousel">
        {Images.map(image => (
          <Carousel.Item key={image.id}>
            <img className="d-block w-100" src={image.url} alt={image.caption} />
            <Carousel.Caption>
              <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
                <h3>{image.caption}</h3>
                <p>{image.description}</p>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SlideShow;

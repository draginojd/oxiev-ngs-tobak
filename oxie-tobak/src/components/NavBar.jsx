import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Images from "../images.json"; // Assuming this is the correct path

export const NavBar = () => {
  const [images, setImages] = useState([]); // Initialize state

  useEffect(() => {
    // You can directly use the imported Images if it's correctly imported
    const imagesWithIds = Images.navbar.map(image => ({
      id: uuidv4(),
      ...image,
    }));

    console.log(imagesWithIds);
    setImages(imagesWithIds);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <Link className="nav-link" to="/">
            <img src={images[0]?.logo[0]?.url} alt={images[0]?.logo[0]?.caption} />
          </Link>
        </div>

        <div className="nav-links">
          <div className="nav-item">
            <NavLink className="nav-link" to="/" active="active-link">
              <h1>Hem</h1>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className="nav-link" to="/about" active="active-link">
              <h1>Om oss</h1>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className="nav-link" to="/contact" active="active-link">
              <h1>Kontakt</h1>
            </NavLink>
          </div>
          <div className="nav-item">
            <NavLink className="nav-link" to="/find-us" active="active-link">
              <h1>Hitta Butik</h1>
            </NavLink>
          </div>
          <div className="nav-item">
            <a className="nav-link" href="https://www.atg.se/oxievangstobak" target='_blank' rel="noopener noreferrer">
              <h1>Spel</h1>
            </a>
          </div>
        </div>

        <div className="socials">
          {images[0]?.socials.map((social) => (
            <a
              key={uuidv4()} // Generating unique key for each social link
              className="socials-nav-link"
              href={social.url} // Assuming you want the correct URL for each social
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="socials-img" src={social.url} alt={social.caption} />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

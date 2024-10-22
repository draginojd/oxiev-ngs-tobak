import React from 'react';
import {Link, NavLink} from "react-router-dom";
import picture1 from "../assets/Oxievangs-Tobak-logo.svg";
import picture2 from "../assets/facebook-logo.svg";
import picture3 from "../assets/instagram-logo.svg";
import picture4 from "../assets/tiktok-logo.svg";
import transition from '../transition';


export const NavBar = () => {
  return (
    <nav className="navbar">
        <div className="logo">
            <Link className="nav-link" to="/">
            <img src={picture1} alt="Logo" />
            </Link>
        </div>

        <div className="nav-links">
            <div className="nav-item">
                <NavLink className="nav-link"  to="/" activeClassname="active-link">
                    <h1>Hem</h1>
                </NavLink>
            </div>
            <div className="nav-item">
                <NavLink className="nav-link" to="/about" activeClassname="active-link"  >
                <h1>Om oss</h1>
                </NavLink>
            </div>
            <div className="nav-item">
                <NavLink className="nav-link" to="/contact" activeClassname="active-link" >
                <h1>Kontakt</h1>
                </NavLink>
            </div>
            <div className="nav-item">
                <NavLink className="nav-link" to="/find-us" activeClassname="active-link" >
                <h1>Hitta Butik</h1>
                </NavLink>
            </div>
            <div className="nav-item">
                <a className="nav-link" to="/" activeClassname="active-link" target='_blank' href='https://www.atg.se/oxievangstobak' >
                <h1>Spela Nu</h1>
                </a>
            </div>
        </div>

        <div className="socials">
        
            <a className="socials-nav-link" to="/" target='_blank' href='https://www.facebook.com/'>
            <img className="socials-img" src={picture2} alt="facebook" />
            </a>
            <a className="socials-nav-link" to="/" target='_blank' href='https://www.instagram.com/'>
            <img className="socials-img" src={picture3} alt="instagram" />
            </a>
            <a className="socials-nav-link" to="/" target='_blank' href='https://www.tiktok.com/'>
            <img className="socials-img" src={picture4} alt="Logo" />
            </a>
        </div>
    </nav>
  );
};

export default transition(NavBar);

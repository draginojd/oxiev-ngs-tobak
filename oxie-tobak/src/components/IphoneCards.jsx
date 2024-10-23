import React from 'react'
import IMAGES from '../assets'

function IphoneCards() {
  return (
    <div className='cards-container'>
      <div className="cards-inner">
        <div className="cards">
            <div className="card">
            <img src={IMAGES.iphone1} alt="iphone"  />
            </div>
            <div className="card">
            <img src={IMAGES.iphone2} alt="iphone2"  />            
            </div>
            <div className="card">
            <img src={IMAGES.iphone3} alt="iphone3"  />            
            </div>
           
        </div>
        <div className="news">
        
        </div>
      </div>

   
      </div>
      
  )
}

export default IphoneCards
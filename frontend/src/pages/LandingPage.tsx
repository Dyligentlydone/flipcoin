import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import coinImage from '../assets/flip coin (coin).png';

function LandingPage() {
  const navigate = useNavigate();
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const coinRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    // Start spinning
    let spins = 0;
    const spinInterval = setInterval(() => {
      spins++;
      const angle = (spins * 36) % 360;
      const upDown = Math.sin(angle * Math.PI / 180) * 50; // Increased amplitude for more dramatic effect
      
      if (coinRef.current) {
        coinRef.current.style.transform = `
          perspective(1000px) 
          rotateX(${angle}deg) 
          translateY(${upDown}px)
        `;
      }
      spins++;
      if (spins > 10) { // Reduced number of spins for quicker transition
        clearInterval(spinInterval);
        // Navigate after the last spin
        setTimeout(() => {
          navigate('/main');
        }, 200); // Small delay for smooth transition
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      
      <div 
        ref={coinRef}
        className={`coin mb-8 cursor-pointer transition-all duration-300 ${isFlipping ? '' : 'hover:scale-110 hover:rotate-12'}`}
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transition: isFlipping ? 'transform 0.05s linear' : 'all 0.3s ease-in-out'
        }}
        onClick={handleClick}
      >
        <img 
          src={coinImage} 
          alt="Flip Coin" 
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="text-center">
        <p className={`text-xl text-gray-800 mb-6 transition-opacity duration-300 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
          Flip me to enter
        </p>
      </div>

    </div>
  );
}

export default LandingPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coinImage from '../assets/flip coin (coin).png';

function LandingPage() {
  const navigate = useNavigate();
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    // Start spinning
    let spins = 0;
    const spinInterval = setInterval(() => {
      setRotation(prev => (prev + 36) % 360);
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
        className={`mb-8 cursor-pointer transition-all duration-300 ${isFlipping ? '' : 'hover:scale-110 hover:rotate-12'}`}
        style={{ 
          transform: `rotateY(${rotation}deg)`,
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
          Click the coin to enter
        </p>
      </div>

      <footer className="mt-12 text-gray-500">&copy; 2025 FlipCoin</footer>
    </div>
  );
}

export default LandingPage;

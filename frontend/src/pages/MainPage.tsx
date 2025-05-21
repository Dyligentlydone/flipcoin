import React, { useState } from 'react';
import coinImage from '../assets/flip coin (coin).png';

function MainPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);

  const flipCoin = async () => {
    if (loading) return;
    
    setLoading(true);
    setResult(null);
    
    // Start spinning
    let spins = 0;
    const spinInterval = setInterval(() => {
      setRotation(prev => (prev + 36) % 360);
      spins++;
      if (spins > 20) {
        clearInterval(spinInterval);
      }
    }, 50);

    try {
      const res = await fetch('/api/flip');
      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult('error');
    } finally {
      setTimeout(() => {
        setLoading(false);
        clearInterval(spinInterval);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e5b444]">
      <h1 className="text-5xl font-bold mb-8 text-gray-800 drop-shadow">Flip A Coin</h1>
      
      <div 
        className={`mb-8 cursor-pointer transition-transform duration-100 hover:scale-110 ${loading ? '' : 'hover:rotate-12'}`}
        style={{ transform: `rotateY(${rotation}deg)` }}
        onClick={flipCoin}
      >
        <img 
          src={coinImage} 
          alt="Flip Coin" 
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="text-center">
        <button
          onClick={flipCoin}
          className="px-8 py-4 text-xl font-semibold rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition mb-6"
          disabled={loading}
        >
          {loading ? 'Flipping...' : 'Click the Coin or this Button!'}
        </button>

        {result && (
          <div 
            className={`text-4xl font-bold text-gray-800 mt-4 ${loading ? '' : 'animate-bounce'}`}
          >
            {result.toUpperCase()}!
          </div>
        )}
      </div>

      <footer className="mt-12 text-gray-500">&copy; 2025 FlipCoin</footer>
    </div>
  );
}

export default MainPage;

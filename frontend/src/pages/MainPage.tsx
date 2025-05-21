import React from 'react';
import FlipCoinTracker from '../components/FlipCoinTracker';
import '../components/FlipCoinTracker.css';

function MainPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">FlipCoin Market Cap Tracker</h1>
      <FlipCoinTracker />
    </div>
  );
}

export default MainPage;

import React, { useState } from 'react';
import FlipCoinTracker from '../components/FlipCoinTracker';
import '../components/FlipCoinTracker.css';

function MainPage() {
  const [copied, setCopied] = useState(false);
  const tokenAddress = 'DezaX4JqtoZ9TdUZ5eGbPtQtpzkQFDERuWUMFgnypump';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center py-6 bg-white/80">
        <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/40 shadow-sm backdrop-blur-sm">
  <span className="text-gray-800 font-mono text-sm select-all">{tokenAddress}</span>
  <button
    onClick={handleCopy}
    className="ml-2 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-full focus:outline-none focus:ring"
    aria-label="Copy token address"
  >
    {copied ? 'Copied!' : 'Copy'}
  </button>
</div>
      </div>
      <div className="min-h-screen bg-white/80 flex flex-col items-center justify-end pb-16">
        <FlipCoinTracker />
        <div className="mt-6 text-lg text-gray-600 font-medium text-center">
  Flipping the market one asset at a time
  <div className="text-xs text-gray-400 mt-1">#NFA</div>
</div>
      </div>
    </>
  );
}

export default MainPage;

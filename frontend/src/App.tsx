import React, { useState } from 'react';

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const flipCoin = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/flip');
      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
      <h1 className="text-5xl font-bold mb-8 text-gray-800 drop-shadow">FlipCoin</h1>
      <button
        onClick={flipCoin}
        className="px-8 py-4 text-xl font-semibold rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition mb-6"
        disabled={loading}
      >
        {loading ? 'Flipping...' : 'Flip the Coin!'}
      </button>
      {result && (
        <div className="text-4xl font-bold text-gray-700 mt-4 animate-bounce">
          {result === 'heads' ? '🪙 Heads!' : result === 'tails' ? '🪙 Tails!' : '❌ Error'}
        </div>
      )}
      <footer className="mt-12 text-gray-500">&copy; 2025 FlipCoin</footer>
    </div>
  );
}

export default App;

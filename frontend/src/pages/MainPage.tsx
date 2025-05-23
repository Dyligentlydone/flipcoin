import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FlipCoinTracker from '../components/FlipCoinTracker';
import tagImg from '../assets/tag.png';
import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';
import img4 from '../assets/4.jpeg';
import img5 from '../assets/5.jpeg';
import img6 from '../assets/6.jpeg';
import img7 from '../assets/7.jpeg';
import img8 from '../assets/8.jpeg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';
import img14 from '../assets/14.jpg';
import img15 from '../assets/15.jpg';
import img16 from '../assets/16.jpg';
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
        <div className="w-full max-w-screen-sm mx-auto flex items-center gap-2 px-3 py-2 rounded-full bg-white/40 shadow-sm backdrop-blur-sm overflow-x-auto whitespace-nowrap">
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
      {/* Viewport meta tag for mobile safe area support */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <div className="min-h-screen w-full bg-white/80 flex flex-col items-center justify-center pb-48 pb-[96px]" style={{minHeight: '100dvh'}}>
        <div className="mt-2 text-lg text-gray-600 font-medium text-center">
          Flipping the market one asset at a time
          <div className="text-xs text-gray-400 mt-1">#NFA</div>
        </div>
        {/* Responsive image grid */}
        <div className="w-full max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 sm:px-4">
          {[
            {src: img1, alt: 'FlipCoin Photo 1'},
            {src: img2, alt: 'FlipCoin Photo 2'},
            {src: img3, alt: 'FlipCoin Photo 3'},
            {src: img4, alt: 'FlipCoin Photo 4'},
            {src: img5, alt: 'FlipCoin Photo 5'},
            {src: img6, alt: 'FlipCoin Photo 6'},
            {src: img7, alt: 'FlipCoin Photo 7'},
            {src: img8, alt: 'FlipCoin Photo 8'},
            {src: img9, alt: 'FlipCoin Photo 9'},
            {src: img10, alt: 'FlipCoin Photo 10'},
            {src: img11, alt: 'FlipCoin Photo 11'},
            {src: img12, alt: 'FlipCoin Photo 12'},
            {src: img13, alt: 'FlipCoin Photo 13'},
            {src: img14, alt: 'FlipCoin Photo 14'},
            {src: img15, alt: 'FlipCoin Photo 15'},
            {src: img16, alt: 'FlipCoin Photo 16'},
          ].map((img, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover hover:opacity-80 transition"
                onClick={() => {
                  // Download the image
                  const link = document.createElement('a');
                  link.href = img.src;
                  link.download = img.alt.replace(/ /g, '_').toLowerCase() + '.jpg';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  // Open Twitter share window
                  const tweet = encodeURIComponent(`#flipcoin`);
                  window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* More Flipping Button (bottom right in content, not sticky) */}
      <div className="w-full flex justify-end mt-10 mb-8 pr-6">
        <Link to="/flipping">
          <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition-all">
            More Flipping
          </button>
        </Link>
      </div>
      {/* Progress Bar at the very bottom */}
      <div className="w-full flex justify-center fixed left-0 right-0 bottom-0 mb-12 pointer-events-none z-40 px-2">
        <div className="w-full max-w-3xl pointer-events-auto">
          <div className="h-6 flex items-center justify-center">
            <FlipCoinTracker />
          </div>
        </div>
      </div>
      {/* Signature Tag Image */}
      <a
        href="https://x.com/dyllwill_?s=21&t=S0JVIEd8tjDNnUp_OTOSzA"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16,
          zIndex: 50
        }}
      >
        <img
          src={tagImg}
          alt="signature tag"
          style={{
            width: 96,
            opacity: 0.85,
            transition: 'opacity 0.2s',
            cursor: 'pointer'
          }}
        />
      </a>
    </>
  );
}

export default MainPage;

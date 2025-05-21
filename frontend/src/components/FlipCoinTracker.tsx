import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import coinImage from '../assets/flip coin (coin).png';

const TOKEN_ADDRESS = 'DezaX4JqtoZ9TdUZ5eGbPtQtpzkQFDERuWUMFgnypump';
const MAX_MARKET_CAP = 100_000_000; // $100M target for progress bar

function FlipCoinTracker() {
  const [marketCap, setMarketCap] = useState(0);
  const checkpoints = [
    20000, // 20K
    200000, // 200K
    500000, // 500K
    750000, // 750K
    1000000, // 1M
    2000000, // 2M
    5000000, // 5M
    10000000, // 10M
    25000000, // 25M
    50000000, // 50M
    100000000, // 100M
  ];

  // Find the next checkpoint
  const nextCheckpoint = checkpoints.find(cp => cp > marketCap) || checkpoints[checkpoints.length - 1];
  const prevCheckpoint = checkpoints[checkpoints.findIndex(cp => cp > marketCap) - 1] || 0;

  // Calculate progress relative to current range
  const progress = ((marketCap - prevCheckpoint) / (nextCheckpoint - prevCheckpoint)) * 100;
  const flipSpeed = Math.max(2 - progress / 50, 0.5); // Faster flip at higher market cap

  useEffect(() => {
    const supply = 1000000000; // Update this with actual supply

    const fetchPrice = async () => {
      try {
        console.log('Fetching price from Jupiter...');
        const response = await axios.get('https://quote-api.jup.ag/v6/quote', {
          params: {
            inputMint: 'So11111111111111111111111111111111111111112', // SOL
            outputMint: TOKEN_ADDRESS,
            amount: '1000000000' // 1 SOL in lamports
          }
        });

        if (response.data?.outAmount && response.data?.inAmount) {
          console.log('Raw response:', response.data);
          
          // Parse values
          const outAmount = parseInt(response.data.outAmount);
          const inAmount = parseInt(response.data.inAmount);
          const solUsdPrice = response.data.swapUsdValue;
          
          console.log('Parsed values:', {
            outAmount,
            inAmount,
            solUsdPrice
          });
          
          // Calculate price in USD
          const tokenAmount = parseInt(response.data.outAmount); // How many tokens you get for 1 SOL
          const pricePerToken = 1 / (tokenAmount / 1e9); // Price in SOL per token
          const priceInUsd = pricePerToken * solUsdPrice; // Convert to USD
          // Calculate market cap (result will be in thousands)
          const marketCapValue = priceInUsd * 1000000000; // Multiply by total supply
          
          console.log('Calculated values:', {
            tokenAmount,
            pricePerToken,
            priceInUsd,
            marketCapValue,
            solPrice: solUsdPrice
          });
          
          setMarketCap(marketCapValue);
        } else {
          console.log('Incomplete price data from Jupiter');
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    // Fetch immediately
    fetchPrice();

    // Then fetch every 10 seconds
    const interval = setInterval(fetchPrice, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: '80%', margin: '40px auto', position: 'relative' }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 20,
          borderRadius: 5,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: progress > 50 ? '#4caf50' : '#2196f3'
          }
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          left: `${progress}%`,
          transform: 'translateX(-50%)',
          transition: 'left 0.5s ease-in-out'
        }}
      >
        <img
          src={coinImage}
          alt="Flip Coin"
          style={{ width: '40px', height: '40px' }}
          className={progress > 50 ? 'flip-animation' : ''}
        />
      </Box>

      {/* Milestone Markers */}
      {checkpoints.map((cp, index) => {
        const position = (index + 1) / checkpoints.length * 100;
        const label = cp >= 1000000 ? 
          `$${(cp / 1000000).toFixed(0)}M` : 
          `$${(cp / 1000).toFixed(0)}K`;
        return (
          <Box 
            key={cp}
            sx={{ 
              position: 'absolute', 
              top: -40, 
              left: `${position}%`, 
              fontSize: '12px',
              transform: 'translateX(-50%)'
            }}
          >
            {label}
          </Box>
        );
      })}
      
      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        <div className="market-cap-text">
          Market Cap: ${(marketCap / 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })}K
        </div>
      </Box>
    </Box>
  );
}

export default FlipCoinTracker;

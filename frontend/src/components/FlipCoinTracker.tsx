import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import coinImage from '../assets/flip coin (coin).png';

const TOKEN_ADDRESS = 'DezaX4JqtoZ9TdUZ5eGbPtQtpzkQFDERuWUMFgnypump';
const MAX_MARKET_CAP = 100_000_000; // $100M target for progress bar

function FlipCoinTracker() {
  const [marketCap, setMarketCap] = useState(0);
  const progress = Math.min((marketCap / MAX_MARKET_CAP) * 100, 100);
  const flipSpeed = Math.max(2 - progress / 50, 0.5); // Faster flip at higher market cap

  useEffect(() => {
    const supply = 1000000000; // Update this with actual supply

    const fetchPrice = async () => {
      try {
        console.log('Fetching price from Jupiter...');
        const response = await axios.get('https://quote-api.jup.ag/v6/quote', {
          params: {
            inputMint: TOKEN_ADDRESS,
            outputMint: 'So11111111111111111111111111111111111111112', // SOL
            amount: '1000000000' // 1 token with 9 decimals
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
          
          // Calculate price in SOL (outAmount/inAmount)
          const priceInSol = outAmount / 1e9; // Convert from lamports
          const priceInUsd = priceInSol * solUsdPrice;
          const marketCapValue = priceInUsd * 1000000000; // Total supply
          
          console.log('Calculated values:', {
            priceInSol,
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
      <Box sx={{ position: 'absolute', top: -40, left: '25%', fontSize: '12px' }}>$25M</Box>
      <Box sx={{ position: 'absolute', top: -40, left: '50%', fontSize: '12px' }}>$50M</Box>
      <Box sx={{ position: 'absolute', top: -40, left: '75%', fontSize: '12px' }}>$75M</Box>
      
      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        Market Cap: ${marketCap.toLocaleString('en-US', { maximumFractionDigits: 2 })}
      </Box>
    </Box>
  );
}

export default FlipCoinTracker;

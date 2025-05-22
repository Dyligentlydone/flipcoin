import React, { useState, useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import coinImage from '../assets/flip coin (coin).png';
import img20k from '../assets/20k.png';
import img200k from '../assets/200k.png';
import img500k from '../assets/500k.png';
import img750k from '../assets/750k.png';
import img1m from '../assets/1m.png';
import img2m from '../assets/2m.png';

const TOKEN_ADDRESS = 'DezaX4JqtoZ9TdUZ5eGbPtQtpzkQFDERuWUMFgnypump';
const MAX_MARKET_CAP = 100_000_000; // $100M target for progress bar

// Format market cap for display
function formatMarketCap(value: number): string {
  // Log the raw value to help with debugging
  console.log('Raw market cap value for formatting:', value);
  
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

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

  // For precise visual alignment with the checkpoint labels
  // We'll calculate the exact visual position to match the labels
  
  // First, find which checkpoints our value is between
  const nextCheckpointIndex = checkpoints.findIndex(cp => cp > marketCap);
  const prevCheckpointIndex = nextCheckpointIndex > 0 ? nextCheckpointIndex - 1 : 0;
  
  // Get the actual checkpoint values
  const nextCheckpointValue = checkpoints[nextCheckpointIndex >= 0 ? nextCheckpointIndex : checkpoints.length - 1];
  const prevCheckpointValue = checkpoints[prevCheckpointIndex];
  
  // Calculate visual position of each checkpoint (matches the labels)
  const getPosForCheckpoint = (index: number) => ((index + 1) / checkpoints.length) * 100;
  const nextCheckpointPos = getPosForCheckpoint(nextCheckpointIndex);
  const prevCheckpointPos = getPosForCheckpoint(prevCheckpointIndex);
  
  // Calculate where we are between the two checkpoints (0-1)
  const percentBetweenCheckpoints = nextCheckpointValue !== prevCheckpointValue ?
    (marketCap - prevCheckpointValue) / (nextCheckpointValue - prevCheckpointValue) : 0;
  
  // Interpolate to get the exact position
  const progress = prevCheckpointPos + (percentBetweenCheckpoints * (nextCheckpointPos - prevCheckpointPos));
  
  // For the flip speed
  const flipSpeed = Math.max(2 - progress / 50, 0.5); // Faster flip at higher market cap
  
  // Log values for debugging
  console.log('Checkpoint-based positioning:', {
    marketCap,
    prevCheckpointValue,
    nextCheckpointValue,
    prevCheckpointPos,
    nextCheckpointPos,
    percentBetweenCheckpoints,
    progress
  });

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
          // Calculate market cap in USD
          // The total supply is 1 billion tokens, but we need to divide by 1000 to get the correct scale
          const marketCapValue = priceInUsd * 1000000; // Scale down by 1000 to match expected value range
          
          // For display purposes, we'll use this value directly
          // For progress bar, we need to ensure it's in the right range (0-100M)
          
          console.log('Calculated values:', {
            tokenAmount,
            pricePerToken,
            priceInUsd,
            marketCapValue,
            solPrice: solUsdPrice
          });
          
          // Log the raw value we're setting as market cap
          console.log('Setting market cap to:', marketCapValue);
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
          backgroundColor: 'rgba(255,255,255,0.8)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'rgba(255,179,71,0.8)'
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
        // Only show major milestones on mobile
        const isMajor = [20000, 1000000, 100000000].includes(cp);
        return (
          <Box 
            key={cp}
            className={!isMajor ? 'hidden sm:flex' : ''}
            sx={{ 
              position: 'absolute', 
              top: { xs: -45, sm: -70 },
              left: `${position}%`, 
              fontSize: { xs: '9px', sm: '12px' },
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {cp === 20000 && (
              <img src={img20k} alt="20k milestone" style={{ width: 20, height: 'auto', marginBottom: 2 }} className="sm:w-8" />
            )}
            {cp === 200000 && (
              <img src={img200k} alt="200k milestone" style={{ width: 20, height: 'auto', marginBottom: 2 }} className="sm:w-8" />
            )}
            {cp === 500000 && (
              <img src={img500k} alt="500k milestone" style={{ width: 20, height: 'auto', marginBottom: 2 }} className="sm:w-8" />
            )}
            {cp === 750000 && (
              <img src={img750k} alt="750k milestone" style={{ width: 20, height: 'auto', marginBottom: 2 }} className="sm:w-8" />
            )}
            {cp === 1000000 && (
              <img src={img1m} alt="1m milestone" style={{ width: 20, height: 'auto', marginBottom: 2 }} className="sm:w-8" />
            )}
            {cp === 2000000 && (
              <img src={img2m} alt="2m milestone" style={{ width: 20, height: 'auto', marginBottom: 2 }} className="sm:w-8" />
            )}
            <span style={{ marginTop: cp === 20000 ? 2 : 0 }}>{label}</span>
          </Box>
        );
      })}
      
      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        <div className="market-cap-text">
          Market Cap: {formatMarketCap(marketCap)}
        </div>
      </Box>
    </Box>
  );
}

export default FlipCoinTracker;

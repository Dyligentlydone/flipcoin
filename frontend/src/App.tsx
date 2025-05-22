import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import Flipping from './pages/Flipping';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/flipping" element={<Flipping />} />
      </Routes>
    </Router>
  );
}

export default App;

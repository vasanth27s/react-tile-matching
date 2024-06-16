// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import GameBoard from './components/GameBoard';
import SuccessScreen from './components/SuccessScreen';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/game" element={<GameBoard />} />
                <Route path="/success" element={<SuccessScreen />} />
            </Routes>
        </Router>
    );
};

export default App;

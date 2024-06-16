import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            localStorage.setItem('playerName', name.trim());
            navigate('/game');
        }
    };

    return (
        <div className="welcome-screen">
            <div className="content">
                <h1>Welcome to the Tile Matching Game!</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nameInput">Enter your name:</label>
                    <input
                        type="text"
                        id="nameInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <button type="submit">Start Game</button>
                </form>
            </div>
        </div>
    );
};

export default WelcomeScreen;

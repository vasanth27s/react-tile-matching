import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessScreen.css';

const SuccessScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRestart = () => {
        navigate('/');
    };

    const { score, time } = location.state || { score: 0, time: 0 };

    return (
        <div className="success-screen">
            <div className="content">
                <h1>Congratulations!</h1>
                <div className="result-box">
                    <p>Game Finished!</p>
                    <p>Score: {score}</p>
                    <p>Time: {time}s</p>
                </div>
                <button onClick={handleRestart}>Play Again</button>
            </div>
        </div>
    );
};

export default SuccessScreen;

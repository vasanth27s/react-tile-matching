import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameBoard.css';

const generateTiles = () => {
    const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍑', '🍍'];
    return [...icons, ...icons].sort(() => Math.random() - 0.5).map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false
    }));
};

const GameBoard = () => {
    const [tiles, setTiles] = useState(generateTiles());
    const [flippedTiles, setFlippedTiles] = useState([]);
    const [score, setScore] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const navigate = useNavigate();
    const playerName = localStorage.getItem('playerName');

    const endGame = useCallback(() => {
        navigate('/success', { state: { score, time: timeElapsed } });
    }, [navigate, score, timeElapsed]);

    // Effect to handle timer increment
    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeElapsed(prevTime => prevTime + 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    // Effect to check for matched tiles
    useEffect(() => {
        if (flippedTiles.length === 2) {
            const [firstTile, secondTile] = flippedTiles;
            if (firstTile.icon === secondTile.icon) {
                setTiles(prevTiles =>
                    prevTiles.map(tile =>
                        tile.id === firstTile.id || tile.id === secondTile.id
                            ? { ...tile, isMatched: true }
                            : tile
                    )
                );
                setScore(prevScore => prevScore + 1);
            } else {
                setTimeout(() => {
                    setTiles(prevTiles =>
                        prevTiles.map(tile =>
                            tile.id === firstTile.id || tile.id === secondTile.id
                                ? { ...tile, isFlipped: false }
                                : tile
                        )
                    );
                }, 1000);
            }
            setFlippedTiles([]);
        }

        // Check if all tiles are matched to end the game
        if (tiles.every(tile => tile.isMatched)) {
            endGame();
        }
    }, [flippedTiles, tiles, endGame]);

    const handleTileClick = (id) => {
        if (flippedTiles.length < 2) {
            setTiles(prevTiles =>
                prevTiles.map(tile =>
                    tile.id === id ? { ...tile, isFlipped: true } : tile
                )
            );
            setFlippedTiles(prevFlippedTiles => [
                ...prevFlippedTiles,
                tiles.find(tile => tile.id === id)
            ]);
        }
    };

    return (
        <div className="game-board">
            <div className="player-info">
                <p>Player: {playerName}</p>
            </div>
            <div className="mahjong-board">
                {/* Mahjong board content (if any) */}
            </div>
            <div className="score-time">
                <span>Score: {score}</span>
                <span>Time Elapsed: {timeElapsed}s</span>
            </div>
            <div className="tiles-container">
                {tiles.map(tile => (
                    <div
                        key={tile.id}
                        className={`tile ${tile.isFlipped || tile.isMatched ? 'flipped' : ''}`}
                        onClick={() => !tile.isFlipped && !tile.isMatched && handleTileClick(tile.id)}
                    >
                        {tile.isFlipped || tile.isMatched ? tile.icon : '?'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;

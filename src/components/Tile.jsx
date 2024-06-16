// src/components/Tile.jsx
import React from 'react';

const Tile = ({ tile, isFlipped, onClick }) => {
    return (
        <div className="tile" onClick={onClick}>
            {isFlipped ? <div className="tile-content">{tile.id}</div> : <div className="tile-back"></div>}
        </div>
    );
};

export default Tile;

import React, { useState } from 'react';

function Playlist({
    url, title, artist, select, toggleSelect,
}) {
    const [isSelected, setIsSelected] = useState(select);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    };

    return (
        <div className="cardPlaylist">
            <img src={url} alt={title} />
            <div className="wrap-info">
                <h3>{title}</h3>
                <p>{artist}</p>
            </div>
            <button className="btn-green" onClick={handleSelect}>
                {isSelected ? 'Deselect' : 'Select'}
            </button>
        </div>
    );
}

export default Playlist;

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
            <h3>{title}</h3>
            <p>{artist}</p>
            <button className="btn-green" onClick={handleSelect}>
                {isSelected ? 'Deselect' : 'Select'}
            </button>
        </div>
    );
}

export default Playlist;

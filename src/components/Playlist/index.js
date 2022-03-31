function Playlist({url, title, artist}) {
    return (
        <div className='cardPlaylist'>
            <img src={url} alt={title} />
            <h3>{title}</h3>
            <p>{artist}</p>
            <button className="btn-green">Select</button>
        </div>
    );
}

export default Playlist;

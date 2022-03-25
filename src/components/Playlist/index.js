function App({image, albumName, artistsName, buttonText}) {
    return (
        <div className='cardPlaylist'>
            <img src={image} alt={albumName + " " + artistsName} />
            <h3>{albumName}</h3>
            <p>{artistsName}</p>
            <button>{buttonText}</button>
        </div>
    );
}

export default App;

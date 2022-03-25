import './Style.css';
import data from './data.js';
import Playlist from './components/Playlist';

function App() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const image = data.album.images[0].url;
    const albumName = data.album.name;
    const artistsName = data.album.artists[0].name;
    
    return (
        <div className="App">
            <h1>My Playlist</h1>
            <Playlist image={image} albumName={albumName} artistsName={artistsName} buttonText="Select" />
        </div>
    );
}

export default App;

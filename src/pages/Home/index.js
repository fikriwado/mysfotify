import { useState, useEffect } from 'react';
import config from '../../utils/config';
import Playlist from '../../components/Playlist';
import Searchbar from '../../components/Searchbar';

function Home() {
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [isAuthorize, setIsAuthorize] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [selectedTrackURI, setSelectedTrackURI] = useState([]);

    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.hash).get("#access_token");
        setAccessToken(accessToken);
        setIsAuthorize(accessToken !== null);
    }, []);
    
    useEffect(() => {    
        if (!isSearch) {
            const selectedTracks = filterSelectedTracks();
            setTracks(selectedTracks);
        }

    }, [selectedTrackURI]);
    
    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_API_KEY;
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };
    
    const filterSelectedTracks = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri));
    };

    const handleSearch = (searchTracks) => {
        setIsSearch(true);
        const selectedTracks = filterSelectedTracks();
        
        const searchDistinctTracks = searchTracks.filter(
            (track) => !selectedTrackURI.includes(track.uri)
        );

        setTracks([...selectedTracks, ...searchDistinctTracks]);
    };

    
    const clearSearch = () => {
        const selectedTracks = filterSelectedTracks();

        setTracks(selectedTracks);
        setIsSearch(false);
    };

    const toggleSelect = (track) => {
        const uri = track.uri;
        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
        }
    };

    return (
        <div className="container">
            {!isAuthorize && (
                <div className="login-app">
                    <p>Before using the app, please login to Spotify here.</p>
                    <a href={getSpotifyLinkAuthorize()} className="btn-primary">Login</a>
                </div>
            )}

            {isAuthorize && (
                <>
                    <h1>Musify Playlist</h1>
                    <Searchbar
                        accessToken={accessToken}
                        onSuccess={(tracks) => handleSearch(tracks)}
                        clearSearch={clearSearch}
                    />

                    {tracks.length === 0 && <p>No tracks</p>}

                    <div className="track-list">
                        {tracks.map((track) => (
                            <Playlist
                                key={track.id}
                                url={track.album.images[0].url}
                                title={track.name}
                                artist={track.artists[0].name}
                                toggleSelect={() => toggleSelect(track)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;

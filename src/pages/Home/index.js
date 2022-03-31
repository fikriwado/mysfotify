import { useState, useEffect } from 'react';
import config from '../../utils/config';
import Playlist from '../../components/Playlist';
import Searchbar from '../../components/Searchbar';

function Home() {
    const [isAuthorize, setIsAuthorize] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.hash).get("#access_token");
        setAccessToken(accessToken);
        setIsAuthorize(accessToken !== null);
    }, [isAuthorize]);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_API_KEY;
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
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
                        onSuccess={(tracks) => setTracks(tracks)}
                    />

                    {tracks.length === 0 && <p>No tracks</p>}

                    <div className="track-list">
                        {tracks.map((track) => (
                            <Playlist
                                key={track.id}
                                url={track.album.images[0].url}
                                title={track.name}
                                artist={track.artists[0].name}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;

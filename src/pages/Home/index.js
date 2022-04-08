import { useState, useEffect } from 'react';
import config from '../../utils/config';
import Playlist from '../../components/Playlist';
import Searchbar from '../../components/Searchbar';
import FormPlaylist from '../../components/FormPlaylist';
import { getUserProfile } from '../../utils/fetchApi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';

function Home() {
    const [tracks, setTracks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [selectedTrackURI, setSelectedTrackURI] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const { isAuthorized } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessToken = params.get("#access_token");

        if (accessToken !== null) {
            const setUserProfile = async () => {
                try {
                    const response = await getUserProfile(accessToken);
                    dispatch(login({accessToken: accessToken, user: response}));
                } catch (e) {
                    alert(e);
                }
            };

            setUserProfile();
        }
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
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };
    
    const filterSelectedTracks = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri));
    };

    const handleSearch = (searchTracks) => {
        setIsSearch(true);
        
        const selectedSearchTracks = searchTracks.filter(
            (track) => selectedTrackURI.includes(track.uri)
        );

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };
    
    const clearSearch = () => {
        setTracks(selectedTracks);
        setIsSearch(false);
    };

    const toggleSelect = (track) => {
        const uri = track.uri;
        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
            setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
        }
    };

    return (
        <div className="container">
            {!isAuthorized && (
                <div className="login-app">
                    <p>Before using the app, please login to Spotify here.</p>
                    <a href={getSpotifyLinkAuthorize()} className="btn-primary">Login</a>
                </div>
            )}

            {isAuthorized && (
                <>
                    <h1>Musify Playlist</h1>
                    <FormPlaylist uris={selectedTrackURI} />

                    <hr />

                    <h3>Search Playlist</h3>
                    <Searchbar
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

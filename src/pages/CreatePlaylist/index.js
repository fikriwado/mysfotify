import { useState, useEffect } from 'react';
import Playlist from '../../components/Playlist';
import Searchbar from '../../components/Searchbar';
import FormPlaylist from '../../components/FormPlaylist';
import Navbar from "../../components/Navbar";

function Home() {
    const [tracks, setTracks] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [selectedTrackURI, setSelectedTrackURI] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);

    useEffect(() => {    
        if (!isSearch) {
            const selectedTracks = filterSelectedTracks();
            setTracks(selectedTracks);
        }

    }, [selectedTrackURI]);
    
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
            <Navbar />
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
        </div>
    );
}

export default Home;

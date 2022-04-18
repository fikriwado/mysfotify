import React, { useState, useEffect } from 'react';
import {
    Container, SimpleGrid, Heading, Text,
} from '@chakra-ui/react';
import Playlist from '../../components/Playlist';
import Searchbar from '../../components/Searchbar/index.tsx';
import FormPlaylist from '../../components/FormPlaylist';
import Navbar from '../../components/Navbar';

function CreatePlaylist() {
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

    const filterSelectedTracks = () => tracks.filter((track) => selectedTrackURI.includes(track.uri));

    const handleSearch = (searchTracks) => {
        setIsSearch(true);

        const selectedSearchTracks = searchTracks.filter(
            (track) => selectedTrackURI.includes(track.uri),
        );

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };

    const clearSearch = () => {
        setTracks(selectedTracks);
        setIsSearch(false);
    };

    const toggleSelect = (track) => {
        const { uri } = track;
        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
            setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
        }
    };

    return (
        <Container maxW="100%">
            <Navbar />

            <Heading as="h3" size="md" align="center">Create Playlist</Heading>
            <FormPlaylist uris={selectedTrackURI} />

            <Heading as="h3" size="md" mt={14} align="center">Search Playlist</Heading>
            <Searchbar
                onSuccess={(tracks) => handleSearch(tracks)}
                onClearSearch={clearSearch}
            />

            {tracks.length === 0 && <Text align="center">No tracks</Text>}

            <SimpleGrid columns={[1, 2, null, 4, 5, 6]} spacing={10}>
                {tracks.map((track) => (
                    <Playlist
                        key={track.id}
                        url={track.album.images[0].url}
                        title={track.name}
                        artist={track.artists[0].name}
                        select={selectedTrackURI.includes(track.uri)}
                        toggleSelect={() => toggleSelect(track)}
                    />
                ))}
            </SimpleGrid>
        </Container>
    );
}

export default CreatePlaylist;

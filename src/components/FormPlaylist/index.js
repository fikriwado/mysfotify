import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box, Input, Textarea, Text, Button,
} from '@chakra-ui/react';
import { addTracksToPlaylist, createPlaylist } from '../../utils/fetchApi';

function Playlist({ uris }) {
    const { accessToken, userId } = useSelector((state) => ({
        accessToken: state.auth.accessToken,
        userId: state.auth.user.id,
    }));

    const [playlist, setPlaylist] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const responsePlaylist = await createPlaylist(accessToken, userId, {
                name: playlist.title,
                description: playlist.description,
            });

            await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

            setPlaylist({
                title: '',
                description: '',
            });

            alert('Playlist created!');
        } catch (e) {
            alert(e);
        }
    };

    return (
        <Box maxW="md" p={4} mx="auto">
            <form onSubmit={handleSubmit}>
                <Text mb="8px" align="left">Title</Text>
                <Input
                    bg="white"
                    type="text"
                    name="title"
                    id="title"
                    value={playlist.title}
                    onChange={handleChange}
                    required
                    minLength={10}
                    mb="15px"
                />

                <Text mb="8px" align="left">Description</Text>
                <Textarea
                    bg="white"
                    id="desc"
                    name="description"
                    value={playlist.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    mb="15px"
                />
                <Button colorScheme="teal" width="100%">Submit</Button>
            </form>
        </Box>
    );
}

export default Playlist;

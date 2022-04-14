import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box, InputGroup, Input, Button,
} from '@chakra-ui/react';
import { searchTrack } from '../../utils/fetchApi';

function Searchbar({ onSuccess, onClearSearch }) {
    const [inputSearch, setInputSearch] = useState();
    const { accessToken } = useSelector((state) => state.auth);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await searchTrack(inputSearch, accessToken);
            const tracks = response.tracks.items;
            onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    };

    const clearSearch = () => {
        setInputSearch('');
        onClearSearch();
    };

    return (
        <Box maxW="md" p={4} mx="auto" align="center">
            <form onSubmit={(e) => handleSubmit(e)}>
                <InputGroup>
                    <Input
                        bg="white"
                        type="text"
                        name="query"
                        placeholder="masukkan keyword"
                        onChange={(e) => setInputSearch(e.target.value)}
                        required
                    />
                    <Button px={6} ml={2} colorScheme="teal" type="submit">Search</Button>
                </InputGroup>
            </form>

            <Button colorScheme="red" mx="auto" onClick={clearSearch} mt="20px">Refresh</Button>
        </Box>
    );
}

export default Searchbar;

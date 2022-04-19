import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box, Center, InputGroup, Input, Button,
} from '@chakra-ui/react';
import { TRootState } from '../../redux/store';
import { searchTrack } from '../../utils/fetchApi';

interface Props {
    onSuccess: (tracks: any[]) => void;
    onClearSearch: () => void;
}

const Searchbar: React.FC<Props> = ({ onSuccess, onClearSearch }) => {
    const [inputSearch, setInputSearch] = useState<string>('');
    const accessToken: string = useSelector(
        (state: TRootState) => state.auth.accessToken,
    );

    const handleInput = (e: React.ChangeEvent) => {
        const target = e.target as HTMLTextAreaElement;
        setInputSearch(target.value);
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await searchTrack(inputSearch, accessToken);
            const tracks = response.tracks.items;
            onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    };

    const clearSearch: () => void = () => {
        setInputSearch('');
        onClearSearch();
    };

    return (
        <Box maxW="md" p={4} mx="auto">
            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        bg="white"
                        type="text"
                        name="query"
                        aria-label="search-input"
                        placeholder="masukkan keyword"
                        onChange={handleInput}
                        required
                    />
                    <Button px={6} ml={2} colorScheme="teal" type="submit">Search</Button>
                </InputGroup>
            </form>

            <Center>
                <Button colorScheme="red" mx="auto" onClick={clearSearch} mt="20px">Refresh</Button>
            </Center>
        </Box>
    );
};

export default Searchbar;

import React, { useState } from 'react';
import {
    Box, Button, Image, Heading, Text,
} from '@chakra-ui/react';

function Playlist({
    url, title, artist, select, toggleSelect,
}) {
    const [isSelected, setIsSelected] = useState(select);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    };

    return (
        <Box p={5} bg="orange.100" borderRadius="lg">
            <Image src={url} alt={title} />
            <Box mt="10px">
                <Heading as="h3" size="md" noOfLines={1}>{title}</Heading>
                <Text>{artist}</Text>
            </Box>
            <Button colorScheme="teal" width="100%" mt="10px" onClick={handleSelect}>
                {isSelected ? 'Deselect' : 'Select'}
            </Button>
        </Box>
    );
}

export default Playlist;

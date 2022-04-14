import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Flex, Box, Heading, Button, Spacer,
} from '@chakra-ui/react';
import { logout } from '../../redux/authSlice';

function Navbar() {
    const dispatch = useDispatch();

    return (
        <Flex alignItems="center" pt={2} pb={3} mb={10} borderBottom="1px" borderColor="gray.400">
            <Box p="2">
                <Heading as="h1" size="lg">Musify</Heading>
            </Box>
            <Spacer />
            <Box>
                <Button colorScheme="teal" onClick={() => dispatch(logout())}>Logout</Button>
            </Box>
        </Flex>
    );
}

export default Navbar;

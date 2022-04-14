import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Box, Button } from '@chakra-ui/react';
import config from '../../utils/config';
import { getUserProfile } from '../../utils/fetchApi';
import { login } from '../../redux/authSlice';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash);
        const accessToken = params.get('#access_token');

        if (accessToken !== null) {
            const setUserProfile = async() => {
                try {
                    const response = await getUserProfile(accessToken);
                    dispatch(login({ accessToken, user: response }));
                    history.push('/create-playlist');
                } catch (e) {
                    alert(e);
                }
            };
            setUserProfile();
        }
    }, []);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_API_KEY;
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${config.RESPONSE_TYPE}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };
    return (
        <Container align="center" p={5}>
            <Box my={10}>
                <p>Before using the app, please login to Spotify here.</p>
                <a href={getSpotifyLinkAuthorize()}>
                    <Button colorScheme="teal" mt={3}>
                        Login
                    </Button>
                </a>
            </Box>
        </Container>
    );
}

export default Login;

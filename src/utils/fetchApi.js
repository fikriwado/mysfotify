import config from './config';

export const searchTrack = async(query, accessToken) => {
    const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${query}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }).then((data) => data.json());

    return response;
};

export const getUserProfile = async(accessToken) => {
    const response = await fetch(`${config.SPOTIFY_BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }).then((data) => data.json());

    return response;
};

export const createPlaylist = async(accessToken, userId, { name, description }) => {
    const response = await fetch(`${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            public: false,
            collaborative: false,
        }),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }).then((data) => data.json());

    return response;
};

export const addTracksToPlaylist = async(accessToken, playlistId, uris) => {
    const response = await fetch(`${config.SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        body: JSON.stringify({
            uris,
        }),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    }).then((data) => data.json());

    return response;
};

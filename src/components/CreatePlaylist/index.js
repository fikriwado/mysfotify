import { useState } from 'react';
import { addTracksToPlaylist, createPlaylist } from "../../utils/fetchApi";

function Playlist({ accessToken, userId, uris }) {
    const [playlist, setPlaylist] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.info(name, value);
        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const responsePlaylist = await createPlaylist(accessToken, userId, {
                name: playlist.title,
                description: playlist.description,
            });

            await addTracksToPlaylist(accessToken, responsePlaylist.id, uris);

            setPlaylist({
                title: "",
                description: "",
            });

            alert("Playlist created!");
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="form-playlist">
            <h3>Create Playlist</h3>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={playlist.title}
                        onChange={handleChange}
                        required
                        minLength={10}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description</label>
                    <textarea
                        id="desc"
                        name="description"
                        value={playlist.description}
                        onChange={handleChange}
                        required
                        rows={4}
                    ></textarea>
                </div>
                <button className="btn btn-green" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Playlist;

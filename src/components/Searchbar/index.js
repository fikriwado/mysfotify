import { useState } from 'react';
import config from "../../utils/config";

function Searchbar({ accessToken, onSuccess }) {
    const [inputSearch, setInputSearch] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${config.SPOTIFY_BASE_URL}/search?type=track&q=${inputSearch}`,
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                        "Content-Type": "application/json",
                    },
                }
            ).then((data) => data.json());

            const tracks = response.tracks.items;
            onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <form className="form-search" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
                <input
                    type="text"
                    name="query"
                    placeholder="Search..."
                    onChange={e => setInputSearch(e.target.value)}
                    required
                />
                <input type="submit" className="btn-primary" value="Search" />
            </div>
        </form>
    );
}

export default Searchbar;
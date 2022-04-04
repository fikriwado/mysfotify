import { useState } from 'react';
import { searchTrack } from "../../utils/fetchApi";

function Searchbar({ accessToken, onSuccess, clearSearch }) {
    const [inputSearch, setInputSearch] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await searchTrack(inputSearch, accessToken);
            const tracks = response.tracks.items;
            onSuccess(tracks);
        } catch (e) {
            alert(e);
        }
    }

    return (
        <>
            <form className="form-search" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group fg-search">
                    <input
                        type="text"
                        name="query"
                        placeholder="masukkan keyword"
                        onChange={e => setInputSearch(e.target.value)}
                        required
                    />
                    <input type="submit" className="btn-green" value="Search" />
                </div>
            </form>
            
            <button className="btn btn-red btn-refresh" onClick={clearSearch}>
                Refresh
            </button>
        </>
    );
}

export default Searchbar;
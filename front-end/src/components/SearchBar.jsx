import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input className="searchInput" type="text" id="search" onChange={handleChange}/>
                {/* <button className="searchButton"/> */}
            </form>
        </header>
    );
}

export default SearchBar;

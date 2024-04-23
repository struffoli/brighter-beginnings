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
        if (searchTerm.trim() === '') return;
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        window.location.reload();
    };

    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input className="searchInput" type="text" id="search" onChange={handleChange} placeholder = "Search"/>
            </form>
        </header>
    );
}

export default SearchBar;

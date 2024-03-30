import React, { useState } from "react";

function SearchBar({ getSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getSearchResults(searchTerm);
    };

    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input className="searchInput" type="text" id="search" onChange={handleChange}/>
                <button className="searchButton"/>
            </form>
        </header>
    );
}

export default SearchBar;

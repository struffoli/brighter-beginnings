import React, { useState } from "react";
import { cities } from "../data/cities";
import { organizations } from "../data/organizations";
import { scholarships } from "../data/scholarships";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({});

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const filteredCities = cities.filter(city =>
            city.name?.toLowerCase().includes(lowerCaseSearchTerm) || 
            city.info?.toLowerCase().includes(lowerCaseSearchTerm)
        );

        const filteredOrganizations = organizations.filter(org =>
            org.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            org.info?.toLowerCase().includes(lowerCaseSearchTerm)
        );
      
        const filteredScholarships = scholarships.filter(scholarship =>
            scholarship.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
            scholarship.info?.toLowerCase().includes(lowerCaseSearchTerm)
        );

        const combinedResults = {
          cities: filteredCities,
          organizations: filteredOrganizations,
          scholarships: filteredScholarships
        };

        setSearchResults(combinedResults);
        // display results here or pass them to another component
    };

    return (
        <header>
            <form className="search" onSubmit={handleSubmit}>
                <input className="searchInput" type="text" id="search" onChange={handleChange}/>
                <button className="searchButton"/>
            </form>
            {/* can also render search results here */}
        </header>
    );
}

export default SearchBar;

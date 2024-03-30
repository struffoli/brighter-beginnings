import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cities } from "../data/cities";
import { organizations } from "../data/organizations";
import { scholarships } from "../data/scholarships";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
    const query = useQuery();
    const searchTerm = query.get("query");
    const [searchResults, setSearchResults] = useState({});

    useEffect(() => {
        if (searchTerm) {
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
        }
    }, [searchTerm]);

    return (
        <div>
            <h2>Search Results</h2>
            {searchTerm && (
                <div>
                    <h3>Cities</h3>
                    {searchResults.cities && searchResults.cities.length > 0 ? (
                        <ul>
                            {searchResults.cities.map((city, index) => (
                                <li key={index}>{city.name} - {city.info}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No cities found</p>
                    )}

                    <h3>Organizations</h3>
                    {searchResults.organizations && searchResults.organizations.length > 0 ? (
                        <ul>
                            {searchResults.organizations.map((org, index) => (
                                <li key={index}>{org.name} - {org.info}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No organizations found</p>
                    )}

                    <h3>Scholarships</h3>
                    {searchResults.scholarships && searchResults.scholarships.length > 0 ? (
                        <ul>
                            {searchResults.scholarships.map((scholarship, index) => (
                                <li key={index}>{scholarship.name} - {scholarship.info}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No scholarships found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchResultsPage;

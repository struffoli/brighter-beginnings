import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CitiesCard from "../components/cards/CitiesCard";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
import OrganizationsCard from "../components/cards/OrganizationsCard";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
    const query = useQuery();
    const searchTerm = query.get("query");
    const [citiesResults, setCitiesResults] = useState([]);
    const [scholarshipsResults, setScholarshipsResults] = useState([]);
    const [organizationsResults, setOrganizationsResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm) {
                try {
                    const citiesResponse = await fetch(`https://api.brighterbeginnings.me/cities`);
                    const citiesData = await citiesResponse.json();
                    setCitiesResults(citiesData.Cities.filter(city =>
                        city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        city.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        city.population.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                        city.median_income.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        city.unemployment_rate.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                        city.poverty_rate.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    ));

                    const scholarshipsResponse = await fetch(`https://api.brighterbeginnings.me/scholarships`);
                    const scholarshipsData = await scholarshipsResponse.json();
                    setScholarshipsResults(scholarshipsData.Scholarships.filter(scholarship => {
                        const nameMatch = scholarship.name && scholarship.name.toLowerCase().includes(searchTerm.toLowerCase());
                        const awardedByMatch = scholarship.awarded_by && scholarship.awarded_by.toLowerCase().includes(searchTerm.toLowerCase());
                        const amountMatch = scholarship.award_amount !== undefined && scholarship.award_amount.toString().toLowerCase().includes(searchTerm.toLowerCase());
                        const meritBasedMatch = scholarship.merit_based === true && searchTerm.toLowerCase() === 'yes';
                        const needBasedMatch = scholarship.need_based === true && searchTerm.toLowerCase() === 'yes';
                        const essayBasedMatch = scholarship.essay_based === true && searchTerm.toLowerCase() === 'yes';
                        const nationwideMatch = scholarship.nationwide === true && searchTerm.toLowerCase() === 'yes';
                        
                        return nameMatch || awardedByMatch || amountMatch || meritBasedMatch || needBasedMatch || essayBasedMatch || nationwideMatch;
                    }));

                    const organizationsResponse = await fetch(`https://api.brighterbeginnings.me/organizations`);
                    const organizationsData = await organizationsResponse.json();
                    setOrganizationsResults(organizationsData.Organizations.filter(organization =>
                        organization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        organization.organization_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        organization.phone.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    ));
                } catch (error) {
                    console.error('Error fetching search data:', error);
                }
            }
        };
        fetchData();
    }, [searchTerm]);

    return (
        <div>
            <h2>Search Results for "{searchTerm}"</h2>

            <h3>Cities</h3>
            <div className="row">
                {citiesResults.length > 0 ? (
                    citiesResults.map((city, index) => (
                        <CitiesCard key={index} {...city} />
                    ))
                ) : ( <p>No cities found!</p> )}
            </div>

            <h3>Scholarships</h3>
            <div className="row">
                {scholarshipsResults.length > 0 ? (
                    scholarshipsResults.map((scholarship, index) => (
                        <ScholarshipsCard key={index} {...scholarship} />
                    ))
                ) : ( <p>No scholarships found!</p> )}
            </div>

            <h3>Organizations</h3>
            <div className="row">
                {organizationsResults.length > 0 ? (
                    organizationsResults.map((organization, index) => (
                        <OrganizationsCard key={index} {...organization} />
                    ))
                ) : ( <p>No organizations found!</p> )}
            </div>
        </div>
    );
}

export default SearchResultsPage;

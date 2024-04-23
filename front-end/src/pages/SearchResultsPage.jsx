import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CitiesCard from "../components/cards/CitiesCard";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
import OrganizationsCard from "../components/cards/OrganizationsCard";
import { getCities } from "./Cities";
import { getOrganizations } from "./Organizations";
import { getScholarships } from "./Scholarships";
import Pagination from "../components/Pagination.jsx";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
    const query = useQuery();
    const searchTerm = query.get("query");

    const [currentPageCity, setCurrentPageCity] = useState(1);
    const [currentPageOrg, setCurrentPageOrg] = useState(1);
    const [currentPageScholarship, setCurrentPageScholarship] = useState(1);
    const [itemsPerPage] = useState(15); // Set the number of items per page
    const [apiCities, setApiCities] = useState({ cities: [], total_cities: 0 });
    useEffect(() => {
        getCities(searchTerm, null).then((data) => setApiCities(data));
    }, []);

    const [apiOrganizations, setApiOrganizations] = useState({
        organizations: [],
        total_organizations: 0,
    });
    useEffect(() => {
        getOrganizations(searchTerm, null).then((data) => setApiOrganizations(data));
    }, []);

    const [apiScholarships, setApiScholarships] = useState({
        scholarships: [],
        total_scholarships: 0,
    });
    useEffect(() => {
        getScholarships(searchTerm, null).then((data) => setApiScholarships(data));
    }, []);

    const indexOfLastCityItem = currentPageCity * itemsPerPage;
    const indexOfFirstCityItem = indexOfLastCityItem - itemsPerPage;
    const currentCityItems = apiCities.cities.slice(
        indexOfFirstCityItem,
        indexOfLastCityItem
    );
    const paginateCity = (pageNumber) => setCurrentPageCity(pageNumber);

    const indexOfLastOrgItem = currentPageOrg * itemsPerPage;
    const indexOfFirstOrgItem = indexOfLastOrgItem - itemsPerPage;
    const currentOrgItems = apiOrganizations.organizations.slice(
        indexOfFirstOrgItem,
        indexOfLastOrgItem
    );
    const paginateOrg = (pageNumber) => setCurrentPageOrg(pageNumber);

    const indexOfLastScholarshipItem = currentPageScholarship * itemsPerPage;
    const indexOfFirstScholarshipItem = indexOfLastScholarshipItem - itemsPerPage;
    const currentScholarshipItems = apiScholarships.scholarships.slice(
        indexOfFirstScholarshipItem,
        indexOfLastScholarshipItem
    );
    const paginateScholarship = (pageNumber) => setCurrentPageScholarship(pageNumber);

    return (
        <div>
            <h2>Search Results for "{searchTerm}"</h2>

            {apiCities.cities.length > 0 ? (
            <>
              <div className="w-100">
                <p className="ms-4 ps-2 mb-2 pb-1">
                  <b>Cities</b>
                </p>
                <hr
                  className="mb-3"
                  style={{ width: "94%", margin: "auto" }}
                ></hr>
              </div>
              <div className="row justify-content-start mb-3 mx-4">
                {currentCityItems.map((city, index) => (
                  <CitiesCard
                    key={index}
                    id={city.id}
                    img_src={city.img_src}
                    name={city.name}
                    population={city.population}
                    median_income={city.median_income}
                    poverty_rate={city.poverty_rate}
                    state={city.state}
                    unemployment_rate={city.unemployment_rate}
                    organization={city.organization}
                    scholarship={city.scholarship}
                    searchText={searchTerm}
                  />
                ))}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={apiCities.cities.length}
                  paginate={paginateCity}
                  currentPage={currentPageCity}
                  currentItems={currentCityItems}
                />
              </div>
            </>
          ) : (<p>No cities found!</p>)}

            {apiOrganizations.organizations.length > 0 ? (
            <>
              <div className="w-100">
                <p className="ms-4 ps-2 mb-2 pb-1">
                  <b>Organizations</b>
                </p>
                <hr
                  className="mb-3"
                  style={{ width: "94%", margin: "auto" }}
                ></hr>
              </div>
              <div className="row justify-content-start mb-3 mx-4">
                {currentOrgItems.map((org, index) => (
                  <OrganizationsCard
                    key={index}
                    img_src={org.img_src}
                    name={org.name}
                    id={org.id}
                    email={org.email}
                    phone={org.phone}
                    organization_type={org.organization_type}
                    city={org.city}
                    scholarship={org.scholarship}
                    searchText={searchTerm}
                  />
                ))}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={apiOrganizations.organizations.length}
                  paginate={paginateOrg}
                  currentPage={currentPageOrg}
                  currentItems={currentOrgItems}
                />
              </div>
            </>
          ) : (<p>No organizations found!</p>)}

            {apiScholarships.scholarships.length > 0 ? (
            <>
              <div className="w-100">
                <p className="ms-4 ps-2 mb-2 pb-1">
                  <b>Scholarships</b>
                </p>
                <hr
                  className="mb-3"
                  style={{ width: "94%", margin: "auto" }}
                ></hr>
              </div>
              <div className="row justify-content-start mb-5 mx-4">
                {currentScholarshipItems.map((scholarship, index) => (
                  <ScholarshipsCard
                    key={index}
                    img_src={scholarship.img_src}
                    name={scholarship.name}
                    id={scholarship.id}
                    awarded_by={scholarship.awarded_by}
                    award_amount={scholarship.award_amount}
                    nationwide={scholarship.nationwide}
                    need_based={scholarship.need_based}
                    merit_based={scholarship.merit_based}
                    essay_based={scholarship.essay_based}
                    link={scholarship.link}
                    searchText={searchTerm}
                  />
                ))}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={apiScholarships.scholarships.length}
                  paginate={paginateScholarship}
                  currentPage={currentPageScholarship}
                  currentItems={currentScholarshipItems}
                />
              </div>
            </>
          ) : (<p>No scholarships found!</p>)}
        </div>
    );
}

export default SearchResultsPage;

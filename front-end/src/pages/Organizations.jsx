import React, { useState, useEffect } from "react";
import OrganizationsCard from "../components/cards/OrganizationsCard";
// import { organizations } from "../data/organizations";
import Pagination from "../components/Pagination";
import "./Organizations.css";
import AwesomeSearch from "../components/AwesomeSearch";

async function getOrganizations() {
  let organizations = [];
  let total_organizations = 0;
  try {
    const response = await fetch(
      "https://api.brighterbeginnings.me/organizations"
    );
    const result = await response.json();
    organizations = result["Organizations"];
    total_organizations = result["Total organizations"];
  } catch (error) {
    console.log(error);
  }
  return { organizations, total_organizations };
}

export async function getOrganizationById(id) {
  let organization = {};
  try {
    const response = await fetch(
      `https://api.brighterbeginnings.me/organizations/${id}`
    );
    organization = await response.json();
  } catch (error) {
    console.log(error);
  }
  return organization;
}

const Organizations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Set the number of items per page
  const [searchText, setSearchText] = useState("");

  const [apiOrganizations, setApiOrganizations] = useState({
    organizations: [],
    total_organizations: 0,
  });
  useEffect(() => {
    getOrganizations().then((data) => setApiOrganizations(data));
  }, []);

  const [searchOrganizations, setSearchOrganizations] = useState({
    organizations: [],
    total_organizations: 0,
  });
  useEffect(() => {
    setSearchOrganizations(apiOrganizations);
  }, [apiOrganizations]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = organizations.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = searchOrganizations.organizations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOrganizationsSearch = (searchText) => {
    if (searchText === "") {
      setSearchText("");
      setSearchOrganizations(apiOrganizations);
    } else {
      setSearchText(searchText);
      setSearchOrganizations({
        organizations: apiOrganizations.organizations.filter(
          (organization) =>
            organization.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            organization.organization_type
              .toLowerCase()
              .includes(searchText.toLowerCase())
        ),
      });
    }
  };

  return (
    <div>
      <h2 className="title">
        <b>Organizations</b>
      </h2>
      <AwesomeSearch handleSearch={handleOrganizationsSearch} />
      <div className="row justify-content-start mb-5 mx-4">
        {currentItems.map((org, index) => (
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
            searchText={searchText}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={searchOrganizations.organizations.length}
        paginate={paginate}
        currentPage={currentPage}
        currentItems={currentItems}
      />
    </div>
  );
};

export default Organizations;

import React, { useState, useEffect } from "react";
import OrganizationsCard from "../components/cards/OrganizationsCard";
// import { organizations } from "../data/organizations";
import Pagination from "../components/Pagination";
import "./Organizations.css";

async function getOrganizations() {
  let organizations = [];
  let total_organizations = 0;
  try {
    const response = await fetch("https://api.brighterbeginnings.me/organizations");
    const result = await response.json();
    organizations = result["Organizations"];
    total_organizations = result["Total organizations"];
  } catch (error) {
    console.log(error);
  }
  return { organizations, total_organizations }
}

export async function getOrganizationById(id) {
  let organization = {};
  try {
    const response = await fetch(`https://api.brighterbeginnings.me/organizations/${id}`);
    organization = await response.json();
  } catch (error) {
    console.log(error);
  }
  return organization;
}

const Organizations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Set the number of items per page

  const [apiOrganizations, setApiOrganizations] = useState({ organizations: [], total_organizations: 0 });
  useEffect(() => {
    getOrganizations().then((data) => setApiOrganizations(data));
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = organizations.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = apiOrganizations.organizations.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <h2 className="title">
        <b>Organizations</b>
      </h2>
      <div className="row justify-content-center mb-5 mx-4">
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
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={apiOrganizations.total_organizations}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Organizations;

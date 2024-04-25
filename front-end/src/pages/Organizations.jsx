import React, { useState, useEffect } from "react";
import OrganizationsCard from "../components/cards/OrganizationsCard";
// import { organizations } from "../data/organizations";
import Pagination from "../components/Pagination";
import "./Organizations.css";
import AwesomeSearch from "../components/AwesomeSearch";

export async function getOrganizations(search, sort, filter) {
  let organizations = [];
  let total_organizations = 0;
  try {
    let sorts = [null, "address", "name", "organization_type"];
    let filters = [null, "email", "phone"];
    const response = await fetch(
      "https://api.brighterbeginnings.me/organizations" +
        (search === "" ? "?" : "?search=" + search + "&") +
        (sorts[sort] ? "sort=" + sorts[sort] + "&" : "") +
        (filters[filter] ? "filter=" + filters[filter] + "&" : "")
    ); // also need to paginate using api instead
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
    getOrganizations("", null, null).then((data) => setApiOrganizations(data));
  }, []);

  // const [searchOrganizations, setSearchOrganizations] = useState({
  //   organizations: [],
  //   total_organizations: 0,
  // });
  // useEffect(() => {
  //   setSearchOrganizations(apiOrganizations);
  // }, [apiOrganizations]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = organizations.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = apiOrganizations.organizations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let sorts = ["None", "Address", "Name", "Organization Type"];
  let filters = ["None", "Has Email", "Has phone number"];

  const handleOrganizationsSearch = (newText, sort, filter) => {
    if (searchText !== newText) {
      setSearchText(newText);
      getOrganizations(
        newText,
        sorts.indexOf(sort),
        filters.indexOf(filter)
      ).then((data) => setApiOrganizations(data));
      setCurrentPage(1);
    }
  };

  return (
    <div>
      <h2 className="title">
        <b>Organizations</b>
      </h2>
      <AwesomeSearch
        handleSearch={handleOrganizationsSearch}
        sorts={sorts}
        filters={filters}
      />
      <div className="row justify-content-start mb-5 mx-4">
        {apiOrganizations.organizations.length === 0 && (
          <div className="text-center mt-5">
            <h4>No items found!</h4>
          </div>
        )}
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
            address={org.address}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={apiOrganizations.organizations.length}
        paginate={paginate}
        currentPage={currentPage}
        currentItems={currentItems}
      />
    </div>
  );
};

export default Organizations;

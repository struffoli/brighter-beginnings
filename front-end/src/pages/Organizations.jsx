import React, {useState} from "react";
import OrganizationsCard from "../components/cards/OrganizationsCard";
import { organizations } from "../data/organizations";
import Pagination from "../components/Pagination";
import "./Organizations.css";

const Organizations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Set the number of items per page

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = organizations.slice(indexOfFirstItem, indexOfLastItem);

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
            location={org.location}
            city={org.city}
            description={org.description}
            contactInfo={org.contactInfo}
            organizationType={org.organizationType}
            scholarship={org.scholarship}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={organizations.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Organizations;

import React, {useState} from "react";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
import { scholarships } from "../data/scholarships";
import Pagination from "../components/Pagination"
import "./Scholarships.css"

const Scholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Set the number of items per page

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = scholarships.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
      <h2 className="title">
        <b>Scholarships</b>
      </h2>
      <div className="row justify-content-center mb-5 mx-4">
        {currentItems.map((scholarship, index) => (
          <ScholarshipsCard
            key={index}
            img_src={scholarship.img_src}
            name={scholarship.name}
            id={scholarship.id}
            donor={scholarship.donor}
            area={scholarship.area}
            ageGroup={scholarship.ageGroup}
            award={scholarship.award}
            recipients={scholarship.recipients}
            description={scholarship.description}
            city={scholarship.city}
            organization={scholarship.organization}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={scholarships.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Scholarships;

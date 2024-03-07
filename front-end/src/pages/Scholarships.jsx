import React, { useState, useEffect } from "react";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
// import { scholarships } from "../data/scholarships";
import Pagination from "../components/Pagination"
import "./Scholarships.css"

async function getScholarships() {
  let scholarships = [];
  let total_scholarships = 0;
  try {
    const response = await fetch("https://api.brighterbeginnings.me/scholarships");
    const result = await response.json();
    scholarships = result["Scholarships"];
    total_scholarships = result["Total scholarships"];
  } catch (error) {
    console.log(error);
  }
  return { scholarships, total_scholarships }
}

export async function getScholarshipById(id) {
  let scholarship = {};
  try {
    const response = await fetch(`https://api.brighterbeginnings.me/scholarships/${id}`);
    scholarship = await response.json();
  } catch (error) {
    console.log(error);
  }
  return scholarship;
}

const Scholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Set the number of items per page

  // Get scholarships from API
  const [apiScholarships, setApiScholarships] = useState({ scholarships: [], total_scholarships: 0 });
  useEffect(() => {
    getScholarships().then((data) => setApiScholarships(data));
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiScholarships.scholarships.slice(indexOfFirstItem, indexOfLastItem);

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
        totalItems={apiScholarships.total_scholarships}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Scholarships;

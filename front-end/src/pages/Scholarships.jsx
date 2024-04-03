import React, { useState, useEffect } from "react";
import ScholarshipsCard from "../components/cards/ScholarshipsCard";
// import { scholarships } from "../data/scholarships";
import Pagination from "../components/Pagination";
import "./Scholarships.css";
import AwesomeSearch from "../components/AwesomeSearch";

async function getScholarships() {
  let scholarships = [];
  let total_scholarships = 0;
  try {
    const response = await fetch(
      "https://api.brighterbeginnings.me/scholarships"
    );
    const result = await response.json();
    scholarships = result["Scholarships"];
    total_scholarships = result["Total scholarships"];
  } catch (error) {
    console.log(error);
  }
  return { scholarships, total_scholarships };
}

export async function getScholarshipById(id) {
  let scholarship = {};
  try {
    const response = await fetch(
      `https://api.brighterbeginnings.me/scholarships/${id}`
    );
    scholarship = await response.json();
  } catch (error) {
    console.log(error);
  }
  return scholarship;
}

const Scholarships = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Set the number of items per page
  const [searchText, setSearchText] = useState("");

  // Get scholarships from API
  const [apiScholarships, setApiScholarships] = useState({
    scholarships: [],
    total_scholarships: 0,
  });
  useEffect(() => {
    getScholarships().then((data) => setApiScholarships(data));
  }, []);

  const [searchScholarships, setSearchScholarships] = useState({
    scholarships: [],
    total_scholarships: 0,
  });
  useEffect(() => {
    setSearchScholarships(apiScholarships);
  }, [apiScholarships]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchScholarships.scholarships.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleScholarshipsSearch = (searchText) => {
    if (searchText === "") {
      setSearchText("");
      setSearchScholarships(apiScholarships);
    } else {
      setSearchText(searchText);
      setSearchScholarships({
        scholarships: apiScholarships.scholarships.filter(
          (scholarship) =>
            (scholarship.name &&
              scholarship.name
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (scholarship.awarded_by &&
              scholarship.awarded_by
                .toLowerCase()
                .includes(searchText.toLowerCase()))
        ),
      });
    }
  };

  return (
    <div>
      <h2 className="title">
        <b>Scholarships</b>
      </h2>
      <AwesomeSearch handleSearch={handleScholarshipsSearch} />
      <div className="row justify-content-start mb-5 mx-4">
        {currentItems.map((scholarship, index) => (
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
            searchText={searchText}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={apiScholarships.total_scholarships}
        paginate={paginate}
        currentPage={currentPage}
        currentItems={currentItems}
      />
    </div>
  );
};

export default Scholarships;

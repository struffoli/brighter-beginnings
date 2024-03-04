import React, {useState} from "react";
import CitiesCard from "../components/cards/CitiesCard";
import { cities } from "../data/cities.js"; // Importing cities data
import mapPage from "../assets/maptemp.png";
import Pagination from "../components/Pagination.jsx";
import "./Cities.css"

const Cities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Set the number of items per page

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cities.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div>
      <h2 className="title">
        <b>Cities</b>
      </h2>
      <div className="row justify-content-center pb-4">
        <img
          className=""
          src={mapPage}
          style={{ height: "50%", width: "50%" }}
          alt="Scholarship"
        />
      </div>
      <div className="row justify-content-center mb-5 mx-4">
        {currentItems.map((city, index) => (
          <CitiesCard
            key={index}
            img_src={city.img_src}
            name={city.name}
            population={city.population}
            numSchools={city.numSchools}
            testScore={city.testScore}
            medianIncome={city.medianIncome}
            percentUnemployment={city.percentUnemployment}
            freeLunch={city.freeLunch}
            educated={city.educated}
            organization={city.organization}
            scholarship={city.scholarship}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={cities.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Cities;

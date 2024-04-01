import React, { useState, useEffect } from "react";
import CitiesCard from "../components/cards/CitiesCard";
// vvvvvvvvvvvvvvvvvvvvvvvvvvvv this should no longer be needed !!!!!!!!
// import { cities } from "../data/cities.js"; // Importing cities data
// import mapPage from "../assets/maptemp.png";
import Pagination from "../components/Pagination.jsx";
import "./Cities.css";
import AwesomeSearch from "../components/AwesomeSearch.jsx";
import states from "../data/states.js";

async function getCities() {
  let cities = [];
  let total_cities = 0;
  try {
    const response = await fetch("https://api.brighterbeginnings.me/cities");
    const result = await response.json();
    cities = result["Cities"];
    total_cities = result["Total cities"];
  } catch (error) {
    console.log(error);
  }
  return { cities, total_cities };
}

export async function getCityById(id) {
  let city = null;
  try {
    const response = await fetch(
      `https://api.brighterbeginnings.me/cities/${id}`
    );
    city = await response.json();
  } catch (error) {
    console.log(error);
  }
  return city;
}

const Cities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // Set the number of items per page

  // Get cities from API
  const [apiCities, setApiCities] = useState({ cities: [], total_cities: 0 });
  useEffect(() => {
    getCities().then((data) => setApiCities(data));
  }, []);

  const [searchCities, setSearchCities] = useState({
    cities: [],
    total_cities: 0,
  });
  useEffect(() => {
    setSearchCities(apiCities);
  }, [apiCities]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = cities.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = searchCities.cities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCitiesSearch = (searchText) => {
    if (searchText === "") {
      setSearchCities(apiCities);
    } else {
      setSearchCities({
        cities: apiCities.cities.filter(
          (city) =>
            city.name.toLowerCase().includes(searchText.toLowerCase()) ||
            city.state.toLowerCase().includes(searchText.toLowerCase()) ||
            states[city.state].abbreviation
              .toLowerCase()
              .includes(searchText.toLowerCase())
        ),
      });
    }
  };

  return (
    <div>
      <h2 className="title">
        <b>Cities</b>
      </h2>
      <AwesomeSearch handleSearch={handleCitiesSearch} />
      <div className="row justify-content-start mb-5 mx-4">
        {currentItems.map((city, index) => (
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
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={searchCities.cities.length}
        paginate={paginate}
        currentPage={currentPage}
        currentItems={currentItems}
      />
    </div>
  );
};

export default Cities;

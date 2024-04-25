import React, { useState, useEffect } from "react";
import CitiesCard from "../components/cards/CitiesCard";
// vvvvvvvvvvvvvvvvvvvvvvvvvvvv this should no longer be needed !!!!!!!!
// import { cities } from "../data/cities.js"; // Importing cities data
// import mapPage from "../assets/maptemp.png";
import Pagination from "../components/Pagination.jsx";
import "./Cities.css";
import AwesomeSearch from "../components/AwesomeSearch.jsx";
// import states from "../data/states.js";

export async function getCities(search, sort) {
  let cities = [];
  let total_cities = 0;
  try {
    let sorts = [
      null,
      null,
      "population",
      "name",
      "state",
      "median_income",
      "unemployment_rate",
      "college_educated_rate",
      "poverty_rate",
    ];
    const response = await fetch(
      "https://api.brighterbeginnings.me/cities" +
        (search === "" ? "?" : "?search=" + search + "&") +
        (sorts[sort] ? "sort=" + sorts[sort] : "")
    ); // also need to paginate using api instead
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
  const [searchText, setSearchText] = useState("");

  // Get cities from API
  const [apiCities, setApiCities] = useState({ cities: [], total_cities: 0 });
  useEffect(() => {
    getCities("", null).then((data) => setApiCities(data));
  }, []);

  // const [searchCities, setSearchCities] = useState({
  //   cities: [],
  //   total_cities: 0,
  // });
  // useEffect(() => {
  //   setSearchCities(apiCities);
  // }, [apiCities]);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = cities.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = apiCities.cities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let sorts = [
    "None",
    "Population (↓)",
    "Population (↑)",
    "Name",
    "State",
    "Median Income",
    "Unemployment Rate",
    "College Educated Rate",
    "Poverty Rate",
  ];
  let filters = null;

  const handleCitiesSearch = (newText, searchSort, searchFilters) => {
    if (searchText !== newText) {
      setSearchText(newText);
      getCities(newText, sorts.indexOf(searchSort)).then((data) =>
        setApiCities(data)
      );
      setCurrentPage(1);
    }
  };

  return (
    <div>
      <h2 className="title">
        <b>Cities</b>
      </h2>
      <AwesomeSearch
        handleSearch={handleCitiesSearch}
        sorts={sorts}
        filters={filters}
      />

      <div className="row justify-content-start mb-5 mx-4">
        {apiCities.cities.length === 0 && (
          <div className="text-center mt-5">
            <h4>No items found!</h4>
          </div>
        )}

        {currentItems.map((city, index) => (
          <CitiesCard
            key={index}
            id={city.id}
            img_src={city.img_src}
            name={city.name}
            population={city.population}
            median_income={city.median_income}
            poverty_rate={city.poverty_rate}
            college_educated_rate={city.college_educated_rate}
            state={city.state}
            unemployment_rate={city.unemployment_rate}
            organization={city.organization}
            scholarship={city.scholarship}
            searchText={searchText}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={apiCities.cities.length}
        paginate={paginate}
        currentPage={currentPage}
        currentItems={currentItems}
      />
    </div>
  );
};

export default Cities;

import React, { useState, useEffect } from "react";

function AwesomeSearch({ handleSearch, sorts, filters}) {
  const [searchText, setSearchText] = useState("");

  const searchInputHandler = (enteredText) => {
    setSearchText(enteredText);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  useEffect(() => {
    let selectedSort = document.querySelector('input[name="sort"]:checked');
    selectedSort = selectedSort ? selectedSort.nextSibling.textContent : "";
    let selectedFilter = document.querySelector('input[name="filter"]:checked');
    selectedFilter = selectedFilter ? selectedFilter.nextSibling.textContent : "";
    const getData = setTimeout(() => {
      handleSearch(searchText, selectedSort, selectedFilter);
    }, 300);

    return () => clearTimeout(getData);
  }, [searchText, handleSearch]);

  let sortChoices = sorts ? [<h6 class="dropdown-header">Sorting</h6>] : [];
  for (let sort in sorts) {
    sortChoices.push(
      <div className="ms-3 form-check">
        <input
          class="form-check-input"
          type="radio"
          id={"radio" + sorts[sort]}
          name="sort"
          onChange={(event) => searchInputHandler(searchText)}
        />
        <label class="form-check-label" for={"radio" + sorts[sort]}>
          {sorts[sort]}
        </label>
      </div>
    );
  }

  let filterChoices = filters ? [<h6 class="dropdown-header">Filtering</h6>] : [];
  for (let filter in filters) {
    filterChoices.push(
      <div className="ms-3 form-check">
        <input
          class="form-check-input"
          type="radio"
          id={"radio" + filters[filter]}
          name="filter"
          onChange={(event) => searchInputHandler(searchText)}
        />
        <label class="form-check-label" for={"checkbox" + filters[filter]}>
          {filters[filter]}
        </label>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between">
      <div className="input-group mb-3 ps-2 ms-4 me-1">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: "white",
              borderRight: 0,
            }}
          >
            <i className="bi bi-search"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon1"
          style={{ borderLeft: 0, borderRight: 0 }}
          onChange={(event) => searchInputHandler(event.target.value)}
          value={searchText}
        />
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            id="basic-addon1"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor: "white",
              borderLeft: 0,
            }}
          >
            {searchText.length !== 0 ? (
              <i
                className="bi bi-x"
                onClick={clearSearch}
                style={{ cursor: "pointer" }}
              ></i>
            ) : (
              <i className="bi bi-x" style={{ color: "white" }}></i>
            )}
          </span>
        </div>
      </div>
      <div className="dropdown ms-1 pe-2 me-4">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false">
          Sort / Filter
        </button>
        <ul className="dropdown-menu">
            {sortChoices}
            {filterChoices}
        </ul>
      </div>
    </div>
  );
}

export default AwesomeSearch;

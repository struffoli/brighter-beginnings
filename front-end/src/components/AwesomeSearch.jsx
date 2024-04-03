import React, { useState, useEffect } from "react";

function AwesomeSearch({ handleSearch }) {
  const [searchText, setSearchText] = useState("");

  const searchInputHandler = (enteredText) => {
    setSearchText(enteredText);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      handleSearch(searchText);
    }, 300);

    return () => clearTimeout(getData);
  }, [searchText, handleSearch]);

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
          aria-expanded="false"
        >
          Filter
        </button>
        <ul className="dropdown-menu">
          <li>
            <div className="dropdown-item btn">Name (Ascending)</div>
          </li>
          <li>
            <div className="dropdown-item btn">Name (Descending)</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AwesomeSearch;

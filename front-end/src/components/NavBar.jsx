import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from "./SearchBar";
import {cities} from "../data/cities";
import {organizations} from "../data/organizations";
import {scholarships} from "../data/scholarships";
import React, { useState } from 'react';
import "./NavBar.css"

function NavBar() {
  const [searchResults, setSearchResults] = useState({});

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredCities = cities.filter(city =>
      city.name?.toLowerCase().includes(lowerCaseSearchTerm) || 
      city.info?.toLowerCase().includes(lowerCaseSearchTerm)
    );

    const filteredOrganizations = organizations.filter(org =>
      org.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
      org.info?.toLowerCase().includes(lowerCaseSearchTerm)
    );

    const filteredScholarships = scholarships.filter(scholarship =>
      scholarship.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
      scholarship.info?.toLowerCase().includes(lowerCaseSearchTerm)
    );

    const combinedResults = {
      cities: filteredCities,
      organizations: filteredOrganizations,
      scholarships: filteredScholarships
    };

    console.log(combinedResults);
    setSearchResults({combinedResults });
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" color="#3cdfff">Brighter Beginnings</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/cities">Cities</Nav.Link>
            <Nav.Link href="/organizations">Organizations</Nav.Link>
            <Nav.Link href="/scholarships">Scholarships</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
          </Nav>
          <div className="ms-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
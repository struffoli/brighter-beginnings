import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from "./SearchBar";
import "./NavBar.css"

function NavBar() {
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log(`Search for: ${searchTerm}`);
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
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AboutSubPage from "./pages/AboutSubPage";
import Cities from "./pages/Cities";
import Organizations from "./pages/Organizations";
import Scholarships from "./pages/Scholarships";
import NavBar from "./components/NavBar";
import CitiesSubPage from "./pages/CitySubPage";
import OrganizationSubPage from "./pages/OrganizationSubPage";
import ScholarshipsSubPage from "./pages/ScholarshipSubPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import Visualizations from "./pages/Visualizations";
import ProviderVisualizations from "./pages/ProviderVisualizations";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about/" element={<About />}></Route>
          <Route path="/about/dev/" element={<AboutSubPage />}></Route>
          <Route path="/cities/" element={<Cities />}></Route>
          {/* add subpages */}
          <Route path="/cities/city/" element={<CitiesSubPage />}></Route>
          <Route path="/organizations/" element={<Organizations />}></Route>
          <Route
            path="/organizations/org/"
            element={<OrganizationSubPage />}
          ></Route>
          <Route path="/scholarships/" element={<Scholarships />}></Route>
          <Route
            path="/scholarships/schp/"
            element={<ScholarshipsSubPage />}
          ></Route>
          <Route path="/search/" element={<SearchResultsPage />}></Route>
          <Route path="/visualizations/" element={<Visualizations />}></Route>
          <Route
            path="/provider-visualizations/"
            element={<ProviderVisualizations />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

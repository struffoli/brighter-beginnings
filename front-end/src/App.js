import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import NavBar from './components/NavBar';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

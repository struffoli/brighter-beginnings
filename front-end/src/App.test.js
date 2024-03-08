import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from './App';
import Scholarships from "./pages/Scholarships";
import Organizations from './pages/Organizations';
import Cities from './pages/Cities';
import Home from './pages/Home';
import NavBar from './components/NavBar';

import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()

test('renders landing page', () => {
    render(<App />);
});

test('navbar renders', () => {
    render(<App />);
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
});

test('navbar has links', () => {
    render(<NavBar />);
    const homeLink = screen.getAllByText("Brighter Beginnings");
    const aboutUsLink = screen.getAllByText("About Us");
    const citiesLink = screen.getAllByText("Cities");
    const scholarshipsLink = screen.getAllByText("Scholarships");
    const organizationsLink = screen.getAllByText("Organizations");
    expect(homeLink.length).toBeGreaterThan(0);
    expect(aboutUsLink.length).toBeGreaterThan(0);
    expect(citiesLink.length).toBeGreaterThan(0);
    expect(scholarshipsLink.length).toBeGreaterThan(0);
    expect(organizationsLink.length).toBeGreaterThan(0);
});

test('home page renders', () => {
    render(<Home />);
});

test('home page has correct buttons', () => {
    render(<Home />);
    expect(screen.getByText("Organizations")).toBeInTheDocument();
    expect(screen.getByText("Scholarships")).toBeInTheDocument();
    expect(screen.getByText("Cities")).toBeInTheDocument();
});

test('oragnizations page renders', () => {
    render(<Organizations />);
});

test('cities page renders', () => {
    render(<Cities />);
});

test('cities page displays correct title', () => {
    render(<Cities />);
    expect(screen.getByText("Cities")).toBeInTheDocument();
});

test('scholarships page displays correct title', () => {
    render(<Scholarships />);
    expect(screen.getByText("Scholarships")).toBeInTheDocument();
});

test('organizations page displays correct title', () => {
    render(<Organizations />);
    expect(screen.getByText("Organizations")).toBeInTheDocument();
});

// test('abuot page renders', () => {
//     render(<About />);
// });

// test('about page renders and all names are there', () => {
//     const {getByText} = render(<About />);
//     const Josh = getByText(/Josh Yu/i);
//     expect(Josh).toBeInTheDocument();
// });
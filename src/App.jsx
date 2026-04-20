import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DesignPortfolio from "./components/DesignPortfolio";

// Inner layout so we can read location
function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <Navbar />}
      <Routes>
        <Route path="/"        element={<Hero />} />
        <Route path="/about"   element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/design"  element={<DesignPortfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
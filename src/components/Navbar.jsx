import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

const Navbar = ({ onSearch }) => {
  const { dark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">🌀 Infinite Scroll</span>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      <div className={`navbar-right ${menuOpen ? "show" : ""}`}>
        <input
          className="navbar-search"
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';

const Navbar = ({ theme, setTheme }) => {
  const linkClass =
    theme === "light"
      ? "text-gray-800 hover:text-blue-600"
      : "text-white hover:text-blue-300";

  return (
    <nav className="bg-black-600 p-4 flex justify-between items-center">
  
      <ul className="flex space-x-4">
        <li><a href="/" className="text-white">Home</a></li>
        <li><a href="/about" className="text-white">About</a></li>
        <li><a href="/projects" className="text-white">Projects</a></li>
        <li><a href="/contact" className="text-white">Contact</a></li>
      </ul>

      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="ml-4 px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-500 transition"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;

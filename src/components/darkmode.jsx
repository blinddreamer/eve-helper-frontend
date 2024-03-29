import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const DarkModeToggle = () => {
  // Retrieve dark mode preference from localStorage on initial render
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false; // Change default mode to false (light mode)
  });

  useEffect(() => {
    // Update dark mode preference in localStorage when it changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Update the data-bs-theme attribute
    document.documentElement.setAttribute(
      "data-bs-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <Button variant="secondary" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
};

export default DarkModeToggle;

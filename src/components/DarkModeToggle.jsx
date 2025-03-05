import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { PiSunDimLight, PiMoon } from "react-icons/pi";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : true;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.setAttribute(
      "data-bs-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Button
      variant="secondary"
      onClick={toggleDarkMode}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3rem", // Adjust width
        height: "3rem", // Adjust height
        padding: "0", // Remove extra padding
        borderRadius: "50%", // Optional: Make it a circular button
      }}
    >
      {darkMode ? <PiSunDimLight size={24} /> : <PiMoon size={24} />}
    </Button>
  );
}

export default DarkModeToggle;

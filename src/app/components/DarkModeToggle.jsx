"use client";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { PiSunDimLight, PiMoon } from "react-icons/pi";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(null); // Prevent hydration mismatch

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    setDarkMode(storedDarkMode ?? false); // Load theme on mount
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      document.documentElement.setAttribute(
        "data-bs-theme",
        darkMode ? "dark" : "light"
      );
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  if (darkMode === null) return null; // Prevent flicker during hydration

  return (
    <Button
      variant="secondary"
      onClick={() => setDarkMode((prev) => !prev)}
      className="d-flex align-items-center justify-content-center rounded-circle"
      style={{ width: "3rem", height: "3rem", padding: 0 }}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <PiSunDimLight size={24} /> : <PiMoon size={24} />}
    </Button>
  );
}

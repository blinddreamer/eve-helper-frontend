// components/ResponsiveAlert.js
"use client"
import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function ResponsiveAlert({ breakpointWidth, message }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowAlert(window.innerWidth < breakpointWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpointWidth]);

  return showAlert ? <Alert variant="danger">{message}</Alert> : null;
}

export default ResponsiveAlert; // Ensure this export is present
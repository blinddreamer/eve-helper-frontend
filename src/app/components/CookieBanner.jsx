"use client";
import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-gray-800 text-white p-4">
      <div className="flex-grow mb-4">
        <p id="cookie" className="text-sm text-center">
          This site uses cookies to enhance your experience, analyze site
          traffic, and offer personalized content. By continuing, you agree to
          our use of cookies.
          <br /> You can learn more about how we use cookies and manage your
          preferences in our{" "}
          <a href="/cookie-policy" className="text-blue-300">
            Cookie Policy
          </a>
          .
        </p>
      </div>
      <div className="d-flex gap-3">
        <button
          onClick={acceptCookies}
          className="btn btn-secondary px-4 py-2 rounded text-white"
        >
          Accept All Cookies
        </button>
        <button
          onClick={closeBanner}
          className="btn btn-secondary px-4 py-2 rounded text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}

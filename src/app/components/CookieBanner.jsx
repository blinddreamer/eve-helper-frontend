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

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
      <p className="text-sm">
        This site uses cookies to enhance your experience. By continuing, you agree to our use of cookies.
      </p>
      <button onClick={acceptCookies} className="ml-4 bg-blue-500 px-3 py-1 rounded text-white">
        Accept
      </button>
    </div>
  );
}

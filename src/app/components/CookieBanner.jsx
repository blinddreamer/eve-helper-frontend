"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";

const CONSENT_KEY = "cookieConsent"; // "true" = accepted, "false" = declined

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function saveConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // storage blocked: the choice just won't be remembered
  }
}

// Statcounter only runs once the visitor has accepted cookies
function Analytics() {
  return (
    <>
      <Script id="statcounter-config" strategy="afterInteractive">
        {`var sc_project = 13161325; var sc_invisible = 1; var sc_security = "9ec34468";`}
      </Script>
      <Script src="https://www.statcounter.com/counter/counter.js" strategy="afterInteractive" />
    </>
  );
}

export default function CookieBanner() {
  const [consent, setConsent] = useState(undefined); // undefined until read on the client

  useEffect(() => {
    setConsent(readConsent());
  }, []);

  const choose = (value) => {
    saveConsent(value);
    setConsent(value);
  };

  if (consent === "true") return <Analytics />;
  if (consent === undefined || consent === "false") return null;

  return (
    <div className="d-flex flex-column align-items-center justify-content-center bg-gray-800 text-white p-4">
      <div className="flex-grow mb-4">
        <p id="cookie" className="text-sm text-center">
          This site uses cookies to enhance your experience, analyze site
          traffic, and offer personalized content. Analytics only run if you accept.
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
          onClick={() => choose("true")}
          className="btn btn-secondary px-4 py-2 rounded text-white"
        >
          Accept All Cookies
        </button>
        <button
          onClick={() => choose("false")}
          className="btn btn-secondary px-4 py-2 rounded text-white"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

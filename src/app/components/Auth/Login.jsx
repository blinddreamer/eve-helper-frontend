"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import to handle cookies

export default function Login() {
  const [user, setUser] = useState(null);
  const backend = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("character");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Only call extendSession if the user has a session cookie
    const sessionUUID = Cookies.get("sessionUUID");
    if (sessionUUID) {
      extendSession();
    }
  }, []);

  // Function to extend the session
  const extendSession = async () => {
    try {
      const response = await fetch(backend+"auth/extend-session", {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });

      if (!response.ok) {
        console.warn("Session extension failed:", await response.text());
      }
    } catch (error) {
      console.error("Error extending session:", error);
    }
  };

  // Handle the login by opening the OAuth2 popup
  const handleLogin = () => {
    const width = 600;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
      process.env.NEXT_PUBLIC_LOGIN_API, // OAuth2 URL (set in .env)
      "Eve Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const checkPopup = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkPopup);
        const storedUser = localStorage.getItem("character");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          extendSession(); // Extend session after login
        }
      }
    }, 1000);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch(backend+"auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setUser(null);
    localStorage.removeItem("character");
    Cookies.remove("sessionUUID"); // Remove session cookie
  };

  return (
    <div>
      {user ? (
        <div>
          <img src={user.portrait} alt="Character Portrait" />
          <h2>{user.name}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login with EVE
        </button>
      )}
    </div>
  );
}

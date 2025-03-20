"use client"
import React, { useState, useEffect } from 'react';

export default function Login() {
  const [user, setUser] = useState(null); // For storing character info
  

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const storedUser = localStorage.getItem("character");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Update user state with stored data
    }
  }, []);

  // Effect to handle postMessage event from the backend
  useEffect(() => {
    const handleAuthMessage = (event) => {
      console.log('Received message:', event); // Log the entire event to debug

      // Ensure the message is coming from the correct origin (backend is on localhost:8080)
      if (event.origin !== "http://localhost:8080") return;

      // Check if the message has the expected character data
      if (event.data && event.data.character) {
        // Store the character in sessionStorage
        localStorage.setItem("character", JSON.stringify(event.data.character));
        
        // Set user state with the character data
        setUser(event.data.character);
      } else {
        console.error("No character data found in the message");
      }
    };

    // Adding the event listener to listen for the postMessage
    window.addEventListener("message", handleAuthMessage);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("message", handleAuthMessage);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Handle the login by opening the OAuth2 popup
  const handleLogin = () => {
    const width = 600;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
      process.env.NEXT_PUBLIC_LOGIN_API, // OAuth2 URL (should be set in .env)
      "Eve Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Polling the popup to check when it is closed
    const checkPopup = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkPopup);

        // After the popup is closed, check if sessionStorage has the character data
        const storedUser = localStorage.getItem('character');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Update user state with stored data
        }
      }
    }, 1000);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('character'); // Clear sessionStorage
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

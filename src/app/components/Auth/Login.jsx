"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {api} from "../../utils/axios"

export default function Login(props) {
  // const [user, setUser] = useState(null);
  const backend = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!props.user) {
      getUserInfo(); // Only call if user is null and session exists
    }
  }, [props.user]);

  const getUserInfo = async () => {
    try {
      const response = await api.get(`${backend}auth/me`);
     
      
      if (response.status === 200) {
        const data = response.data; // Correctly parse response
        props.setUser(data);
        extendSession(); // Extend session after confirming user is valid
      }
     

    
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const extendSession = async () => {
    try {
      const response = await fetch(`${backend}auth/extend-session`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.warn("Session extension failed:", await response.text());
      }
    } catch (error) {
      console.error("Error extending session:", error);
    }
  };

  const handleLogin = () => {
    const width = 600;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
      process.env.NEXT_PUBLIC_LOGIN_API,
      "Eve Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const checkPopup = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkPopup);
        getUserInfo();
      }
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${backend}auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    props.setUser(null);
    Cookies.remove("sessionUUID");
  };

  return (
    <div>
      {props.user ? (
        <div>
          <img src={props.user.avatar} alt="Character Portrait" />
          <h2>{props.user.name}</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button
          className="d-flex align-items-center justify-content-center btn btn-secondary"
          onClick={handleLogin}
        >
          Login with EVE
        </button>
      )}
    </div>
  );
}

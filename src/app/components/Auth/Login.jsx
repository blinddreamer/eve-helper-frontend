"use client";
import React, { useEffect, useRef } from "react";
import { api } from "../../utils/axios";

export default function Login(props) {
  const popupPollRef = useRef(null);

  useEffect(() => {
    if (!props.user) {
      getUserInfo();
    }
  }, [props.user]);

  useEffect(() => {
    return () => clearInterval(popupPollRef.current);
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await api.get("auth/me");
      // Backend responds with { character: { charId, name, avatar } }
      props.setUser(response.data.character);
      extendSession();
    } catch (error) {
      // 401 just means "not logged in"
      if (error.response?.status !== 401) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const extendSession = async () => {
    try {
      await api.post("auth/extend-session");
    } catch (error) {
      console.warn("Session extension failed:", error);
    }
  };

  const handleLogin = () => {
    const width = 600;
    const height = 800;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const authWindow = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}login`,
      "Eve Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    clearInterval(popupPollRef.current);
    popupPollRef.current = setInterval(() => {
      if (!authWindow || authWindow.closed) {
        clearInterval(popupPollRef.current);
        getUserInfo();
      }
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      // Revokes the session server-side and clears the HttpOnly cookie
      await api.post("auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    props.setUser(null);
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

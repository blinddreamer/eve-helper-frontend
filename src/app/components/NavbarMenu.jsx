"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import ResponsiveAlert from "./ResponsiveAlert";
import DarkModeToggle from "./DarkModeToggle";
import Login from "./Auth/Login";

function NavbarMenu() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
        <Container>
          <NavbarBrand className="brand">
            <Link href="/" className="brand">
              {" "}
              eve-helper
            </Link>
          </NavbarBrand>

          <NavbarToggle aria-controls="basic-navbar-nav" />

          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" className="nav-item">
                Home
              </Link>
              <Link href="/calculator" className="nav-item">
                Calculator
              </Link>
              <Link href="/appraisal" className="nav-item">
                Appraisal
              </Link>
              <Link href="/picalculator" className="nav-item">
                Picalculator
              </Link>
              {user && (
                <Link href="/dashboard" className="nav-item">
                  Dashboard
                </Link>
              )}
            </Nav>

            <Nav className="auth-info">
              <Login user={user} setUser={setUser} />
            </Nav>

            <Nav className="ms-auto align-items-center">
              <DarkModeToggle />
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>

      <div id="alert-container-box">
        <div className="alert-container">
          <ResponsiveAlert
            breakpointWidth={1280}
            message="Optimizing for desktop first, screen resolution too low!"
          />
        </div>
      </div>
    </>
  );
}

export default NavbarMenu;

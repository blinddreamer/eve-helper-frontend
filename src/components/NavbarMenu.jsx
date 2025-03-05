import React from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ResponsiveAlert from "./ResponsiveAlert";
import Video from "./Video";

function NavbarMenu() {
  return (
    <>
      <Video />
      <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
        <Container>
          {/* Brand Name - Stays on the Left */}
          <Navbar.Brand as={Link} to="/" className="brand">
            eve-helper
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar Items */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* 🟢 Menu Links Stick to the Left */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-item">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Calculator" className="nav-item">
                Calculator
              </Nav.Link>
              <Nav.Link as={Link} to="/Appraisal" className="nav-item">
                Appraisal
              </Nav.Link>
            </Nav>

            {/* 🔵 Dark Mode Toggle Stays on the Right */}
            <Nav className="ms-auto align-items-center">
              <DarkModeToggle />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacing */}
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

// src/components/Navbar.tsx

import React, { useContext } from "react";
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  // Check if user data is present in local storage
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // handle the case where authContext is null
    console.error("AuthContext is not available");
    return null; // or handle this case appropriately
  }

  const { isAuthenticated } = authContext;

  return (
    <BootstrapNavbar bg="light" expand="lg" sticky="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Bloggle
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/posts">
              Posts
            </Nav.Link>
            {/* Conditionally render these links based on authentication status */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <LogoutButton></LogoutButton>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;

// src/components/LogoutButton.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem("user");
    window.location.reload();
    navigate("/posts");
  };

  return (
    <Button onClick={handleLogout} variant="btn btn-danger btn-sm">
      Logout
    </Button>
  );
};

export default LogoutButton;

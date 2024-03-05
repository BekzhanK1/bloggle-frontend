// src/components/LogoutButton.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        navigate("/posts");
        window.location.reload();
      } catch (error) {
        console.error("Error logging out", error);
      }
    }
  };

  return (
    <Button onClick={handleLogout} variant="btn btn-danger btn-sm">
      Logout
    </Button>
  );
};

export default LogoutButton;

// src/pages/Logout.tsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout on component mount
    localStorage.removeItem("user");
    // Update global state if necessary
    // authContext.setUser(null);

    navigate("/login");
  }, [navigate]);

  // Optionally, render a message or a spinner while redirecting
  return <div>Logging out...</div>;
};

export default Logout;

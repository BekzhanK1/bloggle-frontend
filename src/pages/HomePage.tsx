// src/pages/HomePage.tsx

import React from "react";

const HomePage: React.FC = () => {
  let user = JSON.parse(localStorage.getItem("user") || "user");
  console.log(user.user.username);
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Hello {user.user.username}</h2>
    </div>
  );
};

export default HomePage;

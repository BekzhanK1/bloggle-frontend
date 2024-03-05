import React from "react";

const HomePage: React.FC = () => {
  let username = "Guest"; // Default username

  // Try to retrieve and parse the user data from localStorage
  const userJson = localStorage.getItem("user");
  if (userJson) {
    const user = JSON.parse(userJson);
    username = user.user.username;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Hello {username}</h2>
    </div>
  );
};

export default HomePage;

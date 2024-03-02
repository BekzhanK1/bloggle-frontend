// src/pages/CreatePostPage.tsx

import React, { useState, useContext } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostService from "../services/PostService";
import AuthContext from "../contexts/AuthContext";

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    // handle the case where authContext is null
    console.error("AuthContext is not available");
    return null; // or handle this case appropriately
  }

  const { isAuthenticated } = authContext;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Assuming the author's ID should be obtained from the user's session or context
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await PostService.createPost({ title, body, author: user.userId }); // Use the ID from the logged-in user
      navigate("/posts");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "An error occurred while creating the post."
      );
    }
  };

  return (
    <Container>
      {!isAuthenticated && (
        <>
          <h2>You have to login to create new posts</h2>
        </>
      )}
      {isAuthenticated && (
        <>
          <h2>Create a New Post</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postBody">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Post content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default CreatePostPage;

// src/pages/EditPostPage.tsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Button, Form, Container } from "react-bootstrap";
import PostService from "../services/PostService";

// Define the types for the post's data
interface Post {
  _id: string;
  title: string;
  body: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

const EditPostPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch the post data for the given ID
  useEffect(() => {
    if (id) {
      PostService.getPostById(id)
        .then((data) => {
          setPost(data);
          setTitle(data.title);
          setBody(data.body);
        })
        .catch((err) => {
          console.error("Error fetching post:", err);
          setError("Error fetching post");
        });
    }
  }, [id]);

  // Handle form submission for updating the post
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!post) {
      setError("No post to update");
      return;
    }

    try {
      // Call the API to update the post
      await PostService.updatePost(post._id, { title, body });
      navigate(`/posts/${post._id}`); // Navigate to the updated post's detail view
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Error updating post");
    }
  };

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // If the post hasn't been fetched yet, display a loading message
  if (!post) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h2>Edit Post</h2>
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
            placeholder="Enter post content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Post
        </Button>
      </Form>
    </Container>
  );
};

export default EditPostPage;

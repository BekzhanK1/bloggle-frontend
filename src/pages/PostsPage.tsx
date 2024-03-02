// src/pages/PostsPage.tsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PostService from "../services/PostService";

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

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await PostService.getAllPosts();
        setPosts(data.data); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container>
      <h1>Posts</h1>
      <Row>
        <Col>
          <Button onClick={handleCreatePost} className="mb-3">
            Create New Post
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post._id}>
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body.substring(0, 100)}...</Card.Text>
                <Link to={`/posts/${post._id}`}>
                  <Button variant="primary">Read More</Button>
                </Link>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  Posted by {post.author.username} on{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostsPage;

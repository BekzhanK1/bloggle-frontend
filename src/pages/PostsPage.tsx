// src/pages/PostsPage.tsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
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
  likeCount: number;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/create-post");
  };

  const fetchPosts = async () => {
    try {
      const { data, totalPages } = await PostService.getAllPosts(currentPage);
      setPosts(data); // Set the posts in state
      setTotalPages(totalPages); // Update total pages
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const handleLike = async (postId: string) => {
    try {
      await PostService.likePost(postId);
      // Optionally refresh the post list to show the new like count
      // This could be optimized to only update the like count for the liked post
      fetchPosts();
    } catch (error) {
      await PostService.unlikePost(postId);
      console.error("Error liking the post:", error);
      fetchPosts();
    }
  };

  // Update the fetchPosts function to be accessible outside useEffect

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return <Pagination>{items}</Pagination>;
  };

  return (
    <Container>
      <h1>Posts</h1>
      <Row>
        <Col>
          <Button onClick={handleCreatePost} className="btn-success mb-3">
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
                  <Button>Read Post</Button>
                </Link>
                <Link to={``}>
                  <Button
                    variant="outline-success"
                    className="mx-2"
                    onClick={() => handleLike(post._id)}
                  >
                    👍 {post.likeCount}
                  </Button>
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
      {renderPagination()} {/* Call the pagination render function */}
    </Container>
  );
};

export default PostsPage;

// src/pages/PostsPage.tsx

import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PostService from "../services/PostService";
import AuthContext from "../contexts/AuthContext";

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
  likes: string[];
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // handle the case where authContext is null
    console.error("AuthContext is not available");
    return null; // or handle this case appropriately
  }

  const { isAuthenticated } = useContext(AuthContext) ?? {};
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem("userId") || '"0"');
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
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleUnlike = async (postId: string) => {
    try {
      await PostService.unlikePost(postId);
      // Optionally refresh the post list to show the new like count
      // This could be optimized to only update the like count for the liked post
      fetchPosts();
    } catch (error: any) {
      console.log(error.message);
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
          {!isAuthenticated && (
            <Link to={"/login"}>
              <Button variant="primary" className="btn-success mb-3">
                New Post
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <Button onClick={handleCreatePost} className="btn-success mb-3">
              New post
            </Button>
          )}
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
                {isAuthenticated && (
                  <>
                    <Link to={``}>
                      <Button
                        variant={
                          post.likes.includes(userId) ? "warning" : "secondary"
                        }
                        className="mx-2"
                        onClick={
                          post.likes.includes(userId)
                            ? () => handleUnlike(post._id)
                            : () => handleLike(post._id)
                        }
                      >
                        ❤️ {post.likeCount}
                      </Button>
                    </Link>
                    <Link to={`/posts/${post._id}`}>
                      <Button variant="success">Comments</Button>
                    </Link>
                  </>
                )}
                {!isAuthenticated && (
                  <Link to={"/login"}>
                    <Button variant="outline-success" className="mx-2">
                      ❤️ {post.likeCount}
                    </Button>
                  </Link>
                )}
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
      {renderPagination()}
    </Container>
  );
};

export default PostsPage;

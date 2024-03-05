// src/pages/PostDetailPage.tsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
  // Extend with more fields as necessary
}

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const userString = localStorage.getItem("user");
  const userObj = JSON.parse(userString!);

  if (!authContext) {
    // handle the case where authContext is null
    console.error("AuthContext is not available");
    return null; // or handle this case appropriately
  }

  const { isAuthenticated } = authContext;

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const fetchedPost = await PostService.getPostById(id);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Error fetching post details:", error);
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed && post?._id) {
      try {
        await PostService.deletePost(post._id);
        navigate("/posts"); // Redirect to the posts list after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (!post) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Posted by {post.author.username} on{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
              {/* Assuming edit and delete options are only available to the post author or an admin */}

              {isAuthenticated &&
                post.author.username == userObj.user.username && (
                  <div className="post-controls">
                    <Link to={`/edit-post/${post._id}`}>
                      <Button variant="outline-primary" className="me-2">
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline-danger" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default PostDetailPage;

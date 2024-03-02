// src/services/PostService.ts

import axios from "axios";

const API_URL = "http://localhost:3000/api/posts"; // Adjust based on your backend API endpoint

class PostService {
  // Fetch all posts
  async getAllPosts(page = 1, limit = 9) {
    const response = await axios.get(
      `http://localhost:3000/api/posts?page=${page}&limit=${limit}`
    );
    return response.data; // Assuming the backend responds with { data: posts, page, limit, totalPages }
  }

  // Fetch a single post by ID
  async getPostById(postId: string) {
    const response = await axios.get(`${API_URL}/${postId}`);
    return response.data;
  }

  // Create a new post
  async createPost(postData: { title: string; body: string; author: string }) {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString!);

    // Access the token property of the object
    const token = userObj.token;
    const response = await axios.post(API_URL, postData, {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming the token is stored in local storage
      },
    });
    return response.data;
  }

  // Update an existing post
  async updatePost(postId: string, postData: { title: string; body: string }) {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString!);

    // Access the token property of the object
    const token = userObj.token;
    const response = await axios.put(`${API_URL}/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  // Delete a post
  async deletePost(postId: string) {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString!);

    // Access the token property of the object
    const token = userObj.token;
    const response = await axios.delete(`${API_URL}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async likePost(postId: string) {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString!);

    // Access the token property of the object
    const token = userObj.token;
    const response = await axios.put(
      `${API_URL}/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you store the token in localStorage
        },
      }
    );
    return response.data;
  }

  async unlikePost(postId: string) {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString!);

    // Access the token property of the object
    const token = userObj.token;
    const response = await axios.put(
      `${API_URL}/${postId}/unlike`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming you store the token in localStorage
        },
      }
    );
    return response.data;
  }
}

export default new PostService();

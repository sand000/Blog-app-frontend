import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  const token = localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://blog-app-backend-vjwy.onrender.com/api/post/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://blog-app-backend-vjwy.onrender.com/api/post/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err.response?.data || err.message);
    }
  };

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setEditForm({ title: post.title, content: post.content });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://blog-app-backend-vjwy.onrender.com/api/post/posts/${editPostId}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditPostId(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to update post:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id} style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
              {editPostId === post._id ? (
                <>
                  <input
                    name='title'
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder='Title'
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <textarea
                    name='content'
                    value={editForm.content}
                    onChange={handleEditChange}
                    rows={4}
                    placeholder='Content'
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditPostId(null)} style={{ marginLeft: "10px" }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <button onClick={() => handleEditClick(post)}>Edit</button>
                  <button onClick={() => handleDelete(post._id)} style={{ marginLeft: "10px", color: "red" }}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

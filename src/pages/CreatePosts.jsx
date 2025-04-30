import React, { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8080/api/post/createPost", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post created!");
      setFormData({ title: "", content: "" });
    } catch (err) {
      console.error("Create post error:", err.response?.data || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "auto",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <h2>Create New Post</h2>
      <input name='title' value={formData.title} onChange={handleChange} placeholder='Title' required style={{ padding: "10px", fontSize: "16px" }} />
      <textarea
        name='content'
        value={formData.content}
        onChange={handleChange}
        placeholder='Content'
        required
        rows={5}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button
        type='submit'
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Create Post
      </button>
    </form>
  );
}

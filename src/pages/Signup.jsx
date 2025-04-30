import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      if (res) {
        navigate("/login");
      }
      console.log("Signup success:", res);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      if (errorMsg.toLowerCase().includes("exists")) {
        alert("User already exists. Please login.");
      } else {
        alert(`Signup failed: ${errorMsg}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        margin: "auto",
        gap: "1rem",
      }}
    >
      <input
        name='name'
        value={formData.name}
        onChange={handleChange}
        placeholder='Name'
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <input
        name='email'
        value={formData.email}
        onChange={handleChange}
        placeholder='Email'
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <input
        name='password'
        type='password'
        value={formData.password}
        onChange={handleChange}
        placeholder='Password'
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type='submit'
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Sign Up
      </button>
    </form>
  );
}

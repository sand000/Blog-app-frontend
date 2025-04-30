import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      console.log("Login success:", res);
      localStorage.setItem("token", res.token); 

      if (res.token) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
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
        Log In
      </button>
    </form>
  );
}

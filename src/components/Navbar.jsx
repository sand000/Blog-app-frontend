import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    position: "fixed", 
    width: "95%",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontWeight: "bold",
    fontSize: "24px",
    color: "#61dafb",
    textDecoration: "none",
  };

  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#fff",
    fontSize: "16px",
    padding: "6px 10px",
    transition: "color 0.3s",
  };

  const linkHoverStyle = {
    ...linkStyle,
    ":hover": {
      color: "#61dafb",
    },
  };

  const logoutButtonStyle = {
    background: "transparent",
    border: "1px solid #fff",
    padding: "6px 12px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "4px",
    transition: "all 0.3s",
  };

  return (
    <nav style={navbarStyle}>
      <Link to='/' style={logoStyle}>
        MyApp
      </Link>
      <div style={navLinksStyle}>
        <Link to='/' style={linkStyle}>
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link to='/createPosts' style={linkStyle}>
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              style={logoutButtonStyle}
              onMouseOver={(e) => ((e.target.style.backgroundColor = "#fff"), (e.target.style.color = "#333"))}
              onMouseOut={(e) => ((e.target.style.backgroundColor = "transparent"), (e.target.style.color = "#fff"))}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' style={linkStyle}>
              Login
            </Link>
            <Link to='/register' style={linkStyle}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

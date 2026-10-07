import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";   // ✅ import added
import "../styles/components.css";
import "../styles/sidebar.css";

const Layout = ({ children, onLogout }) => {
  const { currentUser } = useAuth();

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Travel App</h2>
         {currentUser && (
            <p style={{ marginTop: "10px",fontSize: "26px", fontWeight: "bold", color: "#01000f"  }}>
              Welcome, {currentUser.name || currentUser.email}
            </p>
          )}
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/trips">Trips</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/payments">Payments</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header1">
          <h1>Travel Management Dashboard</h1>
         
        </header>

        <section className="page-content">{children}</section>
      </div>
    </div>
  );
};

export default Layout;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaLock, 
  FaChartLine, 
  FaLightbulb, 
  FaArrowRight, 
  FaCreditCard, 
  FaRegCalendarAlt, 
  FaShieldAlt, 
  FaMobileAlt, 
  FaStar 
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login on logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/"><FaChartLine className="me-2 " size={24} />
                    <span className="fw-bold">FinanceMaster</span></Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link> {/* ✅ Added Home option */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={isLoggedIn ? "/dashboard" : "/login"}>Dashboard</Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-light rounded-pill px-4" onClick={handleLogout}>Logout</button> {/* ✅ Styled same as Login */}
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-light rounded-pill px-4" to="/login">Login</Link> {/* ✅ Button styling */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
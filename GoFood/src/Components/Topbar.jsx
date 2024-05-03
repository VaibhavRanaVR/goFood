import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles/Topbar.css";
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setInterval(() => {
      const userRole = sessionStorage.getItem("userRole");
      setIsAdmin(userRole === "admin");
    }, [2000]);
  }, []);

  return (
    <nav className="Topbar-Container">
      <div className="Topbar-Left">
        <Link to="/home" className="Project-Title">
          GO<span className="Project-Title-Red">FOOD</span>
        </Link>
      </div>
      {!isAdmin ? (
        <div className="Topbar-Right">
          <div className="MenuIcon" onClick={handleMenuToggle}>
            <MenuIcon />
          </div>
          <ul className={`MenuLinks ${isMenuOpen ? "open" : ""}`}>
            <li>
              <Link to="/">Items</Link>
            </li>
            <li>
              <Link to="/order/history">My Orders</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="Topbar-Right">
          <div className="MenuIcon" onClick={handleMenuToggle}>
            <MenuIcon />
          </div>
          <ul className={`MenuLinks ${isMenuOpen ? "open" : ""}`}>
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
            <li>
              <Link to="/admin/category">Categories</Link>
            </li>
            <li>
              <Link to="/admin/order">Order</Link>
            </li>
            <li>
              <Link to="/admin/profile">Profile</Link>
            </li>
            <li>
              <Link to="/admin/create/restaurant">Restaurant create</Link>
            </li>
            <li>
              <Link to="/sign-up">Login</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Topbar;

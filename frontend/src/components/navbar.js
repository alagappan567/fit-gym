import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import fitlogoIcon from "../assets/fitlogo.png";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaHome, FaHistory } from "react-icons/fa";
import { RiTeamFill, RiAdminLine } from "react-icons/ri";
import Modal from "./Modal";
import "./navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="navbar">
      <img src={fitlogoIcon} alt="logo" className="logo"></img>
      <nav className="nav-btns">
        {user && (
          <div className="nav-btns">
            <span className="username">{user.username}</span>
            <Link to="/">
              <FaHome id="home-svg" />
            </Link>
            <Link to="/history">
              <FaHistory id="history-svg" />
            </Link>
            <Link to="/about">
              <RiTeamFill id="about-svg" />
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin">
                <RiAdminLine id="admin-svg" />
              </Link>
            )}
            <Link to="/log-meal">
              <button className="nav-btn">Log Meal</button>
            </Link>
            <Link to="/calories-left">
              <button className="nav-btn">Calories Left</button>
            </Link>
            <RiLogoutBoxRFill onClick={handleLogoutClick} id="logout-svg" />
          </div>
        )}
      </nav>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default Navbar;
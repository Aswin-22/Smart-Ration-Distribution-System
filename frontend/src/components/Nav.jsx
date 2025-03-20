import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Nav() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-item logo">
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/user/login" className="nav-item">
                Login
              </Link>
            </li>
            <li>
              <Link to="/user/signup" className="nav-item">
                Signup
              </Link>
            </li>
          </>
        ) : (
          <>
            {user.role === "ADMIN" && (
              <li>
                <Link to="/dashboard" className="nav-item">
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated && user.role !== "ADMIN" && (
              <li>
                <Link to="/rfid" className="nav-item">
                  Manage RFID
                </Link>
              </li>
            )}
            <li className="user-menu">
              <div
                className="user-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.role[0].toUpperCase()}
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <p className="dropdown-role">Role: {user.role}</p>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;

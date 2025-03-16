import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <nav>
        <Link to="/" className="nav-item">
          <h3>Logo</h3>
        </Link>
        <ul>
          <li>
            <Link to="/user/login" className="nav-item">
              Login
            </Link>
          </li>
          <li>
            <Link to="/user/signup" className="nav-item">
              signup
            </Link>
          </li>
          <li>
            <Link to="/rfid/addNew" className="nav-item">
              Add Rfid
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;

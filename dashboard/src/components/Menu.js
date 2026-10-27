
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState(false);

  const [user, setUser] = useState(null);
  const [profileError, setProfileError] = useState("");

  // Logged-in user ki details backend se fetch karo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://zerodha-clone-backend-e7mr.onrender.com/auth/me",
          {
            withCredentials: true,
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error(
          "Profile error:",
          error.response?.data || error.message
        );

        setProfileError("Profile load nahi hua");
      }
    };

    fetchUser();
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen((previous) => !previous);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://zerodha-clone-backend-e7mr.onrender.com/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.data || error.message
      );
    } finally {
      window.location.href = "http://localhost:3000";
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const firstName = user?.name
    ? user.name.trim().split(" ")[0]
    : "User";

  const avatarText = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="menu-container">
      <img
        src="logo.png"
        style={{ width: "50px" }}
      />

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* Logged-in User Profile */}
        <div
          className="profile"
          onClick={handleProfileClick}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <div className="avatar">{avatarText}</div>

          <p className="username">
            {user ? firstName : profileError ? "User" : "Loading..."}
          </p>

          {isProfileDropdownOpen && (
            <div
              className="profile-dropdown"
              onClick={(event) => event.stopPropagation()}
        
style={{
  position: "absolute",
  right: "0",
  top: "100%",
  bottom: "auto",
  marginTop: "10px",
  width: "250px",
  backgroundColor: "#ffffff",
  color: "#424242",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "16px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
  zIndex: 9999,
}}

            >
              <strong>{user?.name || "User"}</strong>

              <p
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "5px",
                  overflowWrap: "anywhere",
                }}
              >
                {user?.email || profileError || "Loading profile..."}
              </p>

              <hr />

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  width: "100%",
                  border: "none",
                  background: "#387ed1",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;

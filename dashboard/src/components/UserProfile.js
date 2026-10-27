import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://zerodha-clone-backend-e7mr.onrender.com/auth/me", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.error(
          "Profile error:",
          err.response?.data || err.message
        );

        setError("Profile load nahi hua");
      });
  }, []);

  if (error) {
    return <span>{error}</span>;
  }

  if (!user) {
    return <span>Loading profile...</span>;
  }

  return (
    <div className="user-profile">
      <button
        type="button"
        className="btn btn-light dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        👤 {user.name}
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li className="dropdown-item">
          <strong>{user.name}</strong>
        </li>

        <li className="dropdown-item">
          {user.email}
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <button
            className="dropdown-item"
            onClick={() => {
              window.location.href = "http://localhost:3000";
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserProfile;
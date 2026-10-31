
import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Deployed Backend URL
  const API_URL = "http://localhost:3002/auth";

  // Deployed Dashboard URL
  const DASHBOARD_URL =
    "https://zerodha-clone-dashboard-c60q.onrender.com";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isLogin && !formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!isLogin && formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isLogin ? "/login" : "/signup";

      const payload = isLogin
        ? {
            email: formData.email.trim(),
            password: formData.password,
          }
        : {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
          };

      const response = await axios.post(
        `${API_URL}${endpoint}`,
        payload,
        {
          withCredentials: true,
        }
      );

      console.log("Authentication response:", response.data);

      if (isLogin) {
        // Save user information if returned by the backend.
        if (response.data.user) {
          sessionStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
          );
        }

        setSuccess("Login successful! Opening dashboard...");

        // Redirect to the deployed Dashboard.
        setTimeout(() => {
          window.location.href = DASHBOARD_URL;
        }, 700);
      } else {
        setSuccess("Account created successfully! Please login.");

        setFormData({
          name: "",
          email: formData.email,
          password: "",
          mobile: "",
        });

        setIsLogin(true);
      }
    } catch (err) {
      console.error(
        "Authentication error:",
        err.response?.data || err.message
      );

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        (err.code === "ERR_NETWORK"
          ? "Cannot connect to the server. Please try again later."
          : "Something went wrong. Please try again.");

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mt-4 mb-5">
        <h2 style={{ color: "#424242" }}>
          Open a free demat and trading account online
        </h2>

        <p className="fs-5 text-secondary mt-3">
          Start investing brokerage free and join a community of 1.8+ crore
          investors and traders.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="row align-items-center mt-5">
        {/* Left: Image */}
        <div className="col-md-6 text-center p-4">
          <img
            src="/media/images/signup.png"
            alt="Signup"
            className="img-fluid"
            style={{
              width: "100%",
              maxWidth: "550px",
            }}
          />
        </div>

        {/* Right: Authentication form */}
        <div className="col-md-6 p-4">
          <h2 style={{ color: "#424242" }}>
            {isLogin ? "Login to Zerodha" : "Signup now"}
          </h2>

          <p className="text-secondary fs-5 mt-3">
            {isLogin
              ? "Access your account"
              : "Create your account to get started"}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name: Signup only */}
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control py-3"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                className="form-control py-3"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                className="form-control py-3"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete={isLogin ? "current-password" : "new-password"}
                minLength={8}
                required
              />

              {!isLogin && (
                <small className="text-secondary">
                  Password must contain at least 8 characters.
                </small>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="alert alert-success mt-3" role="status">
                {success}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="btn text-white fw-semibold py-3 mt-3"
              disabled={loading}
              style={{
                backgroundColor: "#387ed1",
                width: "100%",
                maxWidth: "280px",
                fontSize: "18px",
              }}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </button>
          </form>

          {/* Switch between Signup and Login */}
          <p className="mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}

            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setSuccess("");
              }}
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>

          <p className="small mt-4" style={{ color: "#666" }}>
            By proceeding, you agree to the Zerodha{" "}
            <a
              href="https://zerodha.com/terms-and-conditions/"
              target="_blank"
              rel="noreferrer"
            >
              terms
            </a>{" "}
            and{" "}
            <a
              href="https://zerodha.com/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >
              privacy policy
            </a>
            .
          </p>

          <hr />

          <p className="small mt-3">
            Looking to open an NRI account?{" "}
            <a
              href="https://zerodha.com/open-account/"
              target="_blank"
              rel="noreferrer"
            >
              Click here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
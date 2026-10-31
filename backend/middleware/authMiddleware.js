const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = null;

    // 1. Authorization header se token read karo
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Agar header mein token nahi hai, to cookie check karo
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3. Token nahi mila
    if (!token) {
      return res.status(401).json({
        message: "Access denied. Please login first.",
      });
    }

    // 4. Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
};

module.exports = authMiddleware;
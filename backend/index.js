
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const authMiddleware = require("./middleware/authMiddleware");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://zerodha-clone-frontend-msm0.onrender.com",
  "https://zerodha-clone-dashboard-c60q.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Authentication routes
app.use("/auth", authRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Zerodha backend is running");
});

// Get all holdings
app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    console.log("Holdings fetched:", allHoldings.length);
    res.status(200).json(allHoldings);
  } catch (error) {
    console.error("Holdings error:", error.message);
    res.status(500).json({
      message: "Failed to fetch holdings",
    });
  }
});

// Get all positions
app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    console.log("Positions fetched:", allPositions.length);
    res.status(200).json(allPositions);
  } catch (error) {
    console.error("Positions error:", error.message);
    res.status(500).json({
      message: "Failed to fetch positions",
    });
  }
});

// Get all orders
app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Orders error:", error.message);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// Create a new order
app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const newOrder = await OrdersModel.create({
      name,
      qty,
      price,
      mode,
    });

    res.status(201).json({
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order error:", error.message);
    res.status(500).json({
      message: "Failed to save order",
    });
  }
});

// Start server only after MongoDB connects
async function startServer() {
  try {
    if (!uri) {
      throw new Error("MONGO_URL missing from backend .env file");
    }

    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup error:", error.message);
    process.exit(1);
  }
}

startServer();

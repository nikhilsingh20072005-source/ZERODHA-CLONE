import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://zerodha-clone-backend-e7mr.onrender.com";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Login session nahi mili. Dobara login karo.");
          return;
        }

        const response = await axios.get(`${API_URL}/allOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setError("");
        } else {
          setError("Orders ka data sahi format mein nahi mila.");
        }
      } catch (err) {
        console.error("Orders fetch error:", err.response?.data || err.message);

        setError(
          err.response?.status === 401
            ? "Login session expire ho gayi. Dobara login karo."
            : "Orders load nahi ho paaye. Backend check karo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <h3 className="title">Loading orders...</h3>;
  }

  if (error) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>{error}</p>
          <Link to="/" className="btn">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>

                <td
                  style={{
                    color:
                      order.mode?.toLowerCase() === "buy"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {order.mode?.toUpperCase()}
                </td>

                <td>{order.qty}</td>

                <td>₹{Number(order.price).toLocaleString("en-IN")}</td>

                <td>Placed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
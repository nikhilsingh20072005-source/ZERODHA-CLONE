import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://zerodha-clone-backend-e7mr.onrender.com";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPositions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/allPositions`, {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          withCredentials: true,
        });

        console.log("Positions data:", response.data);

        if (isMounted) {
          if (Array.isArray(response.data)) {
            setAllPositions(response.data);
            setError("");
          } else {
            setError("Backend se positions ka data sahi format mein nahi mila.");
          }
        }
      } catch (err) {
        console.error(
          "Error fetching positions:",
          err.response?.status,
          err.response?.data || err.message
        );

        if (isMounted) {
          if (err.response?.status === 401) {
            setError("Login session nahi mili. Dobara login karo.");
          } else {
            setError("Positions load nahi hui. Backend URL check karo.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPositions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <h3 className="title">Loading positions...</h3>;
  }

  return (
    <>
      <h3 className="title">
        Positions ({allPositions.length})
      </h3>

      {error && (
        <p style={{ color: "red", padding: "10px" }}>
          {error}
        </p>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((position) => {
              const qty = Number(position.qty) || 0;
              const avg = Number(position.avg) || 0;
              const price = Number(position.price) || 0;

              const pnl = (price - avg) * qty;
              const pnlClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = position.isLoss ? "loss" : "profit";

              return (
                <tr key={position._id || position.name}>
                  <td>{position.product ?? "—"}</td>
                  <td>{position.name ?? "—"}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td className={pnlClass}>{pnl.toFixed(2)}</td>
                  <td className={pnlClass}>{position.net ?? "—"}</td>
                  <td className={dayClass}>{position.day ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!error && allPositions.length === 0 && (
          <p>No positions found in the database.</p>
        )}
      </div>
    </>
  );
};

export default Positions;
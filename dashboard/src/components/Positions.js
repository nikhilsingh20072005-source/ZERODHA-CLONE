import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://zerodha-clone-backend-e7mr.onrender.com/allPositions", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Positions data:", res.data);

        if (Array.isArray(res.data)) {
          setAllPositions(res.data);
        } else {
          console.error("Unexpected API response:", res.data);
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching positions:",
          err.response?.data || err.message
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3 className="title">Loading positions...</h3>;
  }

  return (
    <>
      <h3 className="title">
        Positions ({allPositions.length})
      </h3>

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
              const pnl =
                (Number(position.price) - Number(position.avg)) *
                Number(position.qty);

              const pnlClass = pnl >= 0 ? "profit" : "loss";
              const dayClass = position.isLoss ? "loss" : "profit";

              return (
                <tr key={position._id}>
                  <td>{position.product}</td>
                  <td>{position.name}</td>
                  <td>{position.qty}</td>
                  <td>{Number(position.avg).toFixed(2)}</td>
                  <td>{Number(position.price).toFixed(2)}</td>
                  <td className={pnlClass}>{pnl.toFixed(2)}</td>
                  <td className={pnlClass}>{position.net}</td>
                  <td className={dayClass}>{position.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!allPositions.length && (
          <p>No positions found in the database.</p>
        )}
      </div>
    </>
  );
};

export default Positions;
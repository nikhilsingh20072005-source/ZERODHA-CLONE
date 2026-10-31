import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const API_URL = "https://zerodha-clone-backend-e7mr.onrender.com";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchHoldings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/allHoldings`, {
          withCredentials: true,
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        });

        if (isMounted) {
          setAllHoldings(response.data);
          setError("");
        }
      } catch (err) {
        console.error(
          "Holdings API error:",
          err.response?.status,
          err.response?.data || err.message
        );

        if (isMounted) {
          if (err.response?.status === 401) {
            setError("Login session nahi mili. Logout karke dobara login karo.");
          } else {
            setError("Holdings load nahi hui. Backend URL aur connection check karo.");
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHoldings();

    const intervalId = setInterval(fetchHoldings, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price) || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const totalInvestment = allHoldings.reduce(
    (total, stock) =>
      total + (Number(stock.avg) || 0) * (Number(stock.qty) || 0),
    0
  );

  const currentValue = allHoldings.reduce(
    (total, stock) =>
      total + (Number(stock.price) || 0) * (Number(stock.qty) || 0),
    0
  );

  const profitLoss = currentValue - totalInvestment;

  const profitPercentage =
    totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;

  const money = (value) =>
    value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  if (loading) {
    return <p>Holdings data load ho raha hai...</p>;
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {error && (
        <p style={{ color: "red", padding: "10px" }}>
          {error}
        </p>
      )}

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const qty = Number(stock.qty) || 0;
              const price = Number(stock.price) || 0;
              const avg = Number(stock.avg) || 0;
              const curValue = price * qty;
              const profit = curValue - avg * qty;

              return (
                <tr key={stock._id || stock.name}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{money(avg)}</td>
                  <td>{money(price)}</td>
                  <td>{money(curValue)}</td>
                  <td className={profit >= 0 ? "profit" : "loss"}>
                    {money(profit)}
                  </td>
                  <td className={profit >= 0 ? "profit" : "loss"}>
                    {stock.net ?? "—"}
                  </td>
                  <td className={stock.isLoss ? "loss" : "profit"}>
                    {stock.day ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {!error && allHoldings.length === 0 && (
          <p>No holdings data found in the database.</p>
        )}
      </div>

      <div className="row">
        <div className="col">
          <h5>{money(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{money(currentValue)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={profitLoss >= 0 ? "profit" : "loss"}>
            {money(profitLoss)} ({profitPercentage.toFixed(2)}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
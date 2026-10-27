import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  useEffect(() => {
  const fetchHoldings = async () => {
    try {
      const response = await axios.get(
        "https://zerodha-clone-backend-e7mr.onrender.com/allHoldings",
        {
          withCredentials: true,
        }
      );

      console.log("Holdings data:", response.data);
      setAllHoldings(response.data);
    } catch (error) {
      console.error("Holdings status:", error.response?.status);
      console.error(
        "Holdings error:",
        error.response?.data || error.message
      );
    }
  };

  fetchHoldings();
}, []);
  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
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
              const profClass = profit >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || stock.name}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{profit.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {allHoldings.length === 0 && (
          <p>No holdings data found.</p>
        )}
      </div>

      <div className="row">
        <div className="col">
          <h5>29,875.<span>55</span></h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>31,428.<span>95</span></h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&amp;L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
import React, { useState } from "react";
import { Link } from "react-router-dom";


const categories = [
  {
    icon: "fa-user-plus",
    title: "Account Opening",
    links: [
      "Online Account Opening",
      "Offline Account Opening",
      "Company, Partnership and HUF Account",
      "NRI Account Opening",
      "Charges at Zerodha",
      "Getting Started",
    ],
  },
  {
    icon: "fa-user-circle",
    title: "Your Zerodha Account",
    links: [
      "Login and Password Issues",
      "Profile and Account Details",
      "Account Modification",
      "Closing Your Account",
      "Account Security",
    ],
  },
  {
    icon: "fa-chart-line",
    title: "Trading and Markets",
    links: [
      "Trading on Kite",
      "Orders and Executions",
      "Margins and Pledging",
      "Intraday and Delivery",
      "Market Timings",
    ],
  },
  {
    icon: "fa-wallet",
    title: "Funds",
    links: [
      "Add Funds",
      "Withdraw Funds",
      "Funds Statement",
      "Bank Account Details",
      "Payment Issues",
    ],
  },
  {
    icon: "fa-laptop",
    title: "Platforms and Tools",
    links: [
      "Kite Web",
      "Kite Mobile App",
      "Charts and Indicators",
      "Console",
      "Technical Issues",
    ],
  },
  {
    icon: "fa-file-alt",
    title: "IPO, Mutual Funds and Others",
    links: [
      "IPO Applications",
      "Mutual Funds",
      "Dividends",
      "Tax Reports",
      "Other Queries",
    ],
  },
];

function CreateTicket() {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <section className="container ticket-section py-5">
      <div className="text-center mb-5">
        <h1 className="ticket-heading">
          To create a ticket, select a relevant topic
        </h1>
        <p className="ticket-subheading">
          Select a category to view its help topics.
        </p>
      </div>

      <div className="row g-4">
        {categories.map((category, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={category.title}>
            <div
              className={`ticket-card ${
                openCategory === index ? "ticket-card-open" : ""
              }`}
              onMouseEnter={() => setOpenCategory(index)}
              onMouseLeave={() => setOpenCategory(null)}
            >
              <button
                type="button"
                className="ticket-card-heading"
                aria-expanded={openCategory === index}
                onClick={() =>
                  setOpenCategory(openCategory === index ? null : index)
                }
              >
                <span className="ticket-icon">
                  <i className={`fas ${category.icon}`} aria-hidden="true" />
                </span>

                <span className="ticket-category-title">
                  {category.title}
                </span>

                <i
                  className={`fas fa-chevron-down ticket-arrow ${
                    openCategory === index ? "ticket-arrow-open" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {openCategory === index && (
                <div className="ticket-card-links">
                  {category.links.map((link) => (
                    <Link
                      key={link}
                      to={`/support?topic=${encodeURIComponent(link)}`}
                      className="ticket-link"
                    >
                      {link}
                      <i className="fas fa-chevron-right" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CreateTicket;
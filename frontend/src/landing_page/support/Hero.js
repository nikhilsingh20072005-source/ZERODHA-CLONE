import React, { useState } from "react";

function Hero() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) {
      return;
    }

    alert(`You searched for: ${searchText}`);
  };

  return (
    <section className="container-fluid px-0" id="supportHero">
      {/* Support Header */}
      <div className="container py-5" id="supportWrapper">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h4 className="mb-0">Support Portal</h4>

          <a href="#trackTickets" className="text-white">
            Track Tickets
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-5">
        <div className="row g-4">
          {/* Left Section */}
          <div className="col-12 col-lg-6 p-3">
            <h1 className="fs-3 mb-4">
              Search for an answer or browse help topics to create a ticket
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control p-3"
                  placeholder="Eg. How do I activate F&O?"
                  aria-label="Search support topics"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button className="btn btn-primary px-4" type="submit">
                  Search
                </button>
              </div>
            </form>

            {/* Quick Links */}
            <div className="d-flex flex-wrap gap-3">
              <a href="#trackAccount">Track account opening</a>
              <a href="#segmentActivation">Track segment activation</a>
              <a href="#intradayMargins">Intraday margins</a>
              <a href="#kiteManual">Kite user manual</a>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-12 col-lg-6 p-3">
            <h2 className="fs-3 mb-4">Featured</h2>

            <ol className="ps-4">
              <li className="mb-3">
                <a href="#takeovers">
                  Current Takeovers and Delisting
                </a>
              </li>

              <li className="mb-3">
                <a href="#intradayLeverages">
                  Latest Intraday Leverages - MIS &amp; CO
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
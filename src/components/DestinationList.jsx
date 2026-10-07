import React, { useState } from "react";
import "../styles/components.css";
import "../styles/sidebar.css";

const DestinationList = ({ destinations }) => {
  const [filter, setFilter] = useState("");

  const filteredDestinations = destinations.filter((d) =>
    d.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="destination-list">
      <h2>Destinations</h2>

      {/* Search/Filter */}
      <input
        type="text"
        placeholder="Search destination..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search-bar"
      />

      {/* Destination Cards */}
      {filteredDestinations.length === 0 ? (
        <p>No destinations found.</p>
      ) : (
        <div className="destination-grid">
          {filteredDestinations.map((dest, index) => (
            <div key={index} className="destination-card">
              <h3>{dest.name}</h3>
              <p>{dest.description}</p>
              <p><strong>Country:</strong> {dest.country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationList
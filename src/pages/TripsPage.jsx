import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import { notifySuccess, notifyInfo } from "../components/Toast";
import { filterTrips, sortTrips } from "../utils/filters";
import "../styles/components.css";
import "../styles/sidebar.css";

const TripsPage = () => {
  const { trips, setTrips } = useContext(AppContext);
  const [newTrip, setNewTrip] = useState({ title: "", destination: "", date: "", price: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 5;

  // Filter + Sort
  const filteredTrips = sortTrips(
    trips.filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase())),
    sortBy
  );

  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const paginatedTrips = filteredTrips.slice((currentPage - 1) * tripsPerPage, currentPage * tripsPerPage);

  // Add new trip
  const handleAddTrip = (e) => {
    e.preventDefault();
    if (!newTrip.title || !newTrip.destination || !newTrip.date || !newTrip.price) {
      notifyInfo("All fields are required");
      return;
    }
    setTrips([...trips, { ...newTrip, id: Date.now() }]);
    setNewTrip({ title: "", destination: "", date: "", price: "" });
    notifySuccess("Trip added successfully");
  };

  // Delete trip
  const handleDeleteTrip = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setTrips(trips.filter((t) => t !== selectedTrip));
    notifyInfo("Trip deleted");
    setShowModal(false);
  };

  return (
    <div className="trips-page">
      <h1>Trip Management</h1>

      {/* Search + Sort */}
      <div className="trip-controls">
        <input
          type="text"
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price">Sort by Price</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>

      {/* Add Trip Form */}
      <form onSubmit={handleAddTrip} className="trip-form">
        <input
          type="text"
          placeholder="Title"
          value={newTrip.title}
          onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={newTrip.destination}
          onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
          required
        />
        <input
          type="date"
          value={newTrip.date}
          onChange={(e) => setNewTrip({ ...newTrip, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newTrip.price}
          onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
          required
        />
        <button type="submit">Add Trip</button>
      </form>

      {/* Trip List */}
      <div className="trip-list">
        {paginatedTrips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          paginatedTrips.map((trip) => (
            <div key={trip.id} className="trip-card">
              <h3>{trip.title}</h3>
              <p>Destination: {trip.destination}</p>
              <p>Date: {trip.date}</p>
              <p>Price: ${trip.price}</p>
              <button onClick={() => handleDeleteTrip(trip)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          message={`Delete trip ${selectedTrip.title}?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TripsPage;
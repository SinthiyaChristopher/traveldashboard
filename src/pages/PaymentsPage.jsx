import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Modal from "../components/Modal";
import { notifySuccess, notifyInfo } from "../components/Toast";
import "../styles/components.css";
import "../styles/sidebar.css";

const PaymentsPage = () => {
  const { bookings, setBookings } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter bookings by search term (safe with optional chaining)
  const filteredBookings = bookings.filter(
    (b) => b.trip?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle payment confirmation
  const handlePay = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const confirmPayment = () => {
    if (!selectedBooking) return; // ✅ guard against null

    const updatedBookings = bookings.map((b) =>
      b === selectedBooking ? { ...b, paymentStatus: "Paid" } : b
    );
    setBookings(updatedBookings);

    notifySuccess(`Payment completed for ${selectedBooking.trip?.title ?? "Unknown Trip"}`);
    setShowModal(false);
  };

  return (
    <div className="payments-page">
      <h1>Payments Management</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Payment List */}
      <div className="payment-list">
        {filteredBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          filteredBookings.map((b, i) => (
            <div key={i} className="payment-card">
              <h3>{b.trip?.title ?? "Unknown Trip"}</h3>
              <p>Customer: {b.name ?? "Unknown"}</p>
              <p>Date: {b.date ?? "N/A"}</p>
              <p>Status: {b.paymentStatus ?? "Pending"}</p>
              {b.paymentStatus !== "Paid" && (
                <button type="button" onClick={() => handlePay(b)}>
                  Mark as Paid
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedBooking && (
        <Modal
          message={`Confirm payment for ${selectedBooking.trip?.title ?? "Unknown Trip"}?`}
          onConfirm={confirmPayment}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentsPage;
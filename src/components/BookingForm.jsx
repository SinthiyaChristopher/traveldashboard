import React, { useState } from "react";

const BookingForm = ({ trip, onConfirm }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ trip, name, date, status: "Pending", paymentStatus: "Unpaid" });
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h3>Book {trip.title}</h3>
      <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Confirm Booking</button>
    </form>
  );
};

export default BookingForm;
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Pagination from "../components/Pagination";

const BookingList = ({ onCancel }) => {
  const { bookings } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);

  const bookingsPerPage = 5;
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const paginatedBookings = bookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      {paginatedBookings.map((booking) => (
        <div key={booking.id} className="booking-item">
          <strong>{booking.trip.title}</strong> — {booking.date}
          <button type="button" onClick={() => onCancel(booking)}>
            Cancel
          </button>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BookingList;
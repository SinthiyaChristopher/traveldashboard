import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import TripList from "../components/TripList";
import BookingForm from "../components/BookingForm";
import BookingList from "../components/BookingList";
import Payment from "../components/Payment";
import SearchBar from "../components/SearchBar";
import Charts from "../components/Charts";
import CalendarView from "../components/CalendarView"; // ✅ spelling fixed
import { filterTrips, sortTrips } from "../utils/filters";
import DestinationList from "../components/DestinationList";
import "../styles/components.css"; // ✅ case corrected
import "../styles/sidebar.css";

const DashboardPage = () => {
  const { trips } = useContext(AppContext);   // ✅ trips defined here

  const [bookings, setBookings] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("price");

  const destinations = [
    { name: "Paris", description: "City of lights", country: "France" },
    { name: "Tokyo", description: "Modern meets tradition", country: "Japan" },
    { name: "New York", description: "The Big Apple", country: "USA" },
  ];

  const handleBook = (trip) => setSelectedTrip(trip);

  const handleConfirmBooking = (booking) => {
    setBookings([...bookings, booking]);
    setSelectedBooking(booking);
    setSelectedTrip(null);
  };

  const handlePay = (updatedBooking) => {
    setBookings(bookings.map((b) => (b === selectedBooking ? updatedBooking : b)));
    setSelectedBooking(updatedBooking);
  };

  const filteredTrips = sortTrips(
    trips.filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase())),
    sortBy
  );

  return (
    <div className="dashboard">
      <h1>Travel Dashboard</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TripList onBook={handleBook} trips={filteredTrips} />
      {selectedTrip && <BookingForm trip={selectedTrip} onConfirm={handleConfirmBooking} />}
      <BookingList bookings={bookings} />
      <Charts bookings={bookings} />
      <CalendarView bookings={bookings} />
      {selectedBooking && <Payment booking={selectedBooking} onPay={handlePay} />}
      <DestinationList destinations={destinations} />
    </div>
  );
};

export default DashboardPage;
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);

  return (
    <AppContext.Provider value={{ trips, setTrips, bookings, setBookings, customers, setCustomers }}>
      {children}
    </AppContext.Provider>
  );
};
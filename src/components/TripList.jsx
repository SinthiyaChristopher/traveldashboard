import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Pagination from "../components/Pagination";

const TripList = ({ onBook }) => {
  const { trips } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 5;
  const totalPages = Math.ceil(trips.length / tripsPerPage);

  const paginatedTrips = trips.slice(
    (currentPage - 1) * tripsPerPage,
    currentPage * tripsPerPage
  );

  return (
    <>
      <div>
        {paginatedTrips.map((trip) => (
          <div key={trip.id}>
            {trip.title} - ${trip.price}
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className="trip-list">
        <h2>Trips</h2>
        {trips.map((trip) => (
          <div key={trip.id} className="trip-item">
            <h3>{trip.title}</h3>
            <p>${trip.price}</p>
            <button onClick={() => onBook(trip)}>Book Now</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TripList;
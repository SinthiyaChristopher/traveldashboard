export const filterTrips = (trips, { destination, minPrice, maxPrice, startDate, endDate }) => {
  return trips.filter(trip => {
    const matchesDestination = destination ? trip.destination === destination : true;
    const matchesPrice = (minPrice ? trip.price >= minPrice : true) &&
                         (maxPrice ? trip.price <= maxPrice : true);
    const matchesDate = (startDate ? new Date(trip.date) >= new Date(startDate) : true) &&
                        (endDate ? new Date(trip.date) <= new Date(endDate) : true);

    return matchesDestination && matchesPrice && matchesDate;
  });
};

// Sort trips by price or date
export const sortTrips = (trips, sortBy) => {
  if (sortBy === "price") {
    return [...trips].sort((a, b) => a.price - b.price);
  }
  if (sortBy === "date") {
    return [...trips].sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return trips;
};
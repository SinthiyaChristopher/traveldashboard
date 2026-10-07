import React from "react";
import { Bar } from "react-chartjs-2";   // ✅ only import Bar
import { Chart as ChartJS } from "chart.js/auto";

const Charts = ({ bookings }) => {
  const destinations = bookings.map(b => b.trip.destination);
  const destinationCounts = destinations.reduce((acc, dest) => {
    acc[dest] = (acc[dest] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(destinationCounts),
    datasets: [
      {
        label: "Bookings per Destination",
        data: Object.values(destinationCounts),
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"],
      },
    ],
  };

  return (
    <div className="charts">
      <h2>Statistics</h2>
      <Bar data={data} />   {/* ✅ only Bar chart */}
    </div>
  );
};

export default Charts;
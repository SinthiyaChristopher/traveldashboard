import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "../styles/components.css";
import "../styles/sidebar.css";

const StatisticsPage = () => {
  const { bookings } = useContext(AppContext);

  // Bookings per destination
  const destinationCounts = bookings.reduce((acc, b) => {
    const dest = b.trip.destination || "Unknown";
    acc[dest] = (acc[dest] || 0) + 1;
    return acc;
  }, {});

  const bookingsData = {
    labels: Object.keys(destinationCounts),
    datasets: [
      {
        label: "Bookings per Destination",
        data: Object.values(destinationCounts),
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"],
      },
    ],
  };

  // Payment status breakdown
  const paymentCounts = bookings.reduce((acc, b) => {
    acc[b.paymentStatus] = (acc[b.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  const paymentData = {
    labels: Object.keys(paymentCounts),
    datasets: [
      {
        data: Object.values(paymentCounts),
        backgroundColor: ["#8BC34A", "#F44336", "#FFC107"],
      },
    ],
  };

  // Revenue trend (line chart)
  const revenueByDate = bookings.reduce((acc, b) => {
    const date = b.date;
    acc[date] = (acc[date] || 0) + (b.paymentStatus === "Paid" ? b.trip.price : 0);
    return acc;
  }, {});

  const revenueData = {
    labels: Object.keys(revenueByDate),
    datasets: [
      {
        label: "Revenue Trend",
        data: Object.values(revenueByDate),
        borderColor: "#2196F3",
        fill: false,
      },
    ],
  };

  return (
    <div className="statistics-page">
      <h1>Statistics & Analytics</h1>

      <div className="chart-section">
        <h2>Bookings per Destination</h2>
        <Bar data={bookingsData} />
      </div>

      <div className="chart-section">
        <h2>Payment Status Breakdown</h2>
        <Pie data={paymentData} />
      </div>

      <div className="chart-section">
        <h2>Revenue Trend</h2>
        <Line data={revenueData} />
      </div>
    </div>
  );
};

export default StatisticsPage;
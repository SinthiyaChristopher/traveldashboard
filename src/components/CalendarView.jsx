import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarView = ({ bookings }) => {
  return (
    <div className="calendar-view">
      <h2>Calendar</h2>
      <Calendar />
      <ul>
        {bookings.map((b, i) => (
          <li key={i}>
            {b.trip.title} - {b.date}
            <span className={`booking-status ${b.isPast ? "past" : "upcoming"}`}>
              {b.isPast ? "Past" : "Upcoming"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
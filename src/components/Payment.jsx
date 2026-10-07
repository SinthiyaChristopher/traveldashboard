import React from "react";

const Payment = ({ booking, onPay }) => {
  const handlePayment = () => {
    onPay({ ...booking, paymentStatus: "Paid" });
  };

  return (
    <div className="payment">
      <h3>Payment for {booking.trip.title}</h3>
      <p>Amount: ${booking.trip.price}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
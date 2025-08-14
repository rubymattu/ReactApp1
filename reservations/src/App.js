import React, { useState, useEffect } from 'react';
import './App.css';
import ReservationBanner from './ReservationBanner';

function App() {
  const [userName, setUserName] = useState("Raveena");
  const [reservations, setReservations] = useState([
    { name: "Buy Flowers", time: "9:00 am - 12:00 noon", booked: false },
    { name: "Get Shoes", time: "9:00 am - 12:00 noon", booked: false },
    { name: "Collect Tickets", time: "9:00 am - 12:00 noon", booked: true },
    { name: "Call Joe", time: "9:00 am - 12:00 noon", booked: false }
  ]);
  return (
    <div className="container mt-3">
      <ReservationBanner userName={userName} reservations={reservations} />
    </div>


  );
}
export default App;

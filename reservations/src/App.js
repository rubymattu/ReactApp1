import React, { useState, useEffect } from 'react';
import './App.css';
import ReservationBanner from './ReservationBanner';
import ReservationRow from './ReservationRow';
import ReservationCreator from './ReservationCreator';

function App() {
  const [userName, setUserName] = useState("Raveena");
  const [reservation, setReservation] = useState([
      { name: "Heart Lake Conservation Area", time: "9:00 am - 12:00 noon", booked: false },
      { name: "Heart Lake Conservation Area", time: "12:00 noon - 3:00 pm", booked: false },
      { name: "Heart Lake Conservation Area", time: "3:00 pm - 6:00 pm", booked: true },
      { name: "Rattlesnake Conservation Area", time: "9:00 am - 12:00 noon", booked: false }
  ]);

  const createNewReservation = (newRes) => {
    const updatedRes = [...reservation, newRes];
    setReservation(updatedRes);
    localStorage.setItem("reservations", JSON.stringify(updatedRes));
  };

  const [showBooked, setShowBooked] = useState(true);

  const toggleRes = (selectedReservation) => {
    const updatedRes = reservation.map((item) =>
      item.name === selectedReservation.name && item.time === selectedReservation.time
        ? { ...item, booked: !item.booked }
        : item
    );
    setReservation(updatedRes);
    localStorage.setItem("reservations", JSON.stringify(updatedRes));
  };

  const editRes = (oldItem, newName) => {
    const updatedRes = reservation.map(item =>
      item.name === oldItem.name && item.time === oldItem.time
        ? { ...item, name: newName }
        : item
    );
    setReservation(updatedRes);
  };

useEffect(() => {
    try {
      const data = localStorage.getItem("reservations");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setReservation(parsedData);
        }
      } else {
        setUserName("Raveena");
        setReservation([
          { name: "Heart Lake Conservation Area", time: "9:00 am - 12:00 noon", booked: false },
          { name: "Heart Lake Conservation Area", time: "12:00 noon - 3:00 pm", booked: false },
          { name: "Heart Lake Conservation Area", time: "3:00 pm - 6:00 pm", booked: true },
          { name: "Rattlesnake Conservation Area", time: "9:00 am - 12:00 noon", booked: false }
        ]);
        setShowBooked(true);
      }
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  }, []);

  return (
    <div className="container mt-3">
      <ReservationBanner userName={userName} reservations={reservation} />

      <div className="m-3">
        <ReservationCreator onCreate={createNewReservation} />
      </div>
      
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Reservation Name</th>
            <th>Time</th>
            <th>isBooked</th> 
            <th>Action</th>{/* For edit button */}
          </tr>
        </thead>
        <tbody>
          {reservation.filter(reservation => !reservation.booked).map(reservation => (
            <ReservationRow
              key={`${reservation.name}-${reservation.time}`}
              reservation={reservation}
              toggle={toggleRes}
              editRes={editRes} // only passed for incomplete
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;

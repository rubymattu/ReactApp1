import React, { useState, useEffect } from 'react';
import './App.css';
import ReservationBanner from './ReservationBanner';
import ReservationRow from './ReservationRow';

function App() {
  const [userName, setUserName] = useState("Raveena");
  const [reservation, setReservation] = useState([
    { name: "Conservation Area 1", time: "9:00 am - 12:00 noon", booked: false },
    { name: "Conservation Area 1", time: "12:00 noon - 3:00 pm", booked: false },
    { name: "Conservation Area 1", time: "3:00 pm - 6:00 pm", booked: true },
    { name: "Conservation Area 2", time: "9:00 am - 12:00 noon", booked: false }
  ]);

  const toggleRes = (reservation) => {
    const updatedRes = reservation.map((item) =>    
      item.name === reservation.name
        ? { ...item, booked: !item.booked }
        : item
    );
    setReservation(updatedRes);
     localStorage.setItem("reservations", JSON.stringify(updatedRes));
  };

  const editRes = (oldItem, newAction) => {
    setReservation(
      reservation.map(item =>
        item.action === oldItem.action ? { ...item, action: newAction } : item
      )
    );
  };

  return (
    <div className="container mt-3">
      <ReservationBanner userName={userName} reservations={reservation} />

      {/* <div className="m-3">
        <TodoCreator callback={createNewTodo} />
      </div> */}
      
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
              key={reservation.name}
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

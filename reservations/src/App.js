import React, { useState, useEffect } from 'react';
import './App.css';
import ReservationBanner from './ReservationBanner';
import ReservationRow from './ReservationRow';
import ReservationCreator from './ReservationCreator';
import VisibilityControl from './VisibilityControl';

function App() {
  const [userName, setUserName] = useState("Raveena");
  const [reservation, setReservation] = useState([
      { name: "Heart Lake Conservation Area", time: "9:00 am - 12:00 noon", booked: false },
      { name: "Heart Lake Conservation Area", time: "12:00 noon - 3:00 pm", booked: false },
      { name: "Heart Lake Conservation Area", time: "3:00 pm - 6:00 pm", booked: true },
      { name: "Rattlesnake Conservation Area", time: "9:00 am - 12:00 noon", booked: true },
      { name: "Rattlesnake Conservation Area", time: "12:00 noon - 3:00 pm", booked: true },
      { name: "Rattlesnake Conservation Area", time: "3:00 pm - 6:00 pm", booked: false },
      { name: "Glen Haffy Conservation Area", time: "9:00 am - 12:00 noon", booked: false },
      { name: "Glen Haffy Conservation Area", time: "12:00 noon - 3:00 pm", booked: true },
      { name: "Glen Haffy Conservation Area", time: "3:00 pm - 6:00 pm", booked: false },
      { name: "Mountsberg Conservation Area", time: "9:00 am - 12:00 noon", booked: true },
      { name: "Mountsberg Conservation Area", time: "12:00 noon - 3:00 pm", booked: false },
      { name: "Mountsberg Conservation Area", time: "3:00 pm - 6:00 pm", booked: false }
  ]);

  const createNewReservation = (newRes) => {
    const updatedRes = [...reservation, newRes];
    setReservation(updatedRes);
    localStorage.setItem("reservations", JSON.stringify(updatedRes));
  };

  const [showBooked, setShowBooked] = useState(true);
  const clearBooked = () => {
    setReservation(reservation.filter(item => !item.booked));
  };

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

  const deleteRes = (resToDelete) => {
    const updatedRes = reservation.filter(
      item => !(item.name === resToDelete.name && item.time === resToDelete.time)
    );
    setReservation(updatedRes);
    localStorage.setItem("reservations", JSON.stringify(updatedRes));
  };


  useEffect(() => {
    try {
      const data = localStorage.getItem("reservations");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setReservation(parsedData);
        }
      }
    } catch (error) {
      console.error("Failed to load reservations:", error);
    }
  }, []);

  return (
    <div className="container mt-3">
      {/* Display Banner */}
      <ReservationBanner userName={userName} reservations={reservation} />

      {/* Display Add Reservation */}
      <div className="m-3">
        <ReservationCreator onCreate={createNewReservation} />
      </div>
      
      {/* Table to show available reservations */}
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>isBooked</th> 
            <th>Action</th>
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

      {/* Toggle to display/hide booked reservations */}
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Booked Reservations"
          isChecked={showBooked}
          callback={(checked) => setShowBooked(checked)} />
      </div>

      {/* Table to show booked reservations */}
      {showBooked && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>isBooked</th>
              <th>Action</th> {/* Delete button */}
            </tr>
          </thead>
          <tbody>
            {reservation.filter(reservation => reservation.booked).map(reservation => (
            <ReservationRow
              key={`${reservation.name}-${reservation.time}`}
              reservation={reservation}
              toggle={toggleRes}
              deleteRes={deleteRes} // only passed for incomplete
            />
          ))}
          </tbody>
        </table>
      )}
      {reservation.some(item => item.booked) && (
        <div className="text-center mt-3">
          <button
            className="btn btn-danger"
            onClick={clearBooked}
          >
            Clear All Completed
          </button>
        </div>
      )}
    </div>
  );
}
export default App;

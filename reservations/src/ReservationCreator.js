import React, { useState } from 'react';

function ReservationCreator({ onCreate }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const timeSlots = [
    '9:00 am - 12:00 noon',
    '12:00 noon - 3:00 pm',
    '3:00 pm - 6:00 pm'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || time.trim() === '') return;

    const newReservation = {
      name: name.trim(),
      time: time,
      booked: false
    };

    onCreate(newReservation);
    setName('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-2">
        {/* Reservation Name */}
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Reservation Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Time Select */}
        <div className="col">
          <select
            className="form-select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Add Reservation
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReservationCreator;

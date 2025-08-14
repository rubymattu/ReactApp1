import React, { useState } from 'react';

function ReservationRow({ reservation, toggle, deleteRes, editRes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(reservation.name);

  const onToggle = () => toggle(reservation);
  const onDelete = () => deleteRes && deleteRes(reservation);
  const onSave = () => {
    editRes(reservation, editedText);
    setIsEditing(false);
  };

  return (
    <tr>
      {/* Reservation Name */}
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          reservation.name
        )}
      </td>

      {/* Reservation Time */}
      <td>{reservation.time}</td>

      {/* IsBooked checkbox */}
      <td>
        <input
          type="checkbox"
          checked={reservation.booked}
          onChange={onToggle}
        />
      </td>

      {/* Actions */}
      <td>
        {editRes && !isEditing && (
          <button
            className="btn btn-sm btn-warning me-1"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        {isEditing && (
          <button
            className="btn btn-sm btn-success me-1"
            onClick={onSave}
          >
            Save
          </button>
        )}
        {deleteRes && (
          <button
            className="btn btn-sm btn-danger"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default ReservationRow;

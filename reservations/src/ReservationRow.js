import React, { useState } from 'react';

function ReservationRow({ reservation, toggle, deleteRes, editRes }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(reservation.name);

  const onToggle = () => toggle(reservation);
  const onDelete = () => deleteRes && deleteRes(reservation);
  const onSave = () => {
    editRes(reservation, editedName);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          reservation.name
        )}
      </td>
      <td>{reservation.time}</td>
      <td>
        <input
          type="checkbox"
          checked={reservation.booked}
          onChange={onToggle}
        />
      </td>
      <td>
        {/* Edit button only for incomplete reservations */}
        {editRes && !isEditing && (
          <button className="btn btn-warning btn-sm me-1" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
        {isEditing && (
          <button className="btn btn-success btn-sm me-1" onClick={onSave}>
            Save
          </button>
        )}

        {/* Delete button only for completed reservations */}
        {deleteRes && (
          <button className="btn btn-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}

export default ReservationRow;

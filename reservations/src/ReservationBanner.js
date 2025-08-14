import React from 'react';
 
function ReservationBanner({userName, reservations}) {
  return (
    <h4 className="bg-primary text-white text-center p-2">
      { userName }'s Reservation List
      ({ reservations.filter(r => !r.booked).length } Reservations)
    </h4>
  );
}
 
export default ReservationBanner;
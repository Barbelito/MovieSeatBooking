import { useState } from "react";
import BookingForm from "./BookingForm";

export default function Summary({
  count,
  total,
  seats,
  movieId,
  onBookingComplete,
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <p className="text">
        You have selected <span>{count}</span> seats for a price of ${total}
      </p>

      <button className="start-booking-btn" onClick={() => setShowForm(true)}>
        Start booking
      </button>

      {showForm && (
        <BookingForm
          count={count}
          total={total}
          seats={seats}
          movieId={movieId}
          onClose={() => setShowForm(false)}
          onBookingComplete={onBookingComplete}
        />
      )}
    </>
  );
}

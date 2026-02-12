import { useState } from "react";

export default function BookingForm({
  count,
  total,
  seats,
  movieId,
  onClose,
  onBookingComplete,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      alert("Name has to be at least 2 letters.");
      return;
    }

    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be 7–15 digits.");
      return;
    }

    const booking = {
      name,
      phone,
      movieId,
      seats,
      total,
    };

    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (!response.ok) throw new Error("Something went wrong");

      alert("Booking saved!");
      onBookingComplete();
      onClose();
    } catch (error) {
      alert("Could not save booking.");
      console.error(error);
    }
  };

  return (
    <div className="booking-panel">
      <form className="booking-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Complete Your Booking</h3>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            value={phone}
            placeholder="07XXXXXXXX"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="button-row">
          <button type="submit" className="confirm-btn">
            Confirm
          </button>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

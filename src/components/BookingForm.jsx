import { useState } from "react";

export default function BookingForm({ count, total, seats, movieId, onClose }) {
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
      onClose();
    } catch (error) {
      alert("Could not save booking.");
      console.error(error);
    }
  };

  return (
    <div id="bookingFormContainer">
      <form id="bookingForm" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Phone number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit">Confirm booking</button>
      </form>
    </div>
  );
}

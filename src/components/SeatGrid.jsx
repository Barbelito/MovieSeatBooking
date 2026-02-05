import { useState } from "react";

export default function SeatGrid() {
  // Create a 2D array representing rows and seats
  const initialSeats = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "occupied", "occupied", "", "", ""],
    ["", "", "", "", "", "", "occupied", "occupied"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "occupied", "occupied", "", "", ""],
    ["", "", "", "", "occupied", "occupied", "occupied", ""],
  ];

  const [seats, setSeats] = useState(initialSeats);

  const toggleSeat = (rowIndex, seatIndex) => {
    // Prevent clicking occupied seats
    if (seats[rowIndex][seatIndex] === "occupied") return;

    const updated = seats.map((row, r) =>
      row.map((seat, s) => {
        if (r === rowIndex && s === seatIndex) {
          return seat === "selected" ? "" : "selected";
        }
        return seat;
      }),
    );

    setSeats(updated);
  };

  return (
    <div className="container">
      <div className="screen"></div>

      {seats.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((seat, seatIndex) => (
            <div
              key={seatIndex}
              className={`seat ${seat}`}
              onClick={() => toggleSeat(rowIndex, seatIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

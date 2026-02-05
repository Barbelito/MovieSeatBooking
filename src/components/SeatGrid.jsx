import { useState, useEffect } from "react";

export default function SeatGrid({ onSelectChange }) {
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

  useEffect(() => {
    const count = seats.flat().filter((seat) => seat === "selected").length;
    onSelectChange(count);
  }, [seats, onSelectChange]);

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

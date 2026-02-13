import { useState, useEffect } from "react";
import MovieSelector from "./components/MovieSelector";
import Showcase from "./components/Showcase";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";
import AdminMovies from "./components/AdminMovies";

export default function App() {
  const [moviePrice, setMoviePrice] = useState(100);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(1);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    if (!selectedMovieId) return;

    async function loadOccupied() {
      const res = await fetch(
        `http://localhost:3000/bookings?movieId=${selectedMovieId}`,
      );
      const data = await res.json();

      const allSeats = data.flatMap((b) => b.seats);
      setOccupiedSeats(allSeats);
    }

    loadOccupied();
  }, [selectedMovieId]);

  const reloadOccupied = async () => {
    if (!selectedMovieId) return;

    const res = await fetch(
      `http://localhost:3000/bookings?movieId=${selectedMovieId}`,
    );
    const data = await res.json();

    const allSeats = data.flatMap((b) => b.seats);
    setOccupiedSeats(allSeats);
  };

  if (showAdmin) {
    return (
      <div>
        <button onClick={() => setShowAdmin(false)}>Back to booking</button>
        <AdminMovies />
      </div>
    );
  }

  return (
    <>
      <button onClick={() => setShowAdmin(true)}>Admin</button>

      <MovieSelector
        onChange={(movie) => {
          setMoviePrice(movie.price);
          setSelectedMovieId(movie.id);
        }}
      />
      <Showcase />
      <SeatGrid
        onSelectChange={setSelectedSeats}
        occupiedSeats={occupiedSeats}
      />
      <Summary
        count={selectedSeats.length}
        total={selectedSeats.length * moviePrice}
        seats={selectedSeats}
        movieId={selectedMovieId}
        onBookingComplete={reloadOccupied}
      />
    </>
  );
}

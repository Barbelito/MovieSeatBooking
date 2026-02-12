import { useState } from "react";
import MovieSelector from "./components/MovieSelector";
import Showcase from "./components/Showcase";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";

export default function App() {
  const [moviePrice, setMoviePrice] = useState(100);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  return (
    <>
      <MovieSelector
        onChange={(movie) => {
          setMoviePrice(movie.price);
          setSelectedMovieId(movie.id);
        }}
      />
      <Showcase />
      <SeatGrid onSelectChange={setSelectedSeats} />{" "}
      <Summary
        count={selectedSeats.length}
        total={selectedSeats.length * moviePrice}
        seats={selectedSeats}
        movieId={selectedMovieId}
      />
    </>
  );
}

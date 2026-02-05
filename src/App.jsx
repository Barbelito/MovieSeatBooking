import { useState } from "react";
import MovieSelector from "./components/MovieSelector";
import Showcase from "./components/Showcase";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";

export default function App() {
  const [moviePrice, setMoviePrice] = useState(100);
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <>
      <MovieSelector onChange={(e) => setMoviePrice(Number(e.target.value))} />
      <Showcase />
      <SeatGrid onSelectChange={setSelectedCount} />
      <Summary count={selectedCount} total={selectedCount * moviePrice} />
    </>
  );
}

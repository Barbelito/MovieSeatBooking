import MovieSelector from "./components/MovieSelector";
import Showcase from "./components/Showcase";
import SeatGrid from "./components/SeatGrid";
import Summary from "./components/Summary";

export default function App() {
  return (
    <>
      <MovieSelector />
      <Showcase />
      <SeatGrid />
      <Summary count={0} total={0} />
    </>
  );
}

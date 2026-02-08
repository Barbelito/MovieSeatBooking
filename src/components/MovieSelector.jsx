import { useEffect, useState } from "react";
import Movie from "../models/Movie";

export default function MovieSelector({ onChange }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then((data) => {
        const movieObjects = data.map((m) => new Movie(m.id, m.name, m.price));
        setMovies(movieObjects);
      });
  }, []);

  return (
    <div className="movie-container">
      {" "}
      <label htmlFor="movie">Pick a movie:</label>{" "}
      <select id="movie" onChange={onChange}>
        {" "}
        {movies.map((movie) => (
          <option key={movie.id} value={movie.price}>
            {" "}
            {movie.name} ({movie.price} kr){" "}
          </option>
        ))}{" "}
      </select>{" "}
    </div>
  );
}

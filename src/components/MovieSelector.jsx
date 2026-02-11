import { useEffect, useState } from "react";
import Movie from "../models/Movie";

export default function MovieSelector({ onChange }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch("http://localhost:3000/movies");
        if (!res.ok) throw new Error("Local server not running");
        const data = await res.json();
        const movieArray = Array.isArray(data) ? data : data.movies;
        const movieObjects = movieArray.map(
          (m) => new Movie(m.id, m.name, m.price),
        );
        setMovies(movieObjects);
      } catch (err) {
        console.warn("Using fallback backup-movies.json");
        const res = await fetch("/backup-movies.json");
        const data = await res.json();
        const movieObjects = data.map((m) => new Movie(m.id, m.name, m.price));
        setMovies(movieObjects);
      }
    }
    loadMovies();
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

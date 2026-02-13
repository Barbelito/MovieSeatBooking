import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/movies";

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setMovies(data);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const movie = { ...formData, price: Number(formData.price) };
    const method = editingMovie ? "PUT" : "POST";
    const url = editingMovie ? `${API_URL}/${editingMovie.id}` : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    resetForm();
    fetchMovies();
  }

  function startEdit(movie) {
    setEditingMovie(movie);
    setFormData({
      name: movie.name,
      price: movie.price,
    });
  }

  async function deleteMovie(id) {
    if (!confirm("Delete this movie?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchMovies();
  }

  function resetForm() {
    setEditingMovie(null);
    setFormData({ name: "", price: "" });
  }

  return (
    <div className="admin-container">
      <h2>Admin – Movies</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingMovie ? "Edit Movie" : "Add New Movie"}</h3>

        <label>Title</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <div className="admin-buttons">
          <button type="submit">
            {editingMovie ? "Save Changes" : "Create Movie"}
          </button>

          {editingMovie && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3>Existing Movies</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.price} kr</td>
              <td>
                <button onClick={() => startEdit(m)}>Edit</button>
                <button onClick={() => deleteMovie(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

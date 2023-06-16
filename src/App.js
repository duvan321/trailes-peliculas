import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import "./App.css";

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "7975efafde3d163a10e74da83deaaa85";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchkey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "loading movies" });
  const [playing, setPlaying] = useState(false);
  //esta funcion es para realizar la peticion por get al api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    setMovies(results);
    setMovie(results[0]);
  };
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      <h2 className="mt-5 mb-5 p-3 text-success-emphasis text-center bg-success-subtle border border-success-subtle rounded-3 ">
        Trailer de peliculas
      </h2>
      <form className="container mb-5 mt-5" onSubmit={searchMovies}>
        <input
          className="text-success border border-success-subtle rounded-3"
          type="text"
          placeholder="search"
          onChange={(e) => setSearchkey(e.target.value)}
        />
        <button className="btn btn-success">search</button>
      </form>
      {/* contenedor que a mostrar poster de la peliculas actuales */}
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3">
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt="peliculas"
                height={600}
                width="100%"
              />
              <h4 className="text-center text-success">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

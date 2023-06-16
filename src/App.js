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
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      <h1 className="p-3 text-success-emphasis text-center bg-primary-subtle border border-primary-subtle rounded-3 ">
        Trailer de peliculas
      </h1>
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
              <h4 className="text-center text-primary">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

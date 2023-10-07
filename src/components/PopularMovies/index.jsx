import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

import { Link } from "react-router-dom";
import "./styles.css";

const API_KEY = "352be1ca8ca831f3200d4a2408861013";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch popular movies from TMDB API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className=" flex items-center justify-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="movie-slider">
          <h2 className=" text-left text-white text-xl">Popular Movies</h2>
          <div className="slider">
            {movies.map((movie) => (
              <div key={movie.id} className="slide h-[300px] md:h-[500px]">
                <Link to={`/movie/${movie.id}`} className="">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-[100%] md:h-[60%] lg:h-[90%]"
                  />
                  <h3 className=" text-left text-white text-[18px] md:text-xl md:w-[200px]">
                    {movie.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularMovies;

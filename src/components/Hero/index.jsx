import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const apiKey = "352be1ca8ca831f3200d4a2408861013";
    const tmdbEndpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    axios
      .get(tmdbEndpoint)
      .then(async (response) => {
        const moviesData = response.data.results;
        const moviesWithTrailers = [];

        for (const movie of moviesData) {
          const videosEndpoint = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`;
          const videosResponse = await axios.get(videosEndpoint);
          const trailers = videosResponse.data.results.filter(
            (video) => video.type === "Trailer"
          );

          if (trailers.length > 0) {
            movie.trailer_key = trailers[0].key;
            moviesWithTrailers.push(movie);
          }
        }

        setMovies(moviesWithTrailers);
      })
      .catch((error) => {
        console.error("Error fetching data from TMDB:", error);
      });
  }, []);

  return (
    <div className="hero-slider w-[90%] mx-auto rounded-lg mt-5">
      <Carousel
        showStatus={false}
        showThumbs={false}
        showArrows={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000} // Change slide every 5 seconds (adjust as needed)
        selectedItem={currentSlide}
        onChange={(index) => setCurrentSlide(index)}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="slider-item">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="overlay flex flex-col items-center justify-center">
              <div className="overlay-content flex flex-col items-center justify-center">
                <h1 className=" text-[30px] md:text-xl">{movie.title}</h1>
                <p className="hidden md:block md:text-center">
                  {movie.overview}
                </p>
                <button className="trailer-btn bg-blue-900 text-white hover:text-xl p-3 mt-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.trailer_key}`}
                    // onClick={() => handleWatchTrailer(movie)}
                    target="_blank"
                  >
                    Watch Trailer
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;

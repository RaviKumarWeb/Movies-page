import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

const MovieDetails = ({ match }) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [videoKey, setVideoKey] = useState("");
  const { id } = useParams(); // Extract movie ID from route parameter

  useEffect(() => {
    // Fetch movie details
    const fetchMovieDetails = async () => {
      const API_KEY = "352be1ca8ca831f3200d4a2408861013"; // Replace with your TMDB API key
      const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const VIDEO_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

      try {
        const [movieResponse, videoResponse] = await Promise.all([
          Axios.get(MOVIE_URL),
          Axios.get(VIDEO_URL),
        ]);

        setMovieDetails(movieResponse.data);

        // Find and set the first video key (usually a YouTube key)
        const firstVideo = videoResponse.data.results.find(
          (video) => video.site === "YouTube"
        );
        if (firstVideo) {
          setVideoKey(firstVideo.key);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mb-5">
        <div className="flex flex-col items-center justify-center lg:flex-row ">
          <div className=" w-full md:w-[80%]">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-[100%] lg:w-[80%]"
            />
          </div>
          <div className=" ml-4 flex flex-col items-start">
            <h2 className="text-3xl font-semibold">{movieDetails.title}</h2>
            <p className="mt-4">{movieDetails.overview}</p>
            <div className=" flex items-center justify-between w-[90%] mx-auto mb-4 mt-2">
              <p className=" text-sm">
                Rating: {movieDetails.vote_average} ⭐⭐⭐⭐
              </p>
              <p className=" text-sm">
                Relese Date: {movieDetails.release_date}
              </p>
              <p className=" text-xs">
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  className=" text-blue-600"
                >
                  Visit Official Page
                </a>
              </p>
            </div>
            <div className="mt-4 self-center lg:self-start ">
              <a
                // href={`https://www.youtube.com/watch?v=${videoKey}`}
                href={`https://shrinkme.io/st?api=f857857d402e0ebc95baebccc704a85a95f78bca&url=https://www.youtube.com/watch?v=${videoKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;

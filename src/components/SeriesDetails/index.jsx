// TVSeriesDetails.js
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

const TVSeriesDetails = () => {
  const [seriesDetails, setSeriesDetails] = useState({});
  const [videoKey, setVideoKey] = useState("");
  const { id } = useParams(); // Extract TV series ID from route parameter

  useEffect(() => {
    // Fetch TV series details
    const fetchSeriesDetails = async () => {
      const API_KEY = "352be1ca8ca831f3200d4a2408861013"; // Replace with your TMDB API key
      const SERIES_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
      const VIDEO_URL = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`;

      try {
        const [seriesResponse, videoResponse] = await Promise.all([
          Axios.get(SERIES_URL),
          Axios.get(VIDEO_URL),
        ]);

        setSeriesDetails(seriesResponse.data);

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

    fetchSeriesDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center lg:flex-row ">
          <div className=" w-full md:w-[80%]">
            <img
              src={`https://image.tmdb.org/t/p/w500${seriesDetails.poster_path}`}
              alt={seriesDetails.name}
              className="w-[100%] lg:w-[80%]"
            />
            {/* Add more series details here */}
          </div>
          <div className="ml-4 flex flex-col items-start mb-5">
            <h2 className="text-3xl font-semibold">{seriesDetails.name}</h2>
            <p className="mt-4">{seriesDetails.overview}</p>
            <div className=" flex items-center justify-between w-[90%] mx-auto mb-4 mt-2">
              <p className=" text-sm">
                Rating: {seriesDetails.vote_average} ⭐⭐⭐⭐
              </p>
              <p className=" text-sm">
                Relese Date: {seriesDetails.first_air_date}
              </p>
              <p className=" text-xs">
                <a
                  href={seriesDetails.homepage}
                  target="_blank"
                  className=" text-blue-600"
                >
                  Visit Official Page
                </a>
              </p>
            </div>
            {videoKey && (
              <div className="mt-4 self-center lg:self-start">
                <a
                  href={`https://www.youtube.com/watch?v=${videoKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TVSeriesDetails;

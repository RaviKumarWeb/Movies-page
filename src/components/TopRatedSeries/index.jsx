import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";

// const API_KEY = "352be1ca8ca831f3200d4a2408861013";
// const API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=YOUR_API_KEY&language=en-US&page=1
// `;

const TopRatedSeries = () => {
  const [tvSeries, setTVSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTVSeries = async () => {
      const API_KEY = "352be1ca8ca831f3200d4a2408861013"; // Replace with your TMDB API key
      const API_URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1
`;

      try {
        const response = await axios.get(API_URL);
        setTVSeries(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchPopularTVSeries();
  }, []);

  return (
    <div className="">
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
          <h2 className=" text-left text-white text-xl">Popular Tv Series</h2>
          <div className="slider">
            {tvSeries.map((movie) => (
              <div key={movie.id} className="slide h-[300px] md:h-[500px]">
                <Link to={`/series/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="h-[100%] md:h-[60%] lg:h-[90%]"
                  />
                  <h3 className=" text-left text-white text-[18px] md:text-xl md:w-[200px]">
                    {movie.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRatedSeries;

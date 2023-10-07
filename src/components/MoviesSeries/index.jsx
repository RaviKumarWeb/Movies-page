import { useState } from "react";
import PopularMovies from "../PopularMovies";
import PopularTvSeries from "../PopularTvSeries";
const MoviesSeries = () => {
  const [show, setShow] = useState(false);

  const onSeries = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <div className=" mt-5">
      <div className=" flex items-center justify-center w-[90%] mx-auto">
        <button
          onClick={onSeries}
          className=" p-3 bg-blue-800 text-white rounded-xl"
        >
          {show ? "Movies" : "Tv Series"}
        </button>
      </div>
      {show ? <PopularTvSeries /> : <PopularMovies />}
    </div>
  );
};
export default MoviesSeries;

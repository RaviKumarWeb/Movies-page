import { useState } from "react";
import TopRatedMovies from "../TopRatedMovies";
import TopRatedSeries from "../TopRatedSeries";

const TopRatedMoviesSeries = () => {
  const [show, setShow] = useState(false);

  const onSeries = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <div className="">
      <div className=" flex items-center justify-center w-[90%] mx-auto">
        <button
          onClick={onSeries}
          className=" p-3 bg-blue-800 text-white rounded-xl"
        >
          {show ? "Movies" : "Tv Series"}
        </button>
      </div>
      {show ? <TopRatedSeries /> : <TopRatedMovies />}
    </div>
  );
};
export default TopRatedMoviesSeries;

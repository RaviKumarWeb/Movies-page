import { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TVSeriesDetails from "./components/SeriesDetails";

class App extends Component {
  render() {
    return (
      <div className=" bg-slate-800 min-h-screen text-white">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movie/:id" element={<MovieDetails />} />
          <Route exact path="/series/:id" element={<TVSeriesDetails />} />
        </Routes>
      </div>
    );
  }
}
export default App;

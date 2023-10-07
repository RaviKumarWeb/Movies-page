import Navbar from "../Navbar";
import HeroSlider from "../Hero";
import MoviesSeries from "../MoviesSeries";
import TopRatedMoviesSeries from "../TopRatedMoviesSeries";
import Footer from "../Footer";
const Home = () => {
  return (
    <div div className=" mb-10">
      <Navbar />
      <HeroSlider />
      <MoviesSeries />
      <TopRatedMoviesSeries />
      <Footer />
    </div>
  );
};

export default Home;

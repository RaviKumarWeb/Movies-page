import { Link } from "react-router-dom";

import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex items-center justify-around p-3 font-semibold shadow-lg h-[80px]">
      <div className="logo">
        <Link to="/" className>
          <h1 className=" text-xl md:text-2xl ml-2">NeT MOviEs</h1>
        </Link>{" "}
      </div>

      <div className=" md:flex items-center">
        <Link to="/" className="mr-4">
          Home
        </Link>{" "}
      </div>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primary text-white px-4 sm:px-6 py-3 shadow-md font-display">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <Link to="/" className="text-xl font-bold">SmartRecipe 🍽️</Link>
        <div className="space-x-4 text-sm sm:text-base">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/generate" className="hover:underline">Generate</Link>
          <Link to="/chat" className="hover:underline">ChatBot</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
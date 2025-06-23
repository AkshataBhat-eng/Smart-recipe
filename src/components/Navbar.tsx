import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">SmartRecipe 🍽️</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/generate" className="hover:underline">Generate</Link>
          <Link to="/chat" className="hover:underline">ChatBot</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
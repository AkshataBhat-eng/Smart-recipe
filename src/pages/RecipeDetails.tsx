import { useParams, useNavigate } from "react-router-dom";
import { Recipe } from "../types/recipe";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ArrowLeft } from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe>({} as Recipe);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackImage = "/assets/images/cheesy-pizza-loader.webp"

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recipes/${id}/`)
      .then((res) => {
        setRecipe(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Recipe not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-60">
      <Loader2 className="animate-spin text-primary w-10 h-10" />
    </div>
  );
  if (error) return (
    <div className="text-center py-10">
      <p className="text-red-600 text-lg">{error}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary.dark transition"
      >
        Go Home
      </button>
    </div>
  );


  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 font-body">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-accent hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      {/* Image with fallback */}
      <img
        src={recipe.image || fallbackImage}
        alt={recipe.name}
        className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg shadow-md"
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
      />

      {/* Details */}
      <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-primary.dark font-display">
        {recipe.name}
      </h1>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">{recipe.description}</p>
      <p className="mt-2 text-sm text-accent">⏱ Cooking Time: {recipe.cooking_time}</p>

      {/* Ingredients */}
      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-primary font-display">
          🧂 Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
          {recipe.ingredients?.map((item, index) => (
            <li key={index} className="text-gray-800">{item}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 text-primary font-display">
          👨‍🍳 Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-1 text-sm sm:text-base">
          {recipe.steps?.map((step, index) => (
            <li key={index} className="text-gray-800">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
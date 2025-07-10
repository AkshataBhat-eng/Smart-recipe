import RecipeList from "../components/RecipeList";
import PrimaryButton from "../components/PrimaryButton";
import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import debounce from "lodash.debounce";
import { Search } from "lucide-react"
import { Recipe } from "../types/recipe";

const Home = () => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    quick: false,
    vegetarian: false,
  });

  const debouncedFetch = useMemo(() => {
    return debounce(
      (searchTerm: string, filterState: typeof filters) => {

        setLoading(true);
        const filterParams: string[] = [];
        if (filterState.quick) filterParams.push("quick=true");
        if (filterState.vegetarian) filterParams.push("vegetarian=true");

        const url = `http://localhost:8000/api/recipes/?search=${encodeURIComponent(
          searchTerm
        )}&${filterParams.join("&")}`;

        console.log("Calling API with:", url);

        axios
          .get(url)
          .then((res) => {
            setRecipes(res.data);
          })
          .catch((err) => {
            console.error("Error fetching recipes", err);
          })
          .finally(() => {
            setLoading(false);
          });
      },
      500,
      { leading: false, trailing: true }
    );
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      debouncedFetch(search, filters);
    }
    else {
      debouncedFetch("", filters)
    }

    return () => {
      debouncedFetch.cancel();
    };
  }, [search, filters, debouncedFetch]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recipes/")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error("Initial fetch failed", err));
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onclick = () => { setShowRecipe(true) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center font-body"
    >

      {
        !showRecipe && <>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary.dark font-display mb-4">
            🍳 Welcome to SmartRecipe
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            Discover personalized recipes, generate dishes from your ingredients, and chat with your smart cooking assistant.
          </p>
          <PrimaryButton onClick={onclick}>
            Get Started
          </PrimaryButton>
        </>
      }
      {
        showRecipe && <><h1 className="text-3xl font-bold mb-6">🍽️ Discover Recipes</h1>
          <div className="relative w-full sm:w-96 mb-4">
            <input
              type="text"
              placeholder="Search by name or ingredient..."
              value={search}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 text-sm font-body"
            />
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          </div>

          {/* 🔘 Filter Buttons */}
          <div className="mb-6 space-x-3">
            <button
              onClick={() => toggleFilter("quick")}
              className={`px-3 py-1.5 text-sm rounded-full font-body border ${filters.quick
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300"
                } transition`}
            >
              ⏱ Under 30 mins
            </button>
            <button
              onClick={() => toggleFilter("vegetarian")}
              className={`px-3 py-1.5 text-sm rounded-full font-body border ${filters.vegetarian
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300"
                } transition`}
            >
              🥦 Vegetarian
            </button>
          </div>

          {/* 🔄 Results */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-64 bg-yellow-100 animate-pulse rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <p className="text-gray-400">No matching recipes found 😢</p>
          ) : (
            <RecipeList recipes={recipes} />
          )}
        </>
      }
    </motion.div>

  )
}

export default Home;
import { Recipe } from "../types/recipe";
import RecipeList from "../components/RecipeList";

const Home = () => {

  const mockRecipes: Recipe[] = [
    {
      id: "1",
      name: "Spaghetti Aglio e Olio",
      image: "assets/images/aglio-e-olio-.jpg",
      description: "A classic Italian garlic pasta recipe.",
      cookingTime: "20 mins"
    },
    {
      id: "2",
      name: "Avocado Toast",
      image: "https://source.unsplash.com/400x300/?avocado-toast",
      description: "Simple and healthy breakfast with avocado.",
      cookingTime: "10 mins"
    },
    {
      id: "3",
      name: "Paneer Butter Masala",
      image: "https://source.unsplash.com/400x300/?paneer-curry",
      description: "Rich and creamy Indian cottage cheese dish.",
      cookingTime: "30 mins"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🍽️ Discover Recipes</h1>
      <RecipeList recipes={mockRecipes} />
    </div>
  )
}

export default Home;
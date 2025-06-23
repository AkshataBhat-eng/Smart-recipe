import { useParams } from "react-router-dom";
import { Recipe } from "../types/recipe";

const mockRecipes: Recipe[] = [
    {
        id: "1",
        name: "Spaghetti Aglio e Olio",
        image: "https://source.unsplash.com/400x300/?spaghetti",
        description: "A classic Italian garlic pasta recipe.",
        cookingTime: "20 mins",
        ingredients: [
            "Spaghetti - 200g",
            "Garlic - 4 cloves",
            "Olive Oil - 3 tbsp",
            "Chili Flakes - 1 tsp",
            "Parsley - chopped",
            "Salt"
        ],
        steps: [
            "Boil the spaghetti until al dente.",
            "Sauté sliced garlic in olive oil.",
            "Add chili flakes and cooked spaghetti.",
            "Mix well and top with parsley."
        ]
    },
    {
        id: "2",
        name: "Avocado Toast",
        image: "https://source.unsplash.com/400x300/?avocado-toast",
        description: "Simple and healthy breakfast with avocado.",
        cookingTime: "10 mins",
        ingredients: ["Bread slices", "Ripe avocado", "Salt", "Lemon juice", "Chili flakes"],
        steps: ["Toast the bread.", "Mash the avocado.", "Add salt and lemon juice.", "Spread on toast and sprinkle chili."]
    }
];

const RecipeDetails = () => {
    const { id } = useParams();
    const recipe = mockRecipes.find((r) => r.id === id);

    if( !recipe ) {
        return <div className="p-6 text-red-600 text-xl">Recipe not found.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
      <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
      <h1 className="text-3xl font-bold mt-4">{recipe.name}</h1>
      <p className="text-gray-600 mt-2">{recipe.description}</p>
      <p className="mt-2 text-sm text-gray-700">⏱ Cooking Time: {recipe.cookingTime}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">🧂 Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients?.map((item, index) => (
            <li key={index} className="text-gray-800">{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">👨‍🍳 Instructions</h2>
        <ol className="list-decimal list-inside">
          {recipe.steps?.map((step, index) => (
            <li key={index} className="text-gray-800 mb-1">{step}</li>
          ))}
        </ol>
      </div>
    </div>
    )
}

export default RecipeDetails;
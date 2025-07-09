import { useState } from "react";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import { Recipe } from "../types/recipe";

const GenerateRecipe = () => {
    const [ingredients, setIngredients] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeText, setRecipeText] = useState<Recipe>({
        id: '',
        name: '',
        description: '',
        cooking_time: '',
        ingredients: [],
        image: '',
        steps: [],
    });
    const [error, SetError] = useState("");

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setRecipeText({} as Recipe);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/generate/", {
                ingredients: ingredients,
            });
            setRecipeText(response.data || "No recipe found.");
            SetError("")
        } catch (error) {
            console.error(error);
            SetError("Error generating recipe. Please try again.");
            setRecipeText({} as Recipe)
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left text-primary.dark font-display">
                🧠 AI Recipe Generator
            </h1>
            <form onSubmit={handleGenerate} className="mb-6">
                <textarea
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-sm sm:text-base resize-none font-body mb-4"
                    rows={5}
                    placeholder="Enter ingredients separated by commas (e.g., chicken, garlic, onion)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                ></textarea>
                <PrimaryButton
                    type="submit">
                    {loading ? "Generating..." : "Generate Recipe"}
                </PrimaryButton>
            </form>
            {recipeText?.name && (
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-sm sm:text-base font-body space-y-4">
                    <h2 className="text-xl font-semibold text-primary font-display">{recipeText?.name}</h2>
                    <p className="text-gray-700">{recipeText?.description}</p>
                    <p className="text-sm text-accent">⏱ {recipeText?.cooking_time}</p>

                    <div>
                        <h3 className="font-semibold mb-1">🧂 Ingredients</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {recipeText?.ingredients?.map((item: string, index: number) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-1">👨‍🍳 Steps</h3>
                        <ul className=" space-y-1">
                            {recipeText?.steps?.map((step: string, index: number) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {error && <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-sm sm:text-base font-body space-y-4">
                <p className="text-gray-700">{error}</p>
            </div>}
        </div>
    )
}

export default GenerateRecipe;
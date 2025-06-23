import { useState } from "react";

const GenerateRecipe = () => {
    const [ingredients, setIngredients] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeText, setRecipeText] = useState("");

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setRecipeText("");

        try {
            const response = await fetch("http://localhost:8000/api/generate/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ingredients }),
            });

            const data = await response.json();
            setRecipeText(data.recipe || "No recipe found.");
        } catch (error) {
            console.error(error);
            setRecipeText("Error generating recipe. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">🧠 AI Recipe Generator</h1>
            <form onSubmit={handleGenerate} className="mb-4">
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={5}
                    placeholder="Enter ingredients separated by commas (e.g., chicken, garlic, onion)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    required
                ></textarea>
                <button
                    type="submit"
                    className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {loading ? "Generating..." : "Generate Recipe"}
                </button>
            </form>

            {recipeText && (
                <div className="bg-white p-4 rounded shadow">
                    <pre className="whitespace-pre-wrap text-gray-800">{recipeText}</pre>
                </div>
            )}
        </div>
    )
}

export default GenerateRecipe;
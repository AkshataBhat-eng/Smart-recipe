import { Recipe } from "../types/recipe";
import { useNavigate } from "react-router-dom";

interface Props {
    recipe: Recipe
}
const RecipeCard: React.FC<Props> = ({ recipe }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`)
    }
    return (
        <div
            onClick={handleClick}
            className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform ">
            <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
                <p className="text-sm text-gray-600">{recipe.description}</p>
                <p className="text-sm text-gray-800 mt-2">⏱ {recipe.cookingTime}</p>
            </div>
        </div>
    )
}

export default RecipeCard;
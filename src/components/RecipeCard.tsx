import { Recipe } from "../types/recipe";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
    recipe: Recipe
}
const RecipeCard: React.FC<Props> = ({ recipe }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe.id}`)
    }
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClick}
            className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-primary.dark line-clamp-1 font-display">{recipe.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2 font-body">{recipe.description}</p>
                <p className="text-sm text-accent mt-2 font-body">⏱ {recipe.cooking_time}</p>
            </div>
        </motion.div>
    )
}

export default RecipeCard;
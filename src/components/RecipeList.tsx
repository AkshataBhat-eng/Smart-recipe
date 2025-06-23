import { Recipe } from "../types/recipe";
import RecipeCard from "./RecipeCard";

interface Props {
  recipes: Recipe[];
}

const RecipeList: React.FC<Props> = ({ recipes }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
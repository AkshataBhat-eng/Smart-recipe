import { useEffect, useState } from "react";
import { Recipe } from "../types/recipe";
import RecipeCard from "./RecipeCard";
import axios from "axios";

interface Props {
  recipes: Recipe[];
}

const RecipeList: React.FC<Props> = ({recipes}) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recipes.map((recipe: any) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
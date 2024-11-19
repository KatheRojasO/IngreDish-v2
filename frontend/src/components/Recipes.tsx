import { RecipeCard } from "./RecipeCard";
import { Recipe, RecipesProps } from "../types/Recipe";
import { fetchFavoritesByUserId } from "../helper/UserFavoritesHelper";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export function Recipes({ recipesInfo, isFavoritePage }: RecipesProps) {
  const { user } = useUser();

  const [favoriteStatuses, setFavoriteStatuses] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function isRecipeFavorite(recipe: Recipe) {
      const data: Recipe[] = await fetchFavoritesByUserId(user?.id);
      return data.some((favoriteRecipe) => favoriteRecipe.id === recipe.id);
    }

    async function fetchFavoriteStatuses() {
      const statuses: { [key: string]: boolean } = {};
      for (const recipe of recipesInfo) {
        statuses[recipe.id] = await isRecipeFavorite(recipe);
      }
      setFavoriteStatuses(statuses);
      setLoading(false);
    }
    fetchFavoriteStatuses();
  }, [recipesInfo, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const recipes = recipesInfo.map((recipe) => {
    if (isFavoritePage) {
      return <RecipeCard key={recipe.id} recipeInfo={recipe} defautlFavoriteValue={true} />;
    }

    const isFavorite = favoriteStatuses[recipe.id];
    return <RecipeCard key={recipe.id} recipeInfo={recipe} defautlFavoriteValue={isFavorite} />;
  });

  return (
    <div className="recipes_container">
      <div className="cards-container">{recipes}</div>
    </div>
  );
}

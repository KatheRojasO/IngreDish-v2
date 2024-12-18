import { RecipeCard } from "./RecipeCard";
import { RecipesProps } from "../types/Recipe";
import { fetchFavoriteStatuses } from "../helper/UserFavoritesHelper";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

export function Recipes({ recipesInfo, isFavoritePage }: RecipesProps) {
  const { user } = useUser();

  const [favoriteStatuses, setFavoriteStatuses] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteStatuses(recipesInfo, user?.id).then((statuses) => {
      if (Object.keys(statuses).length === 0) {
        setLoading(true);
      } else {
        setFavoriteStatuses(statuses);
        setLoading(false);
      }
    });
  }, [recipesInfo, user]);

  if (loading) {
    return (
      <div className="spinner">
        <BeatLoader color="#3b9840" loading />
      </div>
    );
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
      <h2>Enjoy the recipes we have found for you!</h2>
      <div className="cards-container">{recipes}</div>
    </div>
  );
}

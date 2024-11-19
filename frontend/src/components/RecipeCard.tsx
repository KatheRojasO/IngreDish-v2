import { useState } from "react";
import { RecipeCardProps } from "../types/Recipe";
import HeartFilledIcon from "../assets/icons/HeartFilledIcon";
import HeartOutlineIcon from "../assets/icons/HeartOutlineIcon";
import { useUser } from "@clerk/clerk-react";
import { addFavorite, removeFavorite } from "../helper/UserFavoritesHelper";
import { Link } from "react-router-dom";

export function RecipeCard({
  recipeInfo,
  defautlFavoriteValue,
}: RecipeCardProps) {
  const [liked, setLiked] = useState(defautlFavoriteValue);
  const { user } = useUser();

  const toggleLike = () => {
    saveFavoriteSelection(!liked);
    setLiked(!liked);
  };

  function saveFavoriteSelection(favoriteSelected: boolean) {
    if (favoriteSelected) {
      addFavorite(user?.id, recipeInfo);
    } else {
      removeFavorite(user?.id, recipeInfo.id);
    }
  }

  return (
    <div className="card">
      <h3>{recipeInfo.title}</h3>
      <img
        src={recipeInfo.image}
        alt={recipeInfo.title}
        className="recipe-image"
      />
      <div className="card-buttons">
        <button onClick={toggleLike} className="like-button">
          {liked ? <HeartFilledIcon /> : <HeartOutlineIcon />}
        </button>
        <Link to={{ pathname: `/recipe/${recipeInfo.id}`}}>
          <button className="recipe-button">Go to recipe</button>
        </Link>
      </div>
    </div>
  );
}

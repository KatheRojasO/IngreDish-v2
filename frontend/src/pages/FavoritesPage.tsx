import { useUser } from "@clerk/clerk-react";
import { Header } from "../components/Header";
import { Recipes } from "../components/Recipes";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipe";
import { fetchFavoritesByUserId } from "../helper/UserFavoritesHelper";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!user) return;

    async function fetchFavorites() {
      const data: Recipe[] = await fetchFavoritesByUserId(user?.id);
      setFavorites(data);
    }

    fetchFavorites();
  }, []);

  return (
    <div>
      <Header />
      {favorites === null ? (
        <div className="favorites-alert">
          <p>Loading your favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="favorites-alert">
          <p>
            You don't have any favorites yet. ¡Explore recipes and save your favorites to see them
            here! ❤️
          </p>
          <Link to="/recipes">
            <button className="go-back-button">Go back to recipes page</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/recipes">
            <button className="go-back-button">Go back to recipes page</button>
          </Link>
          <Recipes recipesInfo={favorites} isFavoritePage={true} />
        </div>
      )}
    </div>
  );
}

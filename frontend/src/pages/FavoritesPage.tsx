import { useUser } from "@clerk/clerk-react";
import { Header } from "../components/Header";
import { Recipes } from "../components/Recipes";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipe";
import { fetchFavoritesByUserId } from "../helper/UserFavoritesHelper";

export default function FavoritesPage() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<Recipe[]>();

  useEffect(() => {
    if (!user) return;

    async function fetchFavorites() {
      const data: Recipe[] = await fetchFavoritesByUserId(user?.id);
      setFavorites(data);
    }

    fetchFavorites();
  }, [ user]);

  return (
    <div>
      <Header />
      <Recipes recipesInfo={favorites || []} isFavoritePage={true}/>
    </div>
  );
}

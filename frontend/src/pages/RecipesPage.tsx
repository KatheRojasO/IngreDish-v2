import { Recipes } from "../components/Recipes";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipe";
import { fetchRecipesByIngredients } from "../helper/SpoonacularApiHelper";
import { SelectedIngredientsForRecipesProps } from "../types/Ingredient";
import { User } from "../types/User";
import { useUser } from "@clerk/clerk-react";
import { addUser } from "../helper/UserFavoritesHelper";

export function RecipesPage({ selectedIngredients }: SelectedIngredientsForRecipesProps) {
  const [recipesInfo, setRecipesInfo] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipesInfo);

  useEffect(() => {
    fetchRecipesByIngredients(selectedIngredients).then((recipes) => {
      setRecipesInfo(recipes);
      setFilteredRecipes(recipes);
    });
  }, []);

  const { user } = useUser();
  if (user?.id && user?.fullName) {
    const userData: User = { userId: user.id, userName: user.fullName };
    addUser(userData);
  }

  return (
    <div>
      <Header />
      <Recipes recipesInfo={filteredRecipes} isFavoritePage={false} />
    </div>
  );
}

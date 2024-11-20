import { Recipes } from "../components/Recipes";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipe";
import { fetchRecipesByIngredients } from "../helper/SpoonacularApiHelper";
import { SelectedIngredientsForRecipesProps } from "../types/Ingredient";
import { User } from "../types/User";
import { useUser } from "@clerk/clerk-react";
import { addUser } from "../helper/UserFavoritesHelper";
import { Link } from "react-router-dom";

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
    <div className="recipes-page-container">
      <Header />
      <div className="go-back-btn-container">
        <Link to="/">
          <button className="go-back-button">Go back and change ingredients</button>
        </Link>
      </div>
      <Recipes recipesInfo={filteredRecipes} isFavoritePage={false} />
      <div className="go-back-btn-container">
        <Link to="/">
          <button className="go-back-button">Go back and change ingredients </button>
        </Link>
      </div>
    </div>
  );
}

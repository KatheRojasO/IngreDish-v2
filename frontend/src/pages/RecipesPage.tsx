import { SignedIn } from "@clerk/clerk-react";
import { Recipes } from "../components/Recipes";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Recipe";
import { fetchRecipesByIngredients } from "../helper/SpoonacularApiHelper";
import { SelectedIngredientsForRecipesProps } from "../types/Ingredient";


export function RecipesPage({ selectedIngredients }: SelectedIngredientsForRecipesProps) {

  const [recipesInfo, setRecipesInfo] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipesInfo);

  useEffect(() => {
    fetchRecipesByIngredients(selectedIngredients).then((recipes) => {
      setRecipesInfo(recipes);
      setFilteredRecipes(recipes);
    });
  }, []);

  return (
    <SignedIn>
      <Header />
      <Recipes recipesInfo={filteredRecipes} isFavoritePage={false}/>
    </SignedIn>
  );
}

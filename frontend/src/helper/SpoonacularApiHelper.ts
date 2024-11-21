import { Recipe, RecipeInstructions } from "../types/Recipe";

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes";

export async function fetchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
  const response = await fetch(`${SPOONACULAR_API_URL}/findByIngredients?ingredients=${ingredients.join(",+")}&number=16&apiKey=${SPOONACULAR_API_KEY}`);
  const data = await response.json();
  return data.map((recipe: Recipe) => ({ id: recipe.id, title: recipe.title, image: recipe.image }));
}

export async function fetchRecipeInstructions(recipeId: string | undefined): Promise<RecipeInstructions> {
  const response = await fetch(`${SPOONACULAR_API_URL}/${recipeId}/information?includeNutrition=false&apiKey=${SPOONACULAR_API_KEY}`);
  const data = await response.json();
  return { title: data.title, image: data.image, analyzedInstructions: data.analyzedInstructions };
}
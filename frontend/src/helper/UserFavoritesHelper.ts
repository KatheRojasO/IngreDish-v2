import { Recipe } from "../types/Recipe";
import { User } from "../types/User";

export async function fetchFavoritesByUserId(userId: string|undefined): Promise<Recipe[]> {
  const response = await fetch(`http://localhost:3000/api/users/${userId}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  return data.favoriteRecipes.map((recipe: Recipe) => ({ id: recipe.id, title: recipe.title, image: recipe.image }));
};

export async function addUser (userData: User) {
  await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
}

export async function addFavorite (userId: string|undefined, recipeInfo: Recipe) {
  fetch(`http://localhost:3000/api/users/${userId}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: recipeInfo.id, title: recipeInfo.title, image: recipeInfo.image }),
  });
}

export async function removeFavorite (userId: string|undefined, recipeId: number) {
  fetch(`http://localhost:3000/api/users/${userId}/favorites/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchFavoriteStatuses(recipesInfo: Recipe[], userId: string|undefined) {
  const data: Recipe[] = await fetchFavoritesByUserId(userId);
  const statuses: { [key: string]: boolean } = {};
  for (const recipe of recipesInfo) {
    statuses[recipe.id] = await data.some((favoriteRecipe) => favoriteRecipe.id === recipe.id);
  }
  return statuses;
};
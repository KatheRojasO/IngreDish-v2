export interface Recipe {
  id: number;
  title: string;
  image: string;
}

export interface SearchBarProps {
  recipesInfo: Recipe[];
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

export interface RecipesProps {
  recipesInfo: Recipe[] | [];
  isFavoritePage: boolean;
}

export interface RecipeCardProps {
  recipeInfo: Recipe;
  defautlFavoriteValue: boolean;
}

export interface UserDataInterface {
  userId: string | undefined;
  userName: string | null | undefined;
}

export interface RecipePageProps {
  recipeId: number;
}

export interface RecipeInstructions {
  title: string;
  image: string;
  analyzedInstructions: RecipeInstructionSteps[];
}

export interface RecipeInstructionSteps {
  steps: { step: string }[];
}

export interface RecipeNotesProps {
  recipeId: string | undefined;
}

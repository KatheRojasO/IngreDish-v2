export interface IngredientsCardProps {
  searchText: string;
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface SelectedIngredientsProps {
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface SelectedIngredientsForRecipesProps {
  selectedIngredients: string[];
}
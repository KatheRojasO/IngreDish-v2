import { useState } from "react";
import { IngredientsCard } from "../components/IngredientsCard.js";
import SelectedIngredientsCard from "../components/SelectedIngredientsCard.js";

export default function IngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  return (
    <div>
      <IngredientsCard selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>
      <SelectedIngredientsCard selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>
    </div>
  );
}

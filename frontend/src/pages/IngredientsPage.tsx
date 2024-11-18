import { useState } from "react";
import { IngredientsCard } from "../components/IngredientsCard.js";
import SelectedIngredientsCard from "../components/SelectedIngredientsCard.js";

export default function IngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  return (
    <div className="ingredients-page">
      <div className="ingredients-content">
        <IngredientsCard
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
      </div>
      <div className="selected-ingredients-sidebar">
        <SelectedIngredientsCard
          selectedIngredients={selectedIngredients}
          setSelectedIngredients={setSelectedIngredients}
        />
      </div>
    </div>
  );
}

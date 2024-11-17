import { IngredientsCard } from "../components/IngredientsCard.js";
import * as ingredients from "../types/Ingredients.jsx";

export default function IngredientsPage() {
  return (
    <div>
      <IngredientsCard {...ingredients}
      />
    </div>
  );
}

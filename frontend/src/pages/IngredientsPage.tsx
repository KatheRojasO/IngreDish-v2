import { useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { Header } from "../components/Header.js";
import { IngredientsCard } from "../components/IngredientsCard.js";
import { SelectedIngredientsCard } from "../components/SelectedIngredientsCard.js";

export default function IngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const { user } = useUser();

  return (
    <SignedIn>
      <Header />
      <div className="ingredients-page">
        <p>Hello {user?.firstName} 👋! Welcome to IngreDish!</p>
        <p>
          You can start searching recipes by oppening the categories and choosing the ingredientes
          you have in your fridge. We will give you ideas for today!
        </p>
        <div className="ingredients-section">
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
      </div>
    </SignedIn>
  );
}

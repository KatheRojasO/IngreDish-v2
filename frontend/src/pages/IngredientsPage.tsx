import { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { Header } from "../components/Header.js";
import { IngredientsCard } from "../components/IngredientsCard.js";
import { SelectedIngredientsCard } from "../components/SelectedIngredientsCard.js";
import { SearchBar } from "../components/SearchBar.js";

export default function IngredientsPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("selectedIngredients") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients));
  }, [selectedIngredients]);

  const [searchText, setSearchText] = useState<string>("");
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
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <div className="ingredients-section">
          <div className="ingredients-content">
            <IngredientsCard
              searchText={searchText}
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

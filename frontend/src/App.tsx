import { useState } from "react";
import { SignedOut } from "@clerk/clerk-react";
import IngredientsPage from "./pages/IngredientsPage";
import WelcomePageHeader from "./components/WelcomePageHeader";
import WelcomePage from "./pages/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecipesPage } from "./pages/RecipesPage";
import RecipeInstructionsPage from "./pages/RecipeInstructionsPage";
import FavoritesPage from "./pages/FavoritesPage";
import "./style/styles.css";
import { Toaster } from "react-hot-toast";

export function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("selectedIngredients") || "[]")
  );

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false}/>
      <SignedOut>
        <WelcomePageHeader />
        <WelcomePage />
      </SignedOut>
      <Routes>
        <Route
          path="/"
          element={
            <IngredientsPage
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />
          }
        />
        <Route
          path="/recipes"
          element={<RecipesPage selectedIngredients={selectedIngredients} />}
        />
        <Route path="/recipe/:recipeId" element={<RecipeInstructionsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

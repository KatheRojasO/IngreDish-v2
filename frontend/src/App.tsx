import { SignedOut } from "@clerk/clerk-react";
import IngredientsPage from "./pages/IngredientsPage";
import "./style/styles.css";
import WelcomePageHeader from "./components/WelcomePageHeader";
import WelcomePage from "./pages/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecipesPage } from "./pages/RecipesPage";
import { useState } from "react";


export function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("selectedIngredients") || "[]")
  );

  return (
    <BrowserRouter>
      <SignedOut>
        <WelcomePageHeader />
        <WelcomePage />
      </SignedOut>
      <Routes>
        <Route path="/" element={<IngredientsPage selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>} />
        <Route path="/recipes" element={<RecipesPage selectedIngredients={selectedIngredients} />} />
      </Routes>
    </BrowserRouter>
  );
}

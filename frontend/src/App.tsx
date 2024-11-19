import { SignedOut } from "@clerk/clerk-react";
import IngredientsPage from "./pages/IngredientsPage";
import "./style/styles.css";
import WelcomePageHeader from "./components/WelcomePageHeader";
import WelcomePage from "./pages/WelcomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <SignedOut>
        <WelcomePageHeader />
        <WelcomePage />
      </SignedOut>
      <Routes>
        <Route path="/" element={<IngredientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

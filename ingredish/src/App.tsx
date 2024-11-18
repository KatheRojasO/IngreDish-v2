import { SignedOut } from "@clerk/clerk-react";
import IngredientsPage from "./pages/IngredientsPage";
import "./style/styles.css";
import WelcomePageHeader from "./components/WelcomePageHeader";
import WelcomePage from "./style/pages/WelcomePage";

export function App() {
  return (
    <>
      <SignedOut>
        <WelcomePageHeader />
        <WelcomePage />
      </SignedOut>
      {/* <h1>Ingredish</h1>
      <IngredientsPage /> */}
    </>
  );
}

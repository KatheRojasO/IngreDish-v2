import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { RecipeInstructions } from "../types/Recipe";
import { fetchRecipeInstructions } from "../helper/SpoonacularApiHelper";
import { Link, useParams } from "react-router-dom";
import { UserNotes } from "../components/UserNotes";

export default function RecipeInstructionsPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipeInfo, setRecipeInfo] = useState<RecipeInstructions | null>(null);

  const image = recipeInfo?.image;
  useEffect(() => {
    if (recipeId) {
      fetchRecipeInstructions(recipeId).then((data) => setRecipeInfo(data));
    }
  }, [recipeId]);

  const stepElements = recipeInfo?.analyzedInstructions.flatMap((instruction) =>
    instruction.steps.map((step, index) => <li key={index}>{step.step}</li>)
  );

  return (
    <div className="recipe-instructions-container">
      <Header />
      <div className="go-back-btn-container">
        <Link to="/recipes">
          <button className="go-back-button">Go back to recipes page</button>
        </Link>
      </div>
      <div className="content-container">
        <div className="instructions-card">
          <h3>{recipeInfo?.title}</h3>
          <img src={image} alt={recipeInfo?.title} className="instructions-image" />
          <ol>{stepElements}</ol>
        </div>
        <UserNotes recipeId = {recipeId} />
      </div>
    </div>
  );
}

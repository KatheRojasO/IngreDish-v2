import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { RecipeInstructions } from "../types/Recipe";
import { fetchRecipeInstructions } from "../helper/SpoonacularApiHelper";
import { Link, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function RecipeInstructionsPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [note, setNote] = useState<string>("");
  const [recipeInfo, setRecipeInfo] = useState<RecipeInstructions | null>(null);
  const [savedNote, setSavedNote] = useState<string>(""); 
  const { user } = useUser();

  const image = recipeInfo?.image;
  useEffect(() => {
    if (recipeId) {
      fetchRecipeInstructions(recipeId).then((data) => setRecipeInfo(data));
    }
  }, [recipeId]);

  const stepElements = recipeInfo?.analyzedInstructions.flatMap((instruction) =>
    instruction.steps.map((step, index) => <li key={index}>{step.step}</li>)
  );

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleNoteSave = async () => {
    if (!user?.id || !recipeId) return;
    setSavedNote(note);
    alert("Your note has been saved!");
  };

  return (
    <div className="recipe-instructions-container">
      <Header />
      <div className="go-back-btn-container">
        <Link to="/recipes">
          <button className="go-back-button">Go back to recipes page</button>
        </Link>
      </div>
      <div className="instructions-card">
        <h3>{recipeInfo?.title}</h3>
        <img src={image} alt={recipeInfo?.title} className="instructions-image" />
        <ol>{stepElements}</ol>
      </div>
      <div className="note-container">
        <h3>Your Notes</h3>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Write what you liked or didn't like about this recipe..."
          className="note-textarea"
        />
        <button className="save-note-button" onClick={handleNoteSave}>
          Save Note
        </button>
        {savedNote && (
          <div className="saved-note">
            <h4>Saved Note:</h4>
            <p>{savedNote}</p>
          </div>
        )}
        </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { RecipeInstructions } from "../types/Recipe";
import { fetchRecipeInstructions } from "../helper/SpoonacularApiHelper";
import { Link, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Trash from "../assets/icons/Trash";

export default function RecipeInstructionsPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [note, setNote] = useState<string>("");
  const [recipeInfo, setRecipeInfo] = useState<RecipeInstructions | null>(null);
  const [savedNote, setSavedNote] = useState<string[]>([]);
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
    setSavedNote((prevNotes) => [...prevNotes, note]);
    toast.success("Note saved!");
    setNote("");
  };

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
        <div className="note-container">
          <div className="saved-notes">
            {savedNote.length > 0 ? (
              <>
                <h4>Your personal notes about this recipe</h4>
                <ul>
                  {savedNote.map((savedNote, index) => (
                    <div className="note-list-container">
                      <div><Trash /></div>
                      <li key={index} className="saved-note-item">
                        {savedNote}
                      </li>
                    </div>
                  ))}
                </ul>
              </>
            ) : (
              <p className="no-notes-message">No notes yet. Start by adding your first note!</p>
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
}

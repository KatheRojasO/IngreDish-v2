import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Trash from "../assets/icons/Trash";
import { RecipeNotesProps } from "../types/Recipe";

export function UserNotes({ recipeId }: RecipeNotesProps) {
  const [note, setNote] = useState<string>("");
  const [savedNote, setSavedNote] = useState<string[]>([]);
  const { user } = useUser();

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleNoteSave = async () => {
    if (!user?.id || !recipeId) return;
    setSavedNote((prevNotes) => [...prevNotes, note]);
    toast.success("Note saved!");
    setNote("");
  };

  function handleDeleteNote(index: number) {
    toast.remove("Do you want to delete this note?");
    setSavedNote((prevNotes) => prevNotes.filter((_, i) => i !== index));
  }
  return (
    <div className="note-container">
      <div className="saved-notes">
        {savedNote.length > 0 ? (
          <>
            <h4>Your personal notes about this recipe</h4>
            <ul>
              {savedNote.map((savedNote, index) => (
                <div className="note-list-container">
                  <button onClick={() => handleDeleteNote(index)}>
                    <Trash />
                  </button>
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
      <button className="save-note-button" onClick={handleNoteSave} disabled={note.length === 0}>
        Save Note
      </button>
    </div>
  );
}

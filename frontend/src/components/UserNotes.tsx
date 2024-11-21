import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Trash from "../assets/icons/Trash";
import { Note, RecipeNotesProps } from "../types/Recipe";
import { addRecipeNote, fetchNotesByUserIdAndRecipeId, removeNote } from "../helper/UserNotesHelper";

export function UserNotes({ recipeId }: RecipeNotesProps) {
  const [note, setNote] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const { user } = useUser();

  useEffect(() => {
    fetchNotesByUserIdAndRecipeId(user?.id, recipeId).then((data) => {
      setSavedNotes(data);
    })
  }, [savedNotes.length, user?.id, recipeId]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleNoteSave = async () => {
    const noteId = await addRecipeNote(user?.id, recipeId, note);
    setSavedNotes((prevNotes) => [...prevNotes, {id: noteId, content: note}]);
    toast.success("Note saved!");
    setNote("");
  };

  function handleDeleteNote(noteId: number) {
    toast.remove("Do you want to delete this note?");
    removeNote(user?.id, noteId);
    setSavedNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }
  return (
    <div className="note-container">
      <div className="saved-notes">
        {savedNotes.length > 0 ? (
          <>
            <h4>Your personal notes about this recipe</h4>
            <ul>
              {savedNotes.map((savedNote, index) => (
                <div className="note-list-container">
                  <button onClick={() => handleDeleteNote(savedNote.id)}>
                    <Trash />
                  </button>
                  <li key={index} className="saved-note-item">
                    {savedNote.content}
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

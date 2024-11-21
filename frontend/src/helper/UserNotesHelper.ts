import { Note } from "../types/Recipe";

export async function addRecipeNote(userId: string | undefined, recipeId: number | undefined, note: string): Promise<number> {
  const response = await fetch(`http://localhost:3000/api/users/${userId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId: recipeId, content: note }),
  });
  const text = await response.text();
  return Number(text);
}

export async function removeNote (userId: string|undefined, id: number) {
  console.log(userId, id)
  fetch(`http://localhost:3000/api/users/${userId}/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchNotesByUserIdAndRecipeId (userId: string|undefined, recipeId: number | undefined): Promise<Note[]> {
  const response = await fetch(`http://localhost:3000/api/users/${userId}/notes/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()
  return data.notes.map((note: Note) => ({ id: note.id, content: note.content }));
};
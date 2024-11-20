package salt.backend.service;

import org.springframework.stereotype.Service;
import salt.backend.controller.NoteDTO;
import salt.backend.model.Note;
import salt.backend.repository.NoteRepository;
import salt.backend.repository.UserFavoriteImpl;
import salt.backend.repository.UserRepository;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public int saveNote (String userId, int recipeId, String content){
        Note note = new Note();
        note.setUserId(userId);
        note.setRecipeId(recipeId);
        note.setContent(content);
        noteRepository.save(note);
        return note.getId();
    }

    public void deleteNote (int noteId){
        noteRepository.deleteById(noteId);
    }
}

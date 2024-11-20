package salt.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import salt.backend.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/")
    public ResponseEntity<Integer> saveNote(@RequestBody NoteDTO noteDTO) {
        int noteId = noteService.saveNote(noteDTO.userId(), noteDTO.recipeId(), noteDTO.content());
        return ResponseEntity.ok(noteId);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable int id){
        noteService.deleteNote(id);
    }





}

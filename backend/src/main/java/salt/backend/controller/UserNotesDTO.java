package salt.backend.controller;

import java.util.List;

public record UserNotesDTO(String userId, int recipeId, List<NoteDTO> notes) {
}

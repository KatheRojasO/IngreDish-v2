package salt.backend.repository;

import org.springframework.data.repository.CrudRepository;
import salt.backend.model.Note;

import java.util.Optional;

public interface NoteRepository extends CrudRepository<Note, Integer> {
    Optional<Note> findByUserIdAndRecipeId(String userId, int recipeId);
}

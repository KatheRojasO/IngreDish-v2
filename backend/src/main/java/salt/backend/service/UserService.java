package salt.backend.service;


import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;
import salt.backend.controller.FavoriteDTO;
import salt.backend.controller.NoteDTO;
import salt.backend.controller.UserNotesDTO;
import salt.backend.controller.UserFavoriteDTO;
import salt.backend.model.Note;
import salt.backend.model.User;
import salt.backend.model.UserFavorite;
import salt.backend.repository.NoteRepository;
import salt.backend.repository.UserFavoriteImpl;
import salt.backend.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserFavoriteImpl favRepo;

    private final UserRepository userRepo;

    private final NoteRepository noteRepo;

    public UserService(UserFavoriteImpl favRepo, UserRepository userRepo, NoteRepository noteRepo) {
        this.favRepo = favRepo;
        this.userRepo = userRepo;
        this.noteRepo = noteRepo;
    }

    public void addUser(String userId, String userName){
        Optional<User> userOptional = userRepo.findUserByUserId(userId);
        if(userOptional.isPresent()){
            throw new IllegalArgumentException("User already exists");
        }

        User user = new User();

        user.setUserId(userId);
        user.setName(userName);
        user.setFavorites(new ArrayList<>());
        user.setNotes(new ArrayList<>());

        userRepo.createOrUpdateUser(user);
    }

    public void addFavoriteToUser(String userId, FavoriteDTO favoriteDto){
        Optional<User> userOptional = userRepo.findUserByUserId(userId);
        if(userOptional.isEmpty()){
            throw new RuntimeException("No user found for id:" + userId);
        }
        User user = userOptional.get();

        boolean favoriteAlreadyExists = user.getFavorites().stream()
                .anyMatch(favorite -> favorite.getRecipeId() == favoriteDto.id());
        if (favoriteAlreadyExists){
            throw new IllegalArgumentException("favorite already exists");
        }
        UserFavorite userFav = new UserFavorite();
        userFav.setUser(user);
        userFav.setRecipeId(favoriteDto.id());
        userFav.setTitle(favoriteDto.title());
        userFav.setImage(favoriteDto.image());

        List<UserFavorite> currentFavorites = user.getFavorites();
        currentFavorites.add(userFav);
        user.setFavorites(currentFavorites);

        favRepo.addFavoriteRecipe(userFav);
        userRepo.createOrUpdateUser(user);
    }

    public UserFavoriteDTO getUserFavoritesByUserId(String userId){
        Optional<User> userOptional = userRepo.findUserByUserId(userId);
        if(userOptional.isEmpty()){
            throw new RuntimeException("No user found for id:" + userId);
        }

        User user = userOptional.get();

        List<FavoriteDTO> favorites = user.getFavorites().stream()
                .map(favorite -> new FavoriteDTO(favorite.getRecipeId(), favorite.getTitle(), favorite.getImage()))
                .toList();

        return new UserFavoriteDTO(user.getUserId(), favorites);
    }

    @Transactional
    public void deleteFavoriteForUser(String userId, int recipeId){
        Optional<User> userOptional = userRepo.findUserByUserId(userId);
        if(userOptional.isEmpty()){
            throw new RuntimeException("No user found for id:" + userId);
        }

        User user = userOptional.get();

        List<UserFavorite> favorites = user.getFavorites();
        favorites.removeIf(favorite -> recipeId == favorite.getRecipeId());
        user.setFavorites(favorites);

        userRepo.createOrUpdateUser(user);
        favRepo.deleteFavorite(userId, recipeId);
    }

    public void saveUserNote (String userId, int recipeId, String content){
        Optional<User> userOptional = userRepo.findUserByUserId(userId);
        if(userOptional.isEmpty()){
            throw new RuntimeException("No user found for id:" + userId);
        }

        User user = userOptional.get();

        Note note = new Note();
        note.setUserId(userId);
        note.setRecipeId(recipeId);
        note.setContent(content);
        noteRepo.save(note);

        List<Note> currentNotes = user.getNotes();
        currentNotes.add(note);
        user.setNotes(currentNotes);

        noteRepo.save(note);
        userRepo.createOrUpdateUser(user);
    }

    public UserNotesDTO getUserNotesByUserIdAndRecipeId(String userId, int recipeId){
        Optional<User> userOptional = userRepo.findUserByUserId(userId);
        if(userOptional.isEmpty()){
            throw new RuntimeException("No user found for id:" + userId);
        }

        User user = userOptional.get();

        List<NoteDTO> notes = user.getNotes().stream()
                .filter(note -> note.getRecipeId() == recipeId)
                .map(note -> new NoteDTO(note.getId(), note.getContent()))
                .toList();

        return new UserNotesDTO(user.getUserId(), recipeId, notes);
    }

    public void deleteUserNote (String userId, int noteId){
        noteRepo.deleteById(noteId);
    }
}

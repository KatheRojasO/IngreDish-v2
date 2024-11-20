package salt.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import salt.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addUser(@RequestBody AddUserDTO addUserDTO){
        try {
            userService.addUser(addUserDTO.userId(), addUserDTO.userName());
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User Already exists");
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/{userId}/favorites")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addFavoriteToUser(@PathVariable String userId, @RequestBody FavoriteDTO favoriteDto){

        try {
            userService.addFavoriteToUser(userId, favoriteDto);
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Recipe is already a favorite");
        } catch (RuntimeException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{userId}/favorites")
    public ResponseEntity<UserFavoriteDTO> getUserFavorites(@PathVariable String userId){
        try {
            UserFavoriteDTO userFavoriteDto = userService.getUserFavoritesByUserId(userId);
            return ResponseEntity.ok(userFavoriteDto);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{userId}/favorites/{recipeId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteUserFavorite(@PathVariable String userId, @PathVariable int recipeId){
        userService.deleteFavoriteForUser(userId, recipeId);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{userId}/notes/{recipeId}")
    public ResponseEntity<UserNotesDTO> getUserNotes(@PathVariable String userId, @PathVariable int recipeId){
        try {
            UserNotesDTO userNotesDTO = userService.getUserNotesByUserIdAndRecipeId(userId, recipeId);
            return ResponseEntity.ok(userNotesDTO);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("{userId}/notes")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void saveNote(@PathVariable String userId, @RequestBody AddNoteDTO noteDTO) {
        userService.saveUserNote(userId, noteDTO.recipeId(), noteDTO.content());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{userId}/notes/{id}")
    public void deleteNote(@PathVariable String userId, @PathVariable int id){
        userService.deleteUserNote(userId, id);
    }
}

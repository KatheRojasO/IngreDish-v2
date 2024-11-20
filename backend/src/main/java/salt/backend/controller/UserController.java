package salt.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import salt.backend.service.UserService;

@RestController
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/api/users")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addUser(@RequestBody AddUserDTO addUserDTO){
        try {
            userService.addUser(addUserDTO.userId(), addUserDTO.userName());
        } catch (IllegalArgumentException e){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User Already exists");
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/api/users/{userId}/favorites")
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
    @GetMapping("/api/users/{userId}/favorites")
    public ResponseEntity<UserFavoriteDTO> getUserFavorites(@PathVariable String userId){
        try {
            UserFavoriteDTO userFavoriteDto = userService.getUserFavoritesByUserId(userId);
            return ResponseEntity.ok(userFavoriteDto);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/api/users/{userId}/favorites/{recipeId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteUserFavorite(@PathVariable String userId, @PathVariable int recipeId){
        userService.deleteFavoriteForUser(userId, recipeId);
    }
}

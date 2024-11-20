package salt.backend.service;


import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;
import salt.backend.controller.FavoriteDTO;
import salt.backend.controller.UserFavoriteDTO;
import salt.backend.model.User;
import salt.backend.model.UserFavorite;
import salt.backend.repository.UserFavoriteImpl;
import salt.backend.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserFavoriteImpl favRepo;

    private final UserRepository userRepo;

    public UserService(UserFavoriteImpl favRepo, UserRepository userRepo) {
        this.favRepo = favRepo;
        this.userRepo = userRepo;
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
}

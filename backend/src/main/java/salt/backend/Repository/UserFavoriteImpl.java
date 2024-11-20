package salt.backend.Repository;

import org.springframework.stereotype.Repository;
import salt.backend.model.UserFavorite;

import java.util.Optional;

@Repository
public class UserFavoriteImpl {

    UserFavoriteRepository userFavRepo;

    public UserFavoriteImpl(UserFavoriteRepository userFavRepo) {
        this.userFavRepo = userFavRepo;
    }

    public UserFavorite addFavoriteRecipe(UserFavorite favoriteRecipe){ return userFavRepo.save(favoriteRecipe); }

    public Optional<UserFavorite> getFavoriteRecipes(String userId, int recipeId){
        return userFavRepo.findByUserUserIdAndRecipeId(userId, recipeId);
    }

    public void deleteFavorite(String userId, int recipeId) { userFavRepo.deleteByUserUserIdAndRecipeId(userId, recipeId); }
}

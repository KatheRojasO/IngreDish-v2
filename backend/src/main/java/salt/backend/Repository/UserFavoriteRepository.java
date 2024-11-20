package salt.backend.Repository;

import org.springframework.data.repository.ListCrudRepository;
import salt.backend.model.UserFavorite;

import java.util.Optional;

public interface UserFavoriteRepository extends ListCrudRepository<UserFavorite, Integer> {
    Optional<UserFavorite> findByUserUserIdAndRecipeId(String userId, int recipeId);

    void deleteByUserUserIdAndRecipeId(String userId, int recipeId);
}

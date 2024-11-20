package salt.backend.controller;

import java.util.List;

public record UserFavoriteDTO(String userId, List<FavoriteDTO> favoriteRecipes) {
}

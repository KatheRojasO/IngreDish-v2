package salt.backend.Repository;

import org.springframework.data.repository.ListCrudRepository;
import salt.backend.model.User;

import java.util.Optional;

public interface UserRepository extends ListCrudRepository<User, String> {
    default void createOrUpdateUser(User user) {
        save(user);
    }

    Optional<User> findUserByUserId(String userId);
}


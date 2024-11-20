package salt.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "ingredish_user")
public class User {
    @Id
    private String userId;

    private String name;

    @OneToMany
    private List<UserFavorite> favorites;

    @OneToMany
    private List<Note> notes;

    public User() {}

    public User(String userId, String name) {
        this.userId = userId;
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UserFavorite> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<UserFavorite> favorites){
        this.favorites = favorites;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes){
        this.notes = notes;
    }
}

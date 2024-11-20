package salt.backend.model;

import java.util.UUID;

public class Note {
    private int id;
    private UUID userId;
    private int recipeId;
    private String content;

    public Note() {}

    public Note(String userId, int recipeId, String name) {
        this.userId = UUID.fromString(userId);
        this.recipeId = recipeId;
        this.content = name;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

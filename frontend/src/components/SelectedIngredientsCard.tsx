import Close from "../assets/icons/Close";
import { IngredientsCardProps } from "../types/Ingredient";

export default function SelectedIngredientsCard({
  selectedIngredients,
  setSelectedIngredients,
}: IngredientsCardProps) {
  const clearSelection = () => {
    setSelectedIngredients([]);
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== ingredient));
  };

  return (
    <div className="selected-ingredients-container">
      <h3>Selected Ingredients</h3>
      <ul className="selected-ingredients-list">
        {selectedIngredients.map((ingredient) => (
          <div className="selected-ingredient">
            <button className="close-button" onClick={() => removeIngredient(ingredient)}>
              <Close />
            </button>
            <li key={ingredient}>{ingredient}</li>
          </div>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={clearSelection} className="clear-button">
          Clear
        </button>
        <button onClick={() => console.log(selectedIngredients)} className="search-button">
          Search recipe
        </button>
      </div>
    </div>
  );
}

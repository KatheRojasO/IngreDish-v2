import { Link } from "react-router-dom";
import Close from "../assets/icons/Close";
import { SelectedIngredientsProps } from "../types/Ingredient";
import TrashSmall from "../assets/icons/TrashSmall";

export function SelectedIngredientsCard({
  selectedIngredients,
  setSelectedIngredients,
}: SelectedIngredientsProps) {
  const clearSelection = () => {
    setSelectedIngredients([]);
    localStorage.removeItem("selectedIngredients");
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
              <TrashSmall />
            </button>
            <li key={ingredient}>{ingredient}</li>
          </div>
        ))}
      </ul>
      <div className="button-container">
        <button
          className="clear-button"
          onClick={clearSelection}
          disabled={selectedIngredients.length === 0}
        >
          Clear
        </button>
        <Link to="/recipes">
          <button className="search-button" disabled={selectedIngredients.length === 0}>
            Search recipe
          </button>
        </Link>
      </div>
    </div>
  );
}

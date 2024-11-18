import Close from "../assets/icons/Close";
import { IngredientsCardProps } from "../types/Ingredient";

export default function SelectedIngredientsCard({ selectedIngredients, setSelectedIngredients }: IngredientsCardProps) {
  const clearSelection = () => {
    setSelectedIngredients([]);
  };

  const removeIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== ingredient));
  };

  return (
    <div>
      <h3>Selected Ingredients</h3>
      <ul>
        {selectedIngredients.map((ingredient) => (
          <div className="selected-ingredient">
            <button className="close-button" onClick={() => removeIngredient(ingredient)}>
              <Close />
            </button>
            <li key={ingredient}>{ingredient}</li>
          </div>
        ))}
      </ul>
      <button onClick={clearSelection}>Clear</button>
      <button onClick={() => console.log(selectedIngredients)}>Submit</button>
    </div>
  );
}

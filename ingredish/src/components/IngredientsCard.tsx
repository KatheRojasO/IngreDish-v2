import { useState } from "react";
import ingredientsData from "../data/ingredients.json";

export function IngredientsCard() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const categories = Object.keys(ingredientsData) as (keyof typeof ingredientsData)[];

  const handleCheckboxChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <div>
      <h2>Ingredients</h2>
      {categories.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          {ingredientsData[category].map((ingredient) => (
            <div key={ingredient}>
              <input
                type="checkbox"
                id={ingredient}
                name={ingredient}
                onChange={() => handleCheckboxChange(ingredient)}
              />
              <label htmlFor={ingredient}>{ingredient}</label>
            </div>
          ))}
        </div>
      ))}

      <h3>Selected Ingredients</h3>
      <ul>
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <button onClick={() => setSelectedIngredients([])}>Clear</button>
      <button onClick={() => console.log(selectedIngredients)}>Submit</button>
    </div>
  );
}

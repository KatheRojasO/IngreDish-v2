import { useState } from "react";
import ingredientsData from "../data/ingredients.json";
import ChevronDown from "../assets/icons/ChevronDown";

export function IngredientsCard() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [visibleCategories, setVisibleCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const categories = Object.keys(
    ingredientsData
  ) as (keyof typeof ingredientsData)[];

  const handleCheckboxChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleCategoryVisibility = (category: string) => {
    setVisibleCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      <h2>Ingredients</h2>
      {categories.map((category) => (
        <div key={category}>
          <div
            className="card-header"
            onClick={() => toggleCategoryVisibility(category)}
          >
            <h3>{category}</h3>
            <ChevronDown />
          </div>
          <div className={`ingredients-list ${visibleCategories[category] ? "" : "hidden"}`}>
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

import { useState } from "react";
import ingredientsData from "../data/ingredients.json";
import ChevronDown from "../assets/icons/ChevronDown";
import { IngredientsCardProps } from "../types/Ingredient";

export function IngredientsCard({ selectedIngredients, setSelectedIngredients }: IngredientsCardProps) {
  const [visibleCategories, setVisibleCategories] = useState<{ [key: string]: boolean }>({});
  const categories = Object.keys(ingredientsData) as (keyof typeof ingredientsData)[];

  const handleCheckboxChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient) ? prev.filter((item) => item !== ingredient) : [...prev, ingredient]
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
        <div key={category} className="card-container">
          <div className="card-header" onClick={() => toggleCategoryVisibility(category)}>
            <h3>{category}</h3>
            <ChevronDown />
          </div>
          <div className={`ingredients-list ${visibleCategories[category] ? "" : "hidden"}`}>
            {ingredientsData[category].map((ingredient) => (
              <div key={ingredient} className="ingredient-container">
                <input
                  type="checkbox"
                  id={ingredient}
                  name={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => handleCheckboxChange(ingredient)}
                  className="ingredient-checkbox"
                />
                <label htmlFor={ingredient}>{ingredient}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

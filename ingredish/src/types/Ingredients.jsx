import ingredientsData from "../data/ingredients.json";

export const bevarages = ingredientsData.beverages.map((ingredient) => {
  return (
    <ul key={ingredient}>
      <li>{ingredient}</li>
    </ul>
  );
});

export const fruits = ingredientsData.fruits.map((ingredient) => {
  return (
    <ul key={ingredient}>
      <li>{ingredient}</li>
    </ul>
  );
});

export const vegetables = ingredientsData.vegetables.map((ingredient) => {
  return (
    <ul key={ingredient}>
      <li>{ingredient}</li>
    </ul>
  );
});

export const proteins = ingredientsData.proteins.map((ingredient) => {
  return (
    <ul key={ingredient}>
      <li>{ingredient}</li>
    </ul>
  );
});

export const dairy = ingredientsData.dairy.map((ingredient) => {
  return (
    <ul key={ingredient}>
      <li>{ingredient}</li>
    </ul>
  );
});

export const grains_and_starches = ingredientsData.grains_and_starches.map(
  (ingredient) => {
    return (
      <ul key={ingredient}>
        <li>{ingredient}</li>
      </ul>
    );
  }
);

export const spices_and_herbs = ingredientsData.spices_and_herbs.map(
  (ingredient) => {
    return (
      <ul key={ingredient}>
        <li>{ingredient}</li>
      </ul>
    );
  }
);

export const oils_and_fats = ingredientsData.grains_and_starches.map(
  (ingredient) => {
    return (
      <ul key={ingredient}>
        <li>{ingredient}</li>
      </ul>
    );
  }
);

export const sweeteners = ingredientsData.sweeteners.map((ingredient) => {
  return (
    <ul key={ingredient}>
      <li>{ingredient}</li>
    </ul>
  );
});
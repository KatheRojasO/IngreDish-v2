interface IngredientsCardProps {
  bevarages: string[];
  fruits: string[];
  vegetables: string[];
  proteins: string[];
  dairy: string[];
  grains_and_starches: string[];
  spices_and_herbs: string[];
  oils_and_fats: string[];
  sweeteners: string[];
}

export function IngredientsCard(props: IngredientsCardProps) {
  const categories = [
    { title: "Beverages", content: props.bevarages },
    { title: "Fruits", content: props.fruits },
    { title: "Vegetables", content: props.vegetables },
    { title: "Proteins", content: props.proteins },
    { title: "Dairy", content: props.dairy },
    { title: "Grains and Starches", content: props.grains_and_starches },
    { title: "Spices and Herbs", content: props.spices_and_herbs },
    { title: "Oils and Fats", content: props.oils_and_fats },
    { title: "Sweeteners", content: props.sweeteners },
  ];

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <h3>{category.title}</h3>
          {category.content}
        </div>
      ))}
    </div>
  );
}


import { bevarages, fruits, vegetables, proteins, dairy, grains_and_starches, spices_and_herbs, oils_and_fats, sweeteners } from '../types/Ingredients.jsx';


export default function IngredientsPage() {
  

  return (
    <div>
      {bevarages}
      {fruits}
      {vegetables}
      {proteins}
      {dairy}
      {grains_and_starches}
      {spices_and_herbs}
      {oils_and_fats}
      {sweeteners}
    </div>
  );
}

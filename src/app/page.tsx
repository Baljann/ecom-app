import CategoryCard from "@/components/categories/CategoryCard";
import { Category } from "@/types/product";


export default function HomePage() {
  const categories = Object.values(Category)
  return (
    <main className="pt-8 pb-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">  
      {categories.map((category) => (
        <CategoryCard
          key={category}
          category={category}
        />
      ))}
    </div>
    </main>
  );
}

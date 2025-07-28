import Link from "next/link";
import { Category } from "@/types/product";

interface CategoryCardProps {
  category: Category;
}

function getCategoryImage(category: Category): string {
  const imageMap: Record<Category, string> = {
    [Category.PENS]: "/categories/pens.jpg",
    [Category.NOTEBOOKS]: "/categories/notebooks.jpg",
    [Category.STAPLERS_STAPLES]: "/categories/staplers.jpg",
    [Category.STICKY_NOTES]: "/categories/stickynotes.jpg",
    [Category.DESK_ORGANIZERS]: "/categories/organizers.jpg",
  };

  return imageMap[category] || "/categories/pens.jpg";
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const categorySlug = category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\//g, "-");
  const imageUrl = getCategoryImage(category);

  return (
    <Link href={`/categories/${categorySlug}`}>
      <div
        className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px] h-48 cursor-pointer transition-transform duration-300 hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("${imageUrl}")`,
        }}
      >
        <div className="flex w-full items-end justify-between gap-4 p-4">
          <div className="flex-1">
            <p className="text-white tracking-light text-2xl font-bold leading-tight">
              {category}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

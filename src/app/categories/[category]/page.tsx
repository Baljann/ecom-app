import { notFound } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import { getProductsByCategory } from "@/utils/products";
import { Category } from "@/types/product";

// Преобразуем URL slug в название категории
function getCategoryFromSlug(slug: string): string {
  const categoryMap: Record<string, string> = {
    pens: "Pens",
    notebooks: "Notebooks",
    "staplers-staples": "Staplers/Staples",
    "sticky-notes": "Sticky Notes",
    "desk-organizers": "Desk Organizers",
  };

  return categoryMap[slug] || slug;
}

// Next.js автоматически передает параметры из URL
export default async function CategoryPage({
  params,
}: {
  params: { category: string }; // category из URL
}) {
  // Преобразуем slug в название категории
  const categoryName = getCategoryFromSlug(params.category);

  // Проверяем что категория существует в нашем enum
  if (!Object.values(Category).includes(categoryName as Category)) {
    notFound(); // Показываем 404 страницу
  }

  // Получаем товары из Firebase
  const products = await getProductsByCategory(categoryName as Category);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-cyan-700 mb-8">{categoryName}</h1>
      {/* Отображаем товары в сетке */}
      <ProductGrid products={products} />
    </div>
  );
}

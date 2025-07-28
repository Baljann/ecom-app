import { notFound } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import { getProductsByCategory } from "@/utils/products";
import { Category } from "@/types/product";

function getCategoryFromSlug(slug: string): string {
  const categoryMap: Record<string, string> = {
    pens: "Pens",
    notebooks: "Notebooks",
    "staplers-staples": "Staplers/Staples",
    "staplers/staples": "Staplers/Staples",
    "sticky-notes": "Sticky Notes",
    "desk-organizers": "Desk Organizers",
  };

  return categoryMap[slug] || slug;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryName = getCategoryFromSlug(params.category);

  if (!Object.values(Category).includes(categoryName as Category)) {
    notFound();
  }

  const products = await getProductsByCategory(categoryName as Category);

  return (
    <div className="py-8">
      <h1 className="tracking-light text-2xl font-bold leading-tight  text-cyan-700 mb-8">
        {categoryName}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}

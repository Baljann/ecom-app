import { getProductById } from "@/utils/products";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductForm product={product} mode="edit" />;
}

import ProductClient from "./ProductClient";

type ProductPageProps = {
  params: Promise<{ productId: string }>
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { productId } = await params;
  console.log(productId);
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!res.ok) {
    return <div>Error loading product</div>;
  }
  const product = await res.json();

  return <ProductClient product={product} />;
}

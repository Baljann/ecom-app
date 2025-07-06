import ProductClient from "./ProductClient";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  console.log(productId);
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!res.ok) {
    return <div>Error loading product</div>;
  }
  const product = await res.json();

  return <ProductClient product={product} />;
}

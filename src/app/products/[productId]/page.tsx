import ProductClient from "./ProductClient";

//vercel keeps giving this errors regardless defining interface or using inline type: //Type error: Type '{ params: { productId: string; }; }' does not satisfy the constraint 'PageProps'. //Types of property 'params' are incompatible. //Type '{ productId: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const res = await fetch(`https://dummyjson.com/products/${params.productId}`);
  if (!res.ok) {
    return <div>Error loading product</div>;
  }
  const product = await res.json();

  return <ProductClient product={product} />;
}

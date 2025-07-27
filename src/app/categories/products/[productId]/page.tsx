import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/utils/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <div className="py-8 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-100">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-cyan-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {(product.discountPercentage ?? 0) > 0 && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock} pcs
            </p>
            {product.material && (
              <p>
                <strong>Material:</strong> {product.material}
              </p>
            )}
            {product.color && (
              <p>
                <strong>Color:</strong> {product.color}
              </p>
            )}
            {product.packQuantity && (
              <p>
                <strong>Pack Quantity:</strong> {product.packQuantity}
              </p>
            )}
            {product.pageCount && (
              <p>
                <strong>Pages:</strong> {product.pageCount}
              </p>
            )}
            <p>
              <strong>Weight:</strong> {product.weight} kg
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions?.width} ×{" "}
              {product.dimensions?.height} × {product.dimensions?.depth} cm
            </p>
            <p>
              <strong>Warranty:</strong> {product.warrantyInformation}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shippingInformation}
            </p>
            <p>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
            <p>
              <strong>Availability:</strong> {product.availabilityStatus}
            </p>
            <p>
              <strong>Minimum Order:</strong> {product.minimumOrderQuantity} pcs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

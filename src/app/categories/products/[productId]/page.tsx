import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/utils/products";

export default async function ProductPage({
  params,
}: {
  params: { productId: string }; // ID товара из URL
}) {
  // Получаем товар из Firebase по ID
  const product = await getProductById(params.productId);

  // Если товар не найден - показываем 404
  if (!product) {
    notFound();
  }

  // Вычисляем цену со скидкой
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <div className="py-8">
      {/* Адаптивная сетка: 1 колонка на мобильных, 2 на десктопе */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Изображение товара */}
        <div className="relative h-96">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Информация о товаре */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Цены */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-cyan-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Дополнительные характеристики */}
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock} units
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
              <strong>Minimum Order:</strong> {product.minimumOrderQuantity}{" "}
              units
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

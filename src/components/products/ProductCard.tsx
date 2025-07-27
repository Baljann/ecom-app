import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Вычисляем цену со скидкой
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  // Получаем URL изображения (первое из массива или placeholder)
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.jpg";

  return (
    // Вся карточка - это ссылка на страницу товара
    <Link href={`/categories/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        {/* Контейнер для изображения */}
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl} // URL из Vercel Blob
            alt={product.title}
            fill // Заполняет весь контейнер
            className="object-cover rounded-t-lg"
          />
          {/* Бейдж скидки (показывается только если есть скидка) */}
          {product.discountPercentage && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              -{product.discountPercentage}%
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-cyan-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {/* Старая цена (показывается только при скидке) */}
            {product.discountPercentage && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

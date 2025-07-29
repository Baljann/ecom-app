"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/utils/products";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { productId } = await params;
        const productData = await getProductById(productId);
        if (!productData) {
          notFound();
        }
        setProduct(productData);
      } catch (error) {
        console.error("Error loading product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="py-8 pb-20">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-100 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const cartItem = cart.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.title,
        price: discountedPrice,
        thumbnail: product.images?.[0] || "/placeholder.jpg",
        stock: product.stock,
      },
      localQuantity
    );
  };

  const handleIncrease = () => {
    if (localQuantity < product.stock) {
      setLocalQuantity(localQuantity + 1);
    }
  };

  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
    }
  };

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

          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold text-cyan-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {(product.discountPercentage ?? 0) > 0 && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={handleDecrease}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-lg transition-colors"
                disabled={localQuantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 text-center min-w-[3rem] text-lg">
                {localQuantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-lg transition-colors"
                disabled={localQuantity >= product.stock}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {currentQuantity > 0 && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                <strong>In Cart:</strong> {currentQuantity} item
                {currentQuantity > 1 ? "s" : ""}
              </p>
            </div>
          )}

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

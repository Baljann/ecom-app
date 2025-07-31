"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import {
  formatPrice,
  formatPercentage,
  formatNumber,
  formatDimensions,
  formatText,
} from "@/utils/formatters";

interface SuccessPageProps {
  product: Partial<Product>;
  mode?: "create" | "edit";
}

export default function Success({
  product,
  mode = "create",
}: SuccessPageProps) {
  const router = useRouter();

  return (
    <main className="max-w-sm md:max-w-md lg:max-w-4xl mx-auto p-10 rounded-xl shadow-xl border border-gray-100 bg-white mb-20">
      <h1 className="my-8 text-3xl font-extrabold text-center text-cyan-700">
        Product {mode === "create" ? "Created" : "Updated"} Successfully!
      </h1>

      <div className="flex flex-col space-y-3 text-gray-800">
        <p>
          <span className="font-semibold text-cyan-700">Title:</span>{" "}
          {formatText(product.title)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Description:</span>{" "}
          {formatText(product.description)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Category:</span>{" "}
          {formatText(product.category)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Price:</span>{" "}
          {formatPrice(product.price)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">
            Discount Percentage:
          </span>{" "}
          {formatPercentage(product.discountPercentage)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Stock:</span>{" "}
          {formatNumber(product.stock)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Brand:</span>{" "}
          {formatText(product.brand)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Weight:</span>{" "}
          {formatText(product.weight ? `${product.weight} kg` : undefined)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Dimensions:</span>{" "}
          {formatDimensions(product.dimensions)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Warranty:</span>{" "}
          {formatText(product.warrantyInformation)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Shipping:</span>{" "}
          {formatText(product.shippingInformation)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">
            Availability Status:
          </span>{" "}
          {formatText(product.availabilityStatus)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Return Policy:</span>{" "}
          {formatText(product.returnPolicy)}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">
            Minimum Order Quantity:
          </span>{" "}
          {formatNumber(product.minimumOrderQuantity)}
        </p>
      </div>

      {product.images && product.images.length > 0 && (
        <div>
          <p className="font-semibold text-cyan-700 mt-4 mb-2">
            Product Images:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {product.images.map((imgUrl, index) => (
              <div key={index} className="relative w-full h-32">
                <Image
                  src={imgUrl}
                  alt={`Product Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 md:gap-4 flex-col lg:flex-row mt-8">
        <Button
          type="button"
          onClick={() => router.back()}
          className="w-full justify-center py-3 px-6 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
        >
          Back to Dashboard
        </Button>
        <Button
          onClick={() =>
            router.push(
              `/categories/${product.category
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/\//g, "-")}`
            )
          }
          className="w-full justify-center py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-semibold  transition"
        >
          View Products in {product.category}
        </Button>
      </div>
    </main>
  );
}

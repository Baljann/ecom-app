"use client";

import {
  Product,
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Tag,
} from "@/types/product";
import Image from "next/image";

interface SuccessPageProps {
  product: Partial<Product>;
  onGoBack: () => void;
}

export default function Success({ product, onGoBack }: SuccessPageProps) {
  return (
    <main className="max-w-sm md:max-w-md lg:max-w-3xl mx-auto my-8 p-8 rounded-2xl shadow-lg border bg-slate-50 mb-20">
      <h1 className="my-12 text-2xl font-bold text-center text-sky-950">
        Product Created Successfully!
      </h1>

      <div className="flex flex-col space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">ID:</span> {product.id}
        </p>
        <p>
          <span className="font-semibold">Title:</span> {product.title}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {product.description}
        </p>
        <p>
          <span className="font-semibold">Category:</span>
          {product.category
            ? Category[product.category as keyof typeof Category]
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Price:</span>
          {typeof product.price === "number"
            ? `$${product.price.toFixed(2)}`
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Stock:</span> {product.stock}
        </p>
        <p>
          <span className="font-semibold">Brand:</span> {product.brand}
        </p>
        <p>
          <span className="font-semibold">Weight:</span> {product.weight} kg
        </p>
        <p>
          <span className="font-semibold">Dimensions:</span>
          W: {product.dimensions?.width ?? "N/A"}cm,&nbsp; H:{" "}
          {product.dimensions?.height ?? "N/A"}cm,&nbsp; D:{" "}
          {product.dimensions?.depth ?? "N/A"}cm
        </p>
        <p>
          <span className="font-semibold">Warranty:</span>{" "}
          {product.warrantyInformation}
        </p>
        <p>
          <span className="font-semibold">Shipping:</span>{" "}
          {product.shippingInformation}
        </p>
        <p>
          {" "}
          <span className="font-semibold">Availability Status:</span>{" "}
          {product.availabilityStatus
            ? AvailabilityStatus[
                product.availabilityStatus as keyof typeof AvailabilityStatus
              ]
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Return Policy:</span>{" "}
          {product.returnPolicy
            ? ReturnPolicy[product.returnPolicy as keyof typeof ReturnPolicy]
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Minimum Order Quantity:</span>{" "}
          {product.minimumOrderQuantity}
        </p>

        {product.tags && product.tags.length > 0 && (
          <p>
            <span className="font-semibold">Tags:</span>{" "}
            {product.tags?.join(", ")}
          </p>
        )}

        {product.images && product.images.length > 0 && (
          <div>
            <p className="font-semibold mt-4 mb-2">Product Images:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.images.map((imgUrl, index) => (
                <div key={index} className="relative w-full h-32">
                  <Image
                    src={imgUrl}
                    alt={`Product Image ${index + 1}`}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="button"
          onClick={onGoBack}
          className="px-6 py-3 rounded-lg bg-sky-950 text-white font-semibold hover:bg-sky-800 transition"
        >
          Create Another Product
        </button>
      </div>
    </main>
  );
}

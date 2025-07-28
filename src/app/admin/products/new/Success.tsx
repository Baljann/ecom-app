"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface SuccessPageProps {
  product: Partial<Product>;
}

export default function Success({ product }: SuccessPageProps) {
  const router = useRouter();

  return (
    <main className="max-w-sm md:max-w-md lg:max-w-4xl mx-auto p-10 rounded-xl shadow-xl border border-gray-100 bg-white mb-20">
      <h1 className="my-8 text-3xl font-extrabold text-center text-cyan-700">
        Product Created Successfully!
      </h1>

      <div className="flex flex-col space-y-3 text-gray-800">
        <p>
          <span className="font-semibold text-cyan-700">Title:</span>{" "}
          {product.title}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Description:</span>{" "}
          {product.description}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Category:</span>
          {product.category || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Price:</span>
          {typeof product.price === "number"
            ? `$${product.price.toFixed(2)}`
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">
            Discount Percentage:
          </span>{" "}
          {typeof product.discountPercentage === "number"
            ? `${product.discountPercentage}%`
            : "0%"}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Stock:</span>{" "}
          {product.stock}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Brand:</span>{" "}
          {product.brand}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Weight:</span>{" "}
          {product.weight} kg
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Dimensions:</span>
          W: {product.dimensions?.width ?? "N/A"}cm,&nbsp; H:{" "}
          {product.dimensions?.height ?? "N/A"}cm,&nbsp; D:{" "}
          {product.dimensions?.depth ?? "N/A"}cm
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Warranty:</span>{" "}
          {product.warrantyInformation}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Shipping:</span>{" "}
          {product.shippingInformation}
        </p>
        <p>
          {" "}
          <span className="font-semibold text-cyan-700">
            Availability Status:
          </span>{" "}
          {product.availabilityStatus || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">Return Policy:</span>{" "}
          {product.returnPolicy || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-cyan-700">
            Minimum Order Quantity:
          </span>{" "}
          {product.minimumOrderQuantity}
        </p>

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
      </div>

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

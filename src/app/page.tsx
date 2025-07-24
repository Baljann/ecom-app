import React from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Product } from "@/types/product";


async function getProducts(): Promise<Product[]> {
  const productsCollectionRef = collection(db, "products");
  const productSnapshot = await getDocs(productsCollectionRef);

  return productSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...(data as Omit<Product, "id">),
      id: doc.id, 
    };
  });
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="py-4 pb-20">
      <h1 className="text-4xl font-bold text-center">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto px-6 py-4 items-stretch">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="rounded border-1 bg-sky-950 flex flex-col h-full">
              <Image
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.title || "Product image"} 
                width={300}
                height={300}
                className="bg-white w-full"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-white">
                  {product.title}
                </h2>
                <p className="text-sm font-semibold text-amber-400 mt-auto">
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

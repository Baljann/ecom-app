"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const {
    cart,
    getTotalItems,
    getTotalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container min-h-screen mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p>
          Add some products to your cart to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex items-center mb-4 border-b pb-4">
            <Image
              src={item.thumbnail}
              alt={item.name}
              width={80}
              height={80}
              className="w-20 bg-white h-20 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="font-semibold text-amber-400 ">
                Price: ${item.price}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 text-black rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 bg-gray-200 text-black rounded"
                  >
                    +
                  </button>
                </div>
                <div></div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 dark:text-white text-red-600 underline"
                  aria-label="Remove from cart"
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-right">
        <p className="text-lg">Total Items: {getTotalItems()}</p>
        <p className="text-xl font-bold text-amber-400 ">
          Total Price: ${getTotalPrice().toFixed(2)}
        </p>
      </div>
    </div>
  );
}

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import QuantityControl from "@/components/common/QuantityControl";

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
        <h1 className="tracking-light text-2xl font-bold leading-tight text-cyan-700 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-600 text-sm">
          Add some products to your cart to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="tracking-light text-2xl font-bold leading-tight text-cyan-700 mb-8">
        Your Cart
      </h1>
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
              <p className="font-semibold text-cyan-700">
                Price: ${item.price}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center mt-2">
                  <QuantityControl
                    quantity={item.quantity}
                    onIncrease={() => increaseQuantity(item.id)}
                    onDecrease={() => decreaseQuantity(item.id)}
                    size="sm"
                  />
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
        <p className="text-xl font-bold text-cyan-700 ">
          Total Price: ${getTotalPrice().toFixed(2)}
        </p>
      </div>
    </div>
  );
}

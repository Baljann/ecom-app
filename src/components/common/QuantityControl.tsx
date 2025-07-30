"use client";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity?: number;
  minQuantity?: number;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity = Infinity,
  minQuantity = 1,
  disabled = false,
  size = "md",
  className = "",
}: QuantityControlProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const isDecreaseDisabled = disabled || quantity <= minQuantity;
  const isIncreaseDisabled = disabled || quantity >= maxQuantity;

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-lg ${className}`}
    >
      <button
        onClick={onDecrease}
        className={`${
          sizeClasses[size]
        } bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-lg transition-colors ${
          isDecreaseDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDecreaseDisabled}
      >
        -
      </button>
      <span className={`${sizeClasses[size]} text-center min-w-[3rem] text-lg`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={`${
          sizeClasses[size]
        } bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-lg transition-colors ${
          isIncreaseDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isIncreaseDisabled}
      >
        +
      </button>
    </div>
  );
}

// Utility functions for formatting product data

export function formatPrice(price: number | undefined): string {
  if (typeof price === "number") {
    return `$${price.toFixed(2)}`;
  }
  return "N/A";
}

export function formatPercentage(value: number | undefined): string {
  if (typeof value === "number") {
    return `${value}%`;
  }
  return "0%";
}

export function formatNumber(value: number | undefined): string {
  if (typeof value === "number") {
    return value.toString();
  }
  return "N/A";
}

export function formatDimensions(dimensions: any): string {
  if (typeof dimensions === "object" && dimensions?.width !== undefined) {
    return `W: ${dimensions.width ?? "N/A"}cm, H: ${
      dimensions.height ?? "N/A"
    }cm, D: ${dimensions.depth ?? "N/A"}cm`;
  }
  return "N/A";
}

export function formatText(value: any): string {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }
  return value.toString();
}

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number | undefined
): number {
  if (discountPercentage && discountPercentage > 0) {
    return price * (1 - discountPercentage / 100);
  }
  return price;
}

export function getProductDisplayTitle(product: {
  brand: string;
  title: string;
}): string {
  return `${product.brand}. ${product.title}`;
}

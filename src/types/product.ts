export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage?: number;
  // rating?: number; //no need to add to schema
  stock: number;
  tags?: Tag[];
  brand: string;
  //sku: string;  no need to add to schema
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  // reviews?: Review[];  //no need to add to schema
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
}

export enum Category {
  fragrances = "fragrances",
  beauty = "beauty",
  groceries = "groceries",
  furniture = "furniture",
}

export const allCategories = Object.keys(Category);

export enum AvailabilityStatus {
  IN_STOCK = "In Stock",
  OUT_OF_STOCK = "Out of Stock",
}

export const allAvailabilityStatuses = Object.keys(AvailabilityStatus);

export enum ReturnPolicy {
  NO_RETURN = "No return policy",
  DAYS_14 = "14 days return policy",
  DAYS_7 = "7 days return policy",
  DAYS_30 = "30 days return policy",
  DAYS_60 = "60 days return policy",
  DAYS_90 = "90 days return policy",
}

export const allReturnPolicies = Object.keys(ReturnPolicy);

export enum Tag {
  FRAGRANCES = "fragrances",
  BEAUTY = "beauty",
  FURNITURE = "furniture",
  FRUITS = "fruits",
  MEAT = "meat",
  PET_SUPPLIES = "pet_supplies",
  VEGETABLES = "vegetables",
  DESSERTS = "desserts",
  DAIRY = "dairy",
  COOKING_ESSENTIALS = "cooking_essentials",
  BEVERAGES = "beverages",
  CONDIMENTS = "condiments",
  SEAFOOD = "seafood",
}

export const allTags = Object.keys(Tag);

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
}

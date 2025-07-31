import { z } from "zod";
import {
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Dimensions,
  Meta,
} from "@/types/product";

export const productSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(50).max(500),
  category: z.nativeEnum(Category),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  discountPercentage: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return undefined;
      const num = parseFloat(val);
      if (isNaN(num)) return undefined;
      if (num < 0 || num > 100)
        throw new Error("Discount percentage must be between 0 and 100");
      return num;
    }),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  brand: z.string().min(2).max(50),
  weight: z.coerce.number().min(0.01, "Weight must be positive"),
  dimensions: z.object({
    width: z.coerce.number().min(0.01, "Width must be positive"),
    height: z.coerce.number().min(0.01, "Height must be positive"),
    depth: z.coerce.number().min(0.01, "Depth must be positive"),
  }) satisfies z.ZodType<Dimensions>,
  material: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.trim() === "") return undefined;
      if (val.length < 2)
        throw new Error("Material must be at least 2 characters");
      if (val.length > 50)
        throw new Error("Material must be at most 50 characters");
      return val;
    }),
  color: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.trim() === "") return undefined;
      if (val.length < 2)
        throw new Error("Color must be at least 2 characters");
      if (val.length > 50)
        throw new Error("Color must be at most 50 characters");
      return val;
    }),
  packQuantity: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return undefined;
      const num = parseInt(val);
      if (isNaN(num) || num < 1) return undefined;
      return num;
    }),
  pageCount: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val === "") return undefined;
      const num = parseInt(val);
      if (isNaN(num) || num < 1) return undefined;
      return num;
    }),
  warrantyInformation: z.string().min(2).max(100),
  shippingInformation: z.string().min(2).max(100),
  availabilityStatus: z.nativeEnum(AvailabilityStatus),
  returnPolicy: z.nativeEnum(ReturnPolicy),
  minimumOrderQuantity: z.coerce.number().min(1, "Minimum order is 1"),
  images: z
    .array(z.string().url("Must be a valid URL"))
    .min(1, "At least one image is required"),
  meta: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
  }) satisfies z.ZodType<Meta>,
});

export const editProductSchema = productSchema;

import { z } from "zod";
import {
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Tag,
  Dimensions,
  Meta,
} from "@/types/product";

export const productSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(50).max(500),
  category: z.nativeEnum(Category),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  tags: z.array(z.nativeEnum(Tag)).optional(),
  brand: z.string().min(2).max(50),
  weight: z.coerce.number().min(0.01, "Weight must be positive"),
  dimensions: z.object({
    width: z.coerce.number().min(0.01, "Width must be positive"),
    height: z.coerce.number().min(0.01, "Height must be positive"),
    depth: z.coerce.number().min(0.01, "Depth must be positive"),
  }) satisfies z.ZodType<Dimensions>,
  material: z.string().min(2).max(50).optional(),
  color: z.string().min(2).max(50).optional(),
  packQuantity: z.coerce.number().min(1).optional(),
  pageCount: z.coerce.number().min(1).optional(),
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
    barcode: z.string(),
  }) satisfies z.ZodType<Meta>,
});

export const editProductSchema = productSchema;

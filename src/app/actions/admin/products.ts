import { z } from "zod";
import { collections, db } from "@/utils/firebase";
import {
  collection,
  // addDoc,
  setDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NewProductFormState } from "@/app/admin/products/new/page";
import {
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Tag,
  Dimensions,
  // Meta,
} from "@/types/product";
import qrcode from "qrcode";

const productSchema = z.object({
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
  warrantyInformation: z.string().min(2).max(100),
  shippingInformation: z.string().min(2).max(100),
  availabilityStatus: z.nativeEnum(AvailabilityStatus),
  returnPolicy: z.nativeEnum(ReturnPolicy),
  minimumOrderQuantity: z.coerce.number().min(1, "Minimum order is 1"),
  imageUrl: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Image URL is required"),
});

export async function AddNewProductAction(
  currentState: NewProductFormState,
  formData: FormData
): Promise<NewProductFormState> {
  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    price: formData.get("price") as string,
    discountPercentage: formData.get("discountPercentage") as string,
    stock: formData.get("stock") as string,
    tags: formData.getAll("tags") as string[],
    brand: formData.get("brand") as string,
    weight: formData.get("weight") as string,
    dimensions: {
      width: formData.get("dimensions.width") as string,
      height: formData.get("dimensions.height") as string,
      depth: formData.get("dimensions.depth") as string,
    },
    warrantyInformation: formData.get("warrantyInformation") as string,
    shippingInformation: formData.get("shippingInformation") as string,
    availabilityStatus: formData.get("availabilityStatus") as string,
    returnPolicy: formData.get("returnPolicy") as string,
    minimumOrderQuantity: formData.get("minimumOrderQuantity") as string,
    imageUrl: formData.get("imageUrl") as string,
  };

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    console.error("Failed parsing form data when adding a new product", result);
    return {
      success: false,
      message: "Please correct the form input",
      inputs: {
        title: rawData.title,
        description: rawData.description,
        category: rawData.category as Category,
        price: rawData.price ? parseFloat(rawData.price) : 0,
        discountPercentage: rawData.discountPercentage
          ? parseFloat(rawData.discountPercentage)
          : undefined,
        stock: rawData.stock ? parseFloat(rawData.stock) : 0,
        tags: (rawData.tags as Tag[]) || [],
        brand: rawData.brand || "",
        weight: rawData.weight ? parseFloat(rawData.weight) : 0,
        dimensions: {
          width: rawData.dimensions.width
            ? parseFloat(rawData.dimensions.width)
            : 0,
          height: rawData.dimensions.height
            ? parseFloat(rawData.dimensions.height)
            : 0,
          depth: rawData.dimensions.depth
            ? parseFloat(rawData.dimensions.depth)
            : 0,
        },
        warrantyInformation: rawData.warrantyInformation || "",
        shippingInformation: rawData.shippingInformation || "",
        availabilityStatus:
          (rawData.availabilityStatus as AvailabilityStatus) ||
          AvailabilityStatus.OUT_OF_STOCK,
        returnPolicy:
          (rawData.returnPolicy as ReturnPolicy) || ReturnPolicy.NO_RETURN,
        minimumOrderQuantity: rawData.minimumOrderQuantity
          ? parseFloat(rawData.minimumOrderQuantity)
          : 0,
        images: rawData.imageUrl ? [rawData.imageUrl] : [],
        thumbnail: rawData.imageUrl || "",
        meta: {
          createdAt: "",
          updatedAt: "",
          barcode: "",
          qrCode: "",
        },
        id: undefined,
      },
      errors: result.error.flatten().fieldErrors,
    };
  }

  const id = Date.now().toString();
  const dateNow = Date.now();

  try {
    const productsRef = collection(db, collections.products);
    const q = query(productsRef, where("title", "==", result.data.title));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "Product with this title already exists.",
        inputs: {
          title: rawData.title,
          description: rawData.description,
          category: rawData.category as Category,
          price: rawData.price ? parseFloat(rawData.price) : 0,
          discountPercentage: rawData.discountPercentage
            ? parseFloat(rawData.discountPercentage)
            : undefined,
          stock: rawData.stock ? parseFloat(rawData.stock) : 0,
          tags: (rawData.tags as Tag[]) || [],
          brand: rawData.brand || "",
          weight: rawData.weight ? parseFloat(rawData.weight) : 0,
          dimensions: {
            width: rawData.dimensions.width
              ? parseFloat(rawData.dimensions.width)
              : 0,
            height: rawData.dimensions.height
              ? parseFloat(rawData.dimensions.height)
              : 0,
            depth: rawData.dimensions.depth
              ? parseFloat(rawData.dimensions.depth)
              : 0,
          },
          warrantyInformation: rawData.warrantyInformation || "",
          shippingInformation: rawData.shippingInformation || "",
          availabilityStatus:
            (rawData.availabilityStatus as AvailabilityStatus) ||
            AvailabilityStatus.OUT_OF_STOCK,
          returnPolicy:
            (rawData.returnPolicy as ReturnPolicy) || ReturnPolicy.NO_RETURN,
          minimumOrderQuantity: rawData.minimumOrderQuantity
            ? parseFloat(rawData.minimumOrderQuantity)
            : 0,
          images: rawData.imageUrl ? [rawData.imageUrl] : [],
          thumbnail: rawData.imageUrl || "",
          meta: {
            createdAt: "",
            updatedAt: "",
            barcode: "",
            qrCode: "",
          },
          id: undefined,
        },
        errors: { title: ["A product with this title already exists."] },
      };
    }

    const productPageUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/products/${id}`;
    let qrCodeDataUrl: string = "";
    try {
      qrCodeDataUrl = await qrcode.toDataURL(productPageUrl);
    } catch (err) {
      console.error("Failed to generate QR code:", err);
    }

    await setDoc(doc(db, collections.products, id), {
      title: result.data.title,
      description: result.data.description,
      category: result.data.category,
      price: result.data.price,
      discountPercentage: result.data.discountPercentage,
      stock: result.data.stock,
      tags: result.data.tags || [],
      brand: result.data.brand,
      weight: result.data.weight,
      dimensions: result.data.dimensions,
      warrantyInformation: result.data.warrantyInformation,
      shippingInformation: result.data.shippingInformation,
      availabilityStatus: result.data.availabilityStatus,
      returnPolicy: result.data.returnPolicy,
      minimumOrderQuantity: result.data.minimumOrderQuantity,
      images: [result.data.imageUrl],
      thumbnail: result.data.imageUrl,
      meta: {
        createdAt: dateNow.toString(),
        updatedAt: dateNow.toString(),
        barcode: "",
        qrCode: qrCodeDataUrl,
      },
      id: id,
    });

    return {
      success: true,
      message: "The product is created successfully",
      data: {
        id: parseInt(id),
        title: result.data.title,
        description: result.data.description,
        category: result.data.category,
        price: result.data.price,
        discountPercentage: result.data.discountPercentage,
        stock: result.data.stock,
        tags: result.data.tags || [],
        brand: result.data.brand,
        weight: result.data.weight,
        dimensions: result.data.dimensions,
        warrantyInformation: result.data.warrantyInformation,
        shippingInformation: result.data.shippingInformation,
        availabilityStatus: result.data.availabilityStatus,
        returnPolicy: result.data.returnPolicy,
        minimumOrderQuantity: result.data.minimumOrderQuantity,
        images: [result.data.imageUrl],
        thumbnail: result.data.imageUrl,
        meta: {
          createdAt: dateNow.toString(),
          updatedAt: dateNow.toString(),
          barcode: "",
          qrCode: qrCodeDataUrl,
        },
      },
    };
  } catch (err) {
    console.error("Error adding a new product to Firebase", err);
    return {
      success: false,
      message: "Failed creating a new product in the database",
      inputs: {
        title: rawData.title,
        description: rawData.description,
        category: rawData.category as Category,
        price: rawData.price ? parseFloat(rawData.price) : 0,
        discountPercentage: rawData.discountPercentage
          ? parseFloat(rawData.discountPercentage)
          : undefined,
        stock: rawData.stock ? parseFloat(rawData.stock) : 0,
        tags: (rawData.tags as Tag[]) || [],
        brand: rawData.brand || "",
        weight: rawData.weight ? parseFloat(rawData.weight) : 0,
        dimensions: {
          width: rawData.dimensions.width
            ? parseFloat(rawData.dimensions.width)
            : 0,
          height: rawData.dimensions.height
            ? parseFloat(rawData.dimensions.height)
            : 0,
          depth: rawData.dimensions.depth
            ? parseFloat(rawData.dimensions.depth)
            : 0,
        },
        warrantyInformation: rawData.warrantyInformation || "",
        shippingInformation: rawData.shippingInformation || "",
        availabilityStatus:
          (rawData.availabilityStatus as AvailabilityStatus) ||
          AvailabilityStatus.OUT_OF_STOCK,
        returnPolicy:
          (rawData.returnPolicy as ReturnPolicy) || ReturnPolicy.NO_RETURN,
        minimumOrderQuantity: rawData.minimumOrderQuantity
          ? parseFloat(rawData.minimumOrderQuantity)
          : 0,
        images: rawData.imageUrl ? [rawData.imageUrl] : [],
        thumbnail: rawData.imageUrl || "",
        meta: {
          createdAt: "",
          updatedAt: "",
          barcode: "",
          qrCode: "",
        },
        id: undefined,
      },
    };
  }
}

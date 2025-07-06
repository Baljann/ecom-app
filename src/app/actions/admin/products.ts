import { NewProductFormState } from "@/app/admin/products/new/page";
import {
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Tag,
} from "@/types/product";
import { z } from "zod";
import qrcode from "qrcode";
import { db } from "@/utils/firebase";
import { collection, addDoc, setDoc } from "firebase/firestore";

const newProductSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(50).max(500),
  category: z.nativeEnum(Category),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  discountPercentage: z.coerce.number().min(0.01, "Discount must be positive"),
  stock: z.coerce.number().min(0, "Stock must be 0 or more"),
  tags: z.array(z.nativeEnum(Tag)).optional(),
  brand: z.string().min(2).max(50),
  weight: z.coerce.number().min(0.01, "Weight must be positive"),
  dimensions: z.object({
    width: z.coerce.number().min(0.01, "Width must be positive"),
    height: z.coerce.number().min(0.01, "Height must be positive"),
    depth: z.coerce.number().min(0.01, "Depth must be positive"),
  }),
  warrantyInformation: z.string().min(2).max(100),
  shippingInformation: z.string().min(2).max(100),
  availabilityStatus: z.nativeEnum(AvailabilityStatus),
  returnPolicy: z.nativeEnum(ReturnPolicy),
  minimumOrderQuantity: z.coerce.number().min(1, "Minimum order is 1"),
  meta: z
    .object({
      barcode: z.string().optional(),
      qrCode: z.string().optional(),
    })
    .optional(),
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
    availabilityStatus: formData.get("availabilityStatus") as string,
    returnPolicy: formData.get("returnPolicy") as string,
    tags: formData.getAll("tags") as string[],
  };

  const result = newProductSchema.safeParse(rawData);

  if (!result.success) {
    console.log(result);
    return {
      success: false,
      message: "Please correct the form input",
      inputs: {
        ...rawData,
        category: rawData.category as Category | undefined,
        price: rawData.price ? parseFloat(rawData.price) : undefined,
        availabilityStatus: rawData.availabilityStatus as
          | AvailabilityStatus
          | undefined,
        returnPolicy: rawData.returnPolicy as ReturnPolicy | undefined,
        tags: rawData.tags as Tag[] | undefined,
      },
      errors: result.error.flatten().fieldErrors,
    };
  } else {
    console.log(result);

    try {
      const docRef = await addDoc(collection(db, "products"), {
        ...result.data,
      });

      const productId = docRef.id;
      const productPageUrl = `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/products/${productId}`;

      let qrCodeDataUrl: string | undefined;
      try {
        qrCodeDataUrl = await qrcode.toDataURL(productPageUrl);
      } catch (err) {
        console.error("Failed to generate QR code:", err);
      }

      await setDoc(
        docRef,
        {
          ...result.data,
          meta: {
            ...result.data.meta,
            qrCode: qrCodeDataUrl,
          },
        },
        { merge: true }
      );

      console.log("Document written with ID: ", productId);

      return {
        success: true,
        message: "The product is created successfully",
      };
    } catch (e) {
      console.error("Error adding document: ", e);
      return {
        success: false,
        message: "Failed to add product",
      };
    }
  }
}

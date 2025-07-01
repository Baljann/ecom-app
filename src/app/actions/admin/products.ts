import { NewProductFormState } from "@/app/admin/products/new/page";
import {
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Tag,
} from "@/types/product";
import { z } from "zod";

const newProductSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(50).max(500),
  category: z.nativeEnum(Category),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  availabilityStatus: z.nativeEnum(AvailabilityStatus),
  returnPolicy: z.nativeEnum(ReturnPolicy),
  tags: z.array(z.nativeEnum(Tag)).optional(),
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
    // TODO: Send data to Firebase
    return {
      success: true,
      message: "The product is created successfully",
    };
  }

  console.log("Adding a new product...");
}

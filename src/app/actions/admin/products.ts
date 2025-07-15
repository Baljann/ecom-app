import { collections, db } from "@/utils/firebase";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { productSchema } from "@/validations/productSchema";
import { NewProductFormState } from "@/app/admin/products/new/page";
import {
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Tag,
} from "@/types/product";

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
    images: formData.getAll("images") as string[],
    meta: {
      createdAt: "",
      updatedAt: "",
      barcode: "",
    },
  };

  console.log("Raw data from form:", rawData);

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.error("Validation errors:", errors);

    return {
      success: false,
      message: "Please correct the form input",
      inputs: {
        title: rawData.title,
        description: rawData.description,
        category: rawData.category as Category,
        price: parseFloat(rawData.price),
        discountPercentage: rawData.discountPercentage
          ? parseFloat(rawData.discountPercentage)
          : undefined,
        stock: parseInt(rawData.stock),
        tags: (rawData.tags as Tag[]) ?? [],
        brand: rawData.brand,
        weight: parseFloat(rawData.weight),
        dimensions: {
          width: parseFloat(rawData.dimensions.width),
          height: parseFloat(rawData.dimensions.height),
          depth: parseFloat(rawData.dimensions.depth),
        },
        warrantyInformation: rawData.warrantyInformation,
        shippingInformation: rawData.shippingInformation,
        availabilityStatus: rawData.availabilityStatus as AvailabilityStatus,
        returnPolicy: rawData.returnPolicy as ReturnPolicy,
        minimumOrderQuantity: parseInt(rawData.minimumOrderQuantity),
        images: rawData.images,
        meta: rawData.meta,
        id: undefined,
      },
      errors,
    };
  }

  if (result.data.images.length === 0) {
    return {
      success: false,
      message: "At least one image is required.",
      inputs: result.data,
      errors: { images: ["At least one image is required."] },
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
        inputs: result.data,
        errors: { title: ["A product with this title already exists."] },
      };
    }

    await setDoc(doc(db, collections.products, id), {
      ...result.data,
      meta: {
        createdAt: dateNow.toString(),
        updatedAt: dateNow.toString(),
        barcode: "", // optional: add barcode logic later
      },
      id,
    });

    return {
      success: true,
      message: "The product is created successfully",
      inputs: {
        ...result.data,
        meta: {
          createdAt: dateNow.toString(),
          updatedAt: dateNow.toString(),
          barcode: "",
        },
        id: parseInt(id),
      },
    };
  } catch (err) {
    console.error("Error adding a new product to Firebase", err);

    return {
      success: false,
      message: "Failed creating a new product in the database",
      inputs: {
        ...result.data,
        meta: {
          createdAt: "",
          updatedAt: "",
          barcode: "",
        },
        id: undefined,
      },
    };
  }
}

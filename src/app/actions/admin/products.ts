import { collections, db } from "@/lib/firebase";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { del } from "@vercel/blob";
import { productSchema } from "@/validations/productSchema";
import { ProductFormState } from "@/components/admin/ProductForm";
import {
  Category,
  AvailabilityStatus,
  ReturnPolicy,
  Product,
} from "@/types/product";

function extractFormData(formData: FormData) {
  const getStringValue = (key: string) => {
    const value = formData.get(key);
    return value && value.toString().trim() !== ""
      ? value.toString()
      : undefined;
  };

  const getNumberValue = (key: string) => {
    const value = formData.get(key);
    return value && value.toString().trim() !== ""
      ? value.toString()
      : undefined;
  };

  return {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    price: formData.get("price") as string,
    stock: formData.get("stock") as string,
    tags: formData.getAll("tags") as string[],
    brand: formData.get("brand") as string,
    weight: formData.get("weight") as string,
    dimensions: {
      width: formData.get("dimensions.width") as string,
      height: formData.get("dimensions.height") as string,
      depth: formData.get("dimensions.depth") as string,
    },
    material: getStringValue("material"),
    color: getStringValue("color"),
    packQuantity: getNumberValue("packQuantity"),
    pageCount: getNumberValue("pageCount"),
    discountPercentage: getNumberValue("discountPercentage"),
    warrantyInformation: formData.get("warrantyInformation") as string,
    shippingInformation: formData.get("shippingInformation") as string,
    availabilityStatus: formData.get("availabilityStatus") as string,
    returnPolicy: formData.get("returnPolicy") as string,
    minimumOrderQuantity: formData.get("minimumOrderQuantity") as string,
    images: formData.getAll("images") as string[],
    meta: {
      createdAt: "",
      updatedAt: "",
    },
  };
}

function convertRawDataToInputs(rawData: ReturnType<typeof extractFormData>) {
  return {
    title: rawData.title,
    description: rawData.description,
    category: rawData.category as Category,
    price: parseFloat(rawData.price) || 0,
    discountPercentage: rawData.discountPercentage
      ? parseFloat(rawData.discountPercentage)
      : undefined,
    stock: parseInt(rawData.stock) || 0,
    brand: rawData.brand,
    weight: parseFloat(rawData.weight) || 0,
    dimensions: {
      width: parseFloat(rawData.dimensions.width) || 0,
      height: parseFloat(rawData.dimensions.height) || 0,
      depth: parseFloat(rawData.dimensions.depth) || 0,
    },
    material: rawData.material || undefined,
    color: rawData.color || undefined,
    packQuantity: rawData.packQuantity
      ? parseInt(rawData.packQuantity)
      : undefined,
    pageCount: rawData.pageCount ? parseInt(rawData.pageCount) : undefined,
    warrantyInformation: rawData.warrantyInformation,
    shippingInformation: rawData.shippingInformation,
    availabilityStatus: rawData.availabilityStatus as AvailabilityStatus,
    returnPolicy: rawData.returnPolicy as ReturnPolicy,
    minimumOrderQuantity: parseInt(rawData.minimumOrderQuantity) || 1,
    images: rawData.images,
    meta: rawData.meta,
    id: undefined,
  };
}

function removeUndefined(obj: any): any {
  if (obj === undefined || obj === null) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeUndefined).filter((item) => item !== undefined);
  }

  if (typeof obj === "object") {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = removeUndefined(value);
      if (cleanedValue !== undefined) {
        cleaned[key] = cleanedValue;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  return obj;
}

export async function AddNewProductAction(
  currentState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const rawData = extractFormData(formData);
  const productId = formData.get("id") as string;
  const isEditMode = !!productId;

  console.log("Raw data from form:", rawData);
  console.log("Mode:", isEditMode ? "edit" : "create");
  console.log("Product ID:", productId);

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.error("Validation errors:", errors);

    return {
      success: false,
      message: "Please correct the form input",
      inputs: convertRawDataToInputs(rawData),
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

  try {
    if (isEditMode) {
      const existingProductDoc = doc(db, collections.products, productId);
      const existingProductSnap = await getDoc(existingProductDoc);

      if (!existingProductSnap.exists()) {
        return {
          success: false,
          message: "Product not found.",
          inputs: result.data,
          errors: { id: ["Product not found"] },
        };
      }

      const existingProduct = existingProductSnap.data() as Product;
      if (existingProduct.title !== result.data.title) {
        const productsRef = collection(db, collections.products);
        const q = query(productsRef, where("title", "==", result.data.title));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          return {
            success: false,
            message: "A product with this title already exists.",
            inputs: result.data,
            errors: { title: ["A product with this title already exists."] },
          };
        }
      }

      const cleanData = removeUndefined(result.data);

      const documentData = {
        ...cleanData,
        meta: {
          createdAt: existingProduct.meta?.createdAt || serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        id: productId,
      };

      const finalData = removeUndefined(documentData);

      console.log(
        "Updating product in Firebase:",
        JSON.stringify(finalData, null, 2)
      );

      await setDoc(doc(db, collections.products, productId), finalData);

      return {
        success: true,
        message: "The product is updated successfully",
        inputs: {
          ...result.data,
          meta: {
            createdAt:
              existingProduct.meta?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          id: productId,
        },
      };
    } else {
      const id = Date.now().toString();

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

      const cleanData = removeUndefined(result.data);

      const documentData = {
        ...cleanData,
        meta: {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        id,
      };

      const finalData = removeUndefined(documentData);


      await setDoc(doc(db, collections.products, id), finalData);

      return {
        success: true,
        message: "The product is created successfully",
        inputs: {
          ...result.data,
          meta: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          id,
        },
      };
    }
  } catch (err) {
    console.error("Error saving product to Firebase", err);

    return {
      success: false,
      message: isEditMode
        ? "Failed updating the product in the database"
        : "Failed creating a new product in the database",
      inputs: {
        ...result.data,
        meta: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        id: isEditMode ? productId : undefined,
      },
    };
  }
}

async function deleteImagesFromBlob(imageUrls: string[]) {
  const deletePromises = imageUrls.map(async (url) => {
    try {
      const blobUrl = new URL(url);
      const pathname = blobUrl.pathname;

      await del(pathname);
      console.log(`Successfully deleted image: ${url}`);
    } catch (error) {
      console.error(`Failed to delete image ${url}:`, error);
      throw error;
    }
  });
  await Promise.all(deletePromises);
}

export async function DeleteProductAction(
  currentState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const productId = formData.get("id") as string;

  if (!productId) {
    return {
      success: false,
      message: "Product ID is required",
      inputs: {},
      errors: { id: ["Product ID is required"] },
    };
  }

  try {
    const productDoc = doc(db, collections.products, productId);
    const productSnap = await getDoc(productDoc);

    if (!productSnap.exists()) {
      return {
        success: false,
        message: "Product not found",
        inputs: {},
        errors: { id: ["Product not found"] },
      };
    }

    const productData = productSnap.data() as Product;
    const imageUrls = productData.images || [];

    if (imageUrls.length > 0) {
      try {
        console.log("Deleting images:", imageUrls);
        await deleteImagesFromBlob(imageUrls);
        console.log("All images deleted successfully");
      } catch (imageError) {
        console.error("Error deleting images:", imageError);
      }
    }

    await deleteDoc(productDoc);

    return {
      success: true,
      message: "Product deleted successfully",
      inputs: {},
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      message: "Failed to delete product",
      inputs: {},
    };
  }
}

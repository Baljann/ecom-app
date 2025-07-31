import { db } from "../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { Product, Category } from "@/types/product";

// Helper function to convert Firestore timestamps to plain objects
function convertTimestamps(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  }

  if (Array.isArray(data)) {
    return data.map(convertTimestamps);
  }

  if (typeof data === "object") {
    const converted: any = {};
    for (const [key, value] of Object.entries(data)) {
      converted[key] = convertTimestamps(value);
    }
    return converted;
  }

  return data;
}

// Функция получения товаров по категории
export async function getProductsByCategory(
  category: Category
): Promise<Product[]> {
  try {
    // 1. Получаем ссылку на коллекцию "products"
    const productsRef = collection(db, "products");

    // 2. Создаем запрос с фильтром по категории
    const q = query(productsRef, where("category", "==", category));

    // 3. Выполняем запрос
    const querySnapshot = await getDocs(q);

    // 4. Преобразуем данные в массив
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const rawData = doc.data();
      const convertedData = convertTimestamps(rawData);

      const product = {
        id: doc.id, // ID документа из Firebase
        ...convertedData, // Все остальные данные с конвертированными timestamp'ами
      } as Product;

      products.push(product);
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Возвращаем пустой массив при ошибке
  }
}

// Функция получения одного товара по ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productsRef = collection(db, "products");
    const productDoc = doc(productsRef, id);
    const docSnap = await getDoc(productDoc);

    if (docSnap.exists()) {
      const rawData = docSnap.data();
      const convertedData = convertTimestamps(rawData);

      return {
        id: docSnap.id,
        ...convertedData,
      } as Product;
    } else {
      return null; // Товар не найден
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Функция получения всех товаров
export async function getAllProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products");
    const querySnapshot = await getDocs(productsRef);

    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const rawData = doc.data();
      const convertedData = convertTimestamps(rawData);

      products.push({
        id: doc.id,
        ...convertedData,
      } as Product);
    });

    return products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

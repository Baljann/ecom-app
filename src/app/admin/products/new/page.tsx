"use client";

import { useForm, Controller } from "react-hook-form";
import { useActionState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AddNewProductAction } from "@/app/actions/admin/products";
import {
  Product,
  allAvailabilityStatuses,
  allReturnPolicies,
  AvailabilityStatus,
  ReturnPolicy,
  Category,
} from "@/types/product";

import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import Button from "@/components/common/Button";
import ImageUploadField from "@/components/common/ImageUploadField";
import Success from "./Success";

const initialState = {
  success: false,
  inputs: {},
  errors: {},
};

export interface NewProductFormState {
  success: boolean;
  message?: string;
  inputs?: Partial<Product>;
  errors?: {
    [K in keyof Product]?: string[];
  };
}

export default function NewProductForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<
    NewProductFormState,
    FormData
  >(AddNewProductAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<Partial<Product>>({
    defaultValues: {
      title: state?.inputs?.title ?? undefined,
      description: state?.inputs?.description ?? undefined,
      category: state?.inputs?.category ?? undefined,
      price: state?.inputs?.price ?? undefined,
      availabilityStatus: state?.inputs?.availabilityStatus ?? undefined,
      returnPolicy: state?.inputs?.returnPolicy ?? undefined,
    },
  });

  const [isTransitioning, startTransition] = useTransition();

  const onSubmit = (data: Partial<Product>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (
        key === "dimensions" &&
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        const dimensions = value as {
          width?: number;
          height?: number;
          depth?: number;
        };
        formData.append("dimensions.width", String(dimensions.width ?? 0));
        formData.append("dimensions.height", String(dimensions.height ?? 0));
        formData.append("dimensions.depth", String(dimensions.depth ?? 0));
      } else if (Array.isArray(value)) {
        value.forEach((v) => {
          formData.append(key, String(v));
        });
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    startTransition(() => {
      formAction(formData);
    });
  };

  if (isPending) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          <p className="mt-4 text-cyan-700 font-medium">Creating product...</p>
        </div>
      </div>
    );
  }

  if (state.success && state.inputs) {
    return <Success product={state.inputs} />;
  }

  return (
    <main className="max-w-sm md:max-w-md lg:max-w-4xl mx-auto p-1 bg-white mb-20">
      <h1 className="my-8 text-xl font-extrabold text-center text-cyan-700">
        Add a New Product
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Product Name"
          id="title"
          type="text"
          placeholder="e.g., Timeless Chronograph Watch"
          register={register("title", { required: "Product name is required" })}
          error={errors.title}
        />

        <InputField
          label="Description"
          id="description"
          type="textarea"
          placeholder="e.g., Elegant wristwatch with leather strap"
          register={register("description", {
            required: "Description is required",
          })}
          error={errors.description}
          rows={4}
        />

        <SelectField
          label="Category"
          id="category"
          options={Object.values(Category).map((category) => ({
            value: category,
            label: category,
          }))}
          value={watch("category") ?? ""}
          onChange={(val) => setValue("category", val as Category)}
          error={errors.category}
        />
        <input
          type="hidden"
          {...register("category", { required: "Category is required" })}
        />

        <InputField
          label="Price ($)"
          id="price"
          type="number"
          placeholder="e.g., 199.99"
          register={register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be positive" },
            valueAsNumber: true,
          })}
          error={errors.price}
          step="any"
        />

        <InputField
          label="Discount Percentage (%)"
          id="discountPercentage"
          type="number"
          placeholder="e.g., 10 (optional)"
          register={register("discountPercentage", {
            min: {
              value: 0.0,
              message: "Discount percentage cannot be negative",
            },
            valueAsNumber: true,
          })}
          error={errors.discountPercentage}
          step="any"
        />

        <InputField
          label="Stock"
          id="stock"
          type="number"
          placeholder="e.g., 100"
          register={register("stock", {
            required: "Stock is required",
            valueAsNumber: true,
          })}
          error={errors.stock}
        />

        <InputField
          label="Brand"
          id="brand"
          type="text"
          placeholder="e.g., Rolex"
          register={register("brand", { required: "Brand is required" })}
          error={errors.brand}
        />

        <InputField
          label="Weight (kg)"
          id="weight"
          type="number"
          placeholder="e.g., 100"
          register={register("weight", {
            required: "Weight is required",
            valueAsNumber: true,
          })}
          error={errors.weight}
          step="any"
        />

        <div className="grid gap-2 grid-cols-1 lg:grid-cols-3">
          <InputField
            label="Width (sm)"
            id="dimensions.width"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.width", {
              required: "Width is required",
              valueAsNumber: true,
            })}
            error={errors.dimensions?.width}
            step="any"
          />
          <InputField
            label="Height (sm)"
            id="dimensions.height"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.height", {
              required: "Height is required",
              valueAsNumber: true,
            })}
            error={errors.dimensions?.height}
            step="any"
          />

          <InputField
            label="Depth (sm)"
            id="dimensions.depth"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.depth", {
              required: "Depth is required",
              valueAsNumber: true,
            })}
            error={errors.dimensions?.depth}
            step="any"
          />
        </div>

        <InputField
          label="Material"
          id="material"
          type="text"
          placeholder="e.g., leather, plastic, metal"
          register={register("material")}
          error={errors.material}
        />

        <InputField
          label="Color"
          id="color"
          type="text"
          placeholder="e.g., black, red, blue"
          register={register("color")}
          error={errors.color}
        />

        <InputField
          label="Pack Quantity"
          id="packQuantity"
          type="number"
          placeholder="e.g., 1, 3, 10"
          register={register("packQuantity", {
            valueAsNumber: true,
          })}
          error={errors.packQuantity}
        />

        <InputField
          label="Page Count (for notebooks)"
          id="pageCount"
          type="number"
          placeholder="e.g., 80, 100, 120"
          register={register("pageCount", {
            valueAsNumber: true,
          })}
          error={errors.pageCount}
        />

        <InputField
          label="Warranty Information"
          id="warrantyInformation"
          type="string"
          placeholder="e.g., 12 month/no warranty"
          register={register("warrantyInformation", {
            required: "Warranty Information is required",
          })}
          error={errors.warrantyInformation}
        />

        <InputField
          label="Shipping Information"
          id="shippingInformation"
          type="string"
          placeholder="e.g., free shipping"
          register={register("shippingInformation", {
            required: "Shipping Information is required",
          })}
          error={errors.shippingInformation}
        />

        <SelectField
          label="Availability Status"
          id="availabilityStatus"
          options={allAvailabilityStatuses.map((statusKey) => ({
            value:
              AvailabilityStatus[statusKey as keyof typeof AvailabilityStatus],
            label:
              AvailabilityStatus[statusKey as keyof typeof AvailabilityStatus],
          }))}
          value={watch("availabilityStatus") ?? ""}
          onChange={(val) =>
            setValue("availabilityStatus", val as AvailabilityStatus)
          }
          error={errors.availabilityStatus}
        />
        <input
          type="hidden"
          {...register("availabilityStatus", {
            required: "Availability status is required",
          })}
        />

        <SelectField
          label="Return Policy"
          id="returnPolicy"
          options={allReturnPolicies.map((policyKey) => ({
            value: ReturnPolicy[policyKey as keyof typeof ReturnPolicy],
            label: ReturnPolicy[policyKey as keyof typeof ReturnPolicy],
          }))}
          value={watch("returnPolicy") ?? ""}
          onChange={(val) => setValue("returnPolicy", val as ReturnPolicy)}
          error={errors.returnPolicy}
        />
        <input
          type="hidden"
          {...register("returnPolicy", {
            required: "Return policy is required",
          })}
        />

        <InputField
          label="Minimum Order Quantity"
          id="minimumOrderQuantity"
          type="number"
          placeholder="e.g., 1"
          register={register("minimumOrderQuantity", {
            required: "Minimum order quantity is required",
            min: 1,
          })}
          error={errors.minimumOrderQuantity}
        />

        <Controller
          name="images"
          control={control}
          rules={{
            validate: (value) =>
              (value && value.length > 0) || "At least one photo is required",
          }}
          render={({ field, fieldState }) => (
            <>
              <ImageUploadField
                value={field.value || []}
                onChange={field.onChange}
              />
              {fieldState.error && (
                <p className="text-rose-600 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />

        <div className="flex md:gap-4 flex-col lg:flex-row mt-8">
          <Button
            type="button"
            onClick={() => router.back()}
            className="w-full justify-center py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-semibold transition"
          >
            Back to Dashboard
          </Button>

          <Button
            type="submit"
            disabled={isPending || isTransitioning}
            className="w-full justify-center py-3 px-6 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50"
          >
            {isPending || isTransitioning ? "Saving..." : "Create Product"}
          </Button>
        </div>
      </form>
    </main>
  );
}

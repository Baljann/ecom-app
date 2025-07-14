"use client";

import { FieldError, useForm, Controller } from "react-hook-form";
import { useActionState } from "react";
// import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  Product,
  allCategories,
  allAvailabilityStatuses,
  allReturnPolicies,
  AvailabilityStatus,
  ReturnPolicy,
  allTags,
  Tag,
  Category,
} from "@/types/product";
import { AddNewProductAction } from "@/app/actions/admin/products";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TagsCheckboxGroup from "@/components/common/TagsCheckboxGroup";
import Button from "@/components/common/Button";
import ImageUploadField from "@/components/common/ImageUploadField";

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
  data?: Product;
}

export default function NewProductForm() {
  const router = useRouter();
  const [state, formAction] = useActionState<
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
      discountPercentage: state?.inputs?.discountPercentage ?? undefined,
      stock: state?.inputs?.stock ?? undefined,
      tags: state?.inputs?.tags ?? [],
      brand: state?.inputs?.brand ?? undefined,
      weight: state?.inputs?.weight ?? undefined,
      dimensions: {
        width: state?.inputs?.dimensions?.width ?? undefined,
        height: state?.inputs?.dimensions?.height ?? undefined,
        depth: state?.inputs?.dimensions?.depth ?? undefined,
      },
      warrantyInformation: state?.inputs?.warrantyInformation ?? undefined,
      shippingInformation: state?.inputs?.shippingInformation ?? undefined,
      availabilityStatus: state?.inputs?.availabilityStatus ?? undefined,
      returnPolicy: state?.inputs?.returnPolicy ?? undefined,
      minimumOrderQuantity: state?.inputs?.minimumOrderQuantity ?? undefined,
      images: state?.inputs?.images ?? [],
      thumbnail: state?.inputs?.thumbnail ?? undefined,
    },
  });

  const [isTransitioning, startTransition] = useTransition();

  const onSubmit = (data: Partial<Product>) => {
    const formData = new FormData();

    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    formData.append("category", data.category || "");
    formData.append("price", (data.price || 0).toString());
    formData.append(
      "discountPercentage",
      (data.discountPercentage || 0).toString()
    );
    formData.append("stock", (data.stock || 0).toString());

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => formData.append("tags", tag));
    }

    formData.append("brand", data.brand || "");
    formData.append("weight", (data.weight || 0).toString());

    formData.append(
      "dimensions.width",
      (data.dimensions?.width || 0).toString()
    );
    formData.append(
      "dimensions.height",
      (data.dimensions?.height || 0).toString()
    );
    formData.append(
      "dimensions.depth",
      (data.dimensions?.depth || 0).toString()
    );

    formData.append("warrantyInformation", data.warrantyInformation || "");
    formData.append("shippingInformation", data.shippingInformation || "");
    formData.append("availabilityStatus", data.availabilityStatus || "");
    formData.append("returnPolicy", data.returnPolicy || "");
    formData.append(
      "minimumOrderQuantity",
      (data.minimumOrderQuantity || 0).toString()
    );

    if (data.images && data.images.length > 0) {
      data.images.forEach((image, index) =>
        formData.append(`images[${index}]`, image)
      );
      formData.append("thumbnail", data.images[0]);
    } else {
      formData.append("thumbnail", "");
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className="max-w-sm md:max-w-md lg:max-w-3xl mx-auto my-8 p-8 rounded-2xl shadow-lg border bg-slate-50 mb-20">
      <h1 className="my-12 text-2xl font-bold text-center text-sky-950">
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
          placeholder="e.g., Elegant wristwatch with leather strap"
          register={register("description", {
            required: "Description is required",
          })}
          error={errors.description}
        />

        <SelectField
          label="Category"
          id="category"
          options={allCategories.map((category) => ({
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
          })}
          error={errors.price}
        />

        <InputField
          label="Discount Percentage (%)"
          id="discountPercentage"
          type="number"
          placeholder="e.g., 10"
          register={register("discountPercentage", {
            required: "Discount percentage is required",
            min: {
              value: 0.01,
              message: "Discount percentage must be positive",
            },
          })}
          error={errors.discountPercentage}
        />

        <InputField
          label="Stock"
          id="stock"
          type="number"
          placeholder="e.g., 100"
          register={register("stock", { required: "Stock is required" })}
          error={errors.stock}
        />

        <TagsCheckboxGroup
          label="Tags"
          tags={allTags.map((tagKey) => ({
            value: Tag[tagKey as keyof typeof Tag],
            label: Tag[tagKey as keyof typeof Tag],
          }))}
          register={register("tags")}
          error={errors.tags as FieldError | undefined}
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
          register={register("weight", { required: "Weight is required" })}
          error={errors.weight}
        />

        <div className="flex gap-2 flex-col lg:flex-row">
          <InputField
            label="Width (sm)"
            id="dimensions.width"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.width", {
              required: "Width is required",
            })}
            error={errors.dimensions?.width}
          />
          <InputField
            label="Height (sm)"
            id="dimensions.height"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.height", {
              required: "Height is required",
            })}
            error={errors.dimensions?.height}
          />

          <InputField
            label="Depth (sm)"
            id="dimensions.depth"
            type="number"
            placeholder="e.g., 10"
            register={register("dimensions.depth", {
              required: "Depth is required",
            })}
            error={errors.dimensions?.depth}
          />
        </div>

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
          options={allAvailabilityStatuses.map((status) => ({
            value: status,
            label: status,
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
            required: "Availability Status is required",
          })}
        />

        <SelectField
          label="Return Policy"
          id="returnPolicy"
          options={allReturnPolicies.map((policy) => ({
            value: policy,
            label: policy,
          }))}
          value={watch("returnPolicy") ?? ""}
          onChange={(val) => setValue("returnPolicy", val as ReturnPolicy)}
          error={errors.returnPolicy}
        />
        <input
          type="hidden"
          {...register("returnPolicy", {
            required: "Return Policy is required",
          })}
        />

        <InputField
          label="Minimum Order Quantity"
          id="minimumOrderQuantity"
          type="number"
          placeholder="e.g., 1"
          register={register("minimumOrderQuantity", {
            required: "Minimum Order Quantity is required",
            min: {
              value: 1,
              message: "Minimum order quantity must be at least 1",
            },
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
                hintText="Upload product images. JPEG, PNG, or WEBP files are supported."
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-white hover:bg-gray-50 transition"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isTransitioning}
            className="px-6 py-3 rounded-lg bg-sky-950 text-white font-semibold hover:bg-sky-800 transition disabled:opacity-50"
          >
            {isTransitioning ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </form>
    </main>
  );
}

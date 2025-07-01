"use client";
import { FieldError, useForm } from "react-hook-form";
import {
  allCategories,
  Product,
  allAvailabilityStatuses,
  allReturnPolicies,
  AvailabilityStatus,
  ReturnPolicy,
  allTags,
  Tag,
} from "@/types/product";
import { useActionState } from "react";
import { AddNewProductAction } from "@/app/actions/admin/products";
import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
import TagsCheckboxGroup from "@/components/common/TagsCheckboxGroup";

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

export default function Admin() {
  const [state, formAction, isPending] = useActionState<
    NewProductFormState,
    FormData
  >(AddNewProductAction, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<Product>>({
    defaultValues: {
      title: state?.inputs?.title ?? undefined,
      description: state?.inputs?.description ?? undefined,
      category: state?.inputs?.category ?? undefined,
      price: state?.inputs?.price ?? undefined,
      availabilityStatus: state?.inputs?.availabilityStatus ?? undefined,
      returnPolicy: state?.inputs?.returnPolicy ?? undefined,
      tags: state?.inputs?.tags ?? [],
    },
  });

  const onSubmit = (data: Partial<Product>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) =>
          formData.append(
            key,
            typeof v === "string" || typeof v === "number"
              ? String(v)
              : String(v)
          )
        );
      } else if (value !== undefined && value !== null) {
        if (key === "price" && typeof value === "number") {
          formData.append(key, value.toString());
        } else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    formAction(formData);
  };

  if (isPending) return <p>Loading...</p>;

  return (
    <main className="max-w-md md:max-w-2xl mx-auto my-8 p-8 rounded-2xl shadow-lg border bg-slate-50 mb-20">
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
          register={register("category", { required: "Category is required" })}
          error={errors.category}
        />

        <InputField
          label="Price"
          id="price"
          type="number"
          placeholder="e.g., 199.99"
          register={register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be positive" },
          })}
          error={errors.price}
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
          register={register("availabilityStatus", {
            required: "Availability status is required",
          })}
          error={errors.availabilityStatus}
        />

        <SelectField
          label="Return Policy"
          id="returnPolicy"
          options={allReturnPolicies.map((policyKey) => ({
            value: ReturnPolicy[policyKey as keyof typeof ReturnPolicy],
            label: ReturnPolicy[policyKey as keyof typeof ReturnPolicy],
          }))}
          register={register("returnPolicy", {
            required: "Return policy is required",
          })}
          error={errors.returnPolicy}
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

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg shadow-md transition"
        >
          Create Product
        </button>
      </form>
    </main>
  );
}

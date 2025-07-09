import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface TagsCheckboxGroupProps {
  label: string;
  tags: { value: string; label: string }[];
  register: UseFormRegisterReturn;
  error?: FieldError | FieldError[] | undefined;
}

export default function TagsCheckboxGroup({
  label,
  tags,
  register,
  error,
}: TagsCheckboxGroupProps) {
  return (
    <div className="flex flex-col mb-6">
      <label className="text-sky-950 font-semibold mb-2">{label}</label>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <div
            key={tag.value}
            className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
          >
            <input
              type="checkbox"
              id={`tag-${tag.value}`}
              {...register}
              value={tag.value}
              className="mr-2 bg-slate-300 "
            />
            <label htmlFor={`tag-${tag.value}`} className="text-sky-950">
              {tag.label}
            </label>
          </div>
        ))}
      </div>
      {error &&
        (Array.isArray(error)
          ? error.find(Boolean)?.message
          : error.message) && (
          <p className="text-red-400 text-sm mt-1">
            {Array.isArray(error)
              ? error.find(Boolean)?.message
              : error.message}
          </p>
        )}
    </div>
  );
}

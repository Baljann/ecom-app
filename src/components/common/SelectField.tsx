// src/components/common/SelectField.tsx
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export default function SelectField({
  label,
  id,
  options,
  register,
  error,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-sky-950 font-semibold mb-2">
        {label}
      </label>
      <select
        id={id}
        {...register}
        className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
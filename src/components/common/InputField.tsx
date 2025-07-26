import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  step?: string;
  rows?: number;
}

export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  step,
  rows,
}: InputFieldProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="font-semibold mb-2 text-cyan-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          {...register}
          rows={rows}
          className="bg-slate-100 text-gray-800 placeholder:italic placeholder:text-gray-400 rounded-lg border border-cyan-300 px-4 py-3 focus:outline-none focus:border-cyan-500 transition"
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          {...register}
          step={step}
          className="bg-slate-100 text-gray-800 placeholder:italic placeholder:text-gray-400 rounded-lg border border-cyan-300 px-4 py-3 focus:outline-none focus:border-cyan-500 transition"
        />
      )}
      {error && <p className="text-rose-600 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

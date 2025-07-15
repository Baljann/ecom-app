import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  step?: string;
}

export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  step,
}: InputFieldProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="font-semibold mb-2 text-sky-950">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
        step={step}
        className="bg-slate-300 text-sky-950 placeholder:italic placeholder:text-slate-400 rounded-lg border border-slate-600 px-4 py-3 focus:outline-none focus:border-slate-400 transition"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

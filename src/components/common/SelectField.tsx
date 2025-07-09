import { FieldError } from "react-hook-form";
import { Listbox } from "@headlessui/react";

interface SelectFieldProps {
  label: string;
  id: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  error?: FieldError;
}

export default function SelectField({
  label,
  id,
  options,
  value,
  onChange,
  error,
}: SelectFieldProps) {
  const selected = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-sky-950 font-semibold mb-2">
        {label}
      </label>
      <Listbox value={selected.value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="bg-slate-300 text-sky-950 rounded-lg border border-slate-600 px-4 py-3 w-full text-left flex justify-between items-center">
            {value ? (
              selected.label
            ) : (
              <span className="text-slate-400">
                Select {label.toLowerCase()}
              </span>
            )}
            <svg
              className="w-4 h-4 ml-2 text-sky-950"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg">
            {options.map((opt) => (
              <Listbox.Option
                key={opt.value}
                value={opt.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? "bg-sky-100 text-sky-900" : "text-sky-950"
                  }`
                }
              >
                {opt.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

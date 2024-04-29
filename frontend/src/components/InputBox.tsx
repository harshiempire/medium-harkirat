import { ChangeEvent } from "react";

interface InputBoxPropsType {
  label: string;
  placeholder: string;
  type: string;
  value: string | undefined;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputBox({
  label,
  placeholder,
  name,
  value,
  type,
  onChange,
}: InputBoxPropsType) {
  return (
    <div className="mb-3">
      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
export default InputBox;

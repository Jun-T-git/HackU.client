import React, { ComponentPropsWithoutRef } from "react";

type Props = {
  fieldId: string;
  label: string;
  options: {
    name: string;
    value: string;
  }[];
} & ComponentPropsWithoutRef<"select">;

const SelectField: React.VFC<Props> = ({
  fieldId,
  label,
  options,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-0.5">
      <label htmlFor={`select-${fieldId}`} className="text-sm">
        {label}
      </label>
      <select
        id={`select-${fieldId}`}
        className="border-soli block min-h-[48px] w-full rounded border border-gray-300 bg-white bg-clip-padding bg-no-repeat px-4 py-2.5 text-base font-normal text-gray-700 transition ease-in-out focus:outline-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
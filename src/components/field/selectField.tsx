import React, { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Chip from "../chip";

type Props = {
  fieldId: string;
  label: string;
  options: {
    name: string;
    value: number;
  }[];
  validationMessage?: string;
  required?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<"select">;

const SelectField: React.VFC<Props> = ({
  fieldId,
  label,
  options,
  validationMessage,
  required,
  className,
  ...props
}) => {
  return (
    <div className={"flex flex-col gap-y-1 " + className}>
      <div className="flex items-center gap-x-2">
        <label htmlFor={`select-${fieldId}`} className="text-sm font-bold">
          {label}
        </label>
        {required && <Chip>必須</Chip>}
      </div>
      <select
        id={`select-${fieldId}`}
        style={{ backgroundImage: "url('/image/select.svg')" }}
        className="block min-h-[48px] w-full appearance-none rounded border border-[#dddddd] bg-[#eeeeee] bg-[length:10px_10px] bg-[right_10px_center] bg-no-repeat px-4 py-2.5 text-base font-normal text-[#222222] transition ease-in-out focus:outline-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <span className="text-sm text-red-600">{validationMessage}</span>
    </div>
  );
};

export default SelectField;

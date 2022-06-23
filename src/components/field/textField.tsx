import React, { ComponentPropsWithoutRef } from "react";
import Chip from "../chip";

type Props = {
  fieldId: string;
  label: string;
  validationMessage?: string;
  required?: boolean;
  className?;
} & ComponentPropsWithoutRef<"input">;

const TextField: React.VFC<Props> = ({
  fieldId,
  label,
  validationMessage,
  required,
  className,
  ...props
}) => {
  return (
    <div className={"flex flex-col gap-y-1 " + className}>
      <div className="flex items-center gap-x-2">
        <label htmlFor={`text-${fieldId}`} className="text-sm font-bold">
          {label}
        </label>
        {required && <Chip>必須</Chip>}
      </div>
      <input
        id={`text-${fieldId}`}
        className="block min-h-[48px] w-full appearance-none rounded border border-[#dddddd] bg-[#eeeeee] px-4 py-2.5 text-base font-normal text-[#222222] transition ease-in-out focus:outline-none"
        {...props}
      />
      <span className="text-sm text-red-600">{validationMessage}</span>
    </div>
  );
};

export default TextField;

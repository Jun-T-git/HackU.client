import React, { ComponentPropsWithoutRef } from "react";

type Props = {
  fieldId: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

const TextField: React.VFC<Props> = ({
  fieldId,
  label,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-y-0.5">
      <label htmlFor={`text-${fieldId}`} className="text-sm">
        {label}
      </label>
      <input
        id={`text-${fieldId}`}
        type='text'
        className='border-b w-full py-2 focus:outline-none focus:border-b-2 focus:border-gray-500'
        {...props}
      />
    </div>
  );
};

export default TextField;
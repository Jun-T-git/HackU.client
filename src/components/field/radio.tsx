import React, { ChangeEvent, ComponentPropsWithoutRef } from "react";

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & ComponentPropsWithoutRef<"input">;

const RadioField: React.VFC<Props> = ({
  options,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <ul className={"flex flex-col gap-y-3 " + className}>
      {options.map((option) => (
        <li
          key={`option-${option.value}`}
          className="flex items-center justify-start gap-x-3"
        >
          <input
            id={`radio-${option.value}`}
            type="radio"
            checked={value == option.value}
            onChange={onChange}
            value={option.value}
            className="h-4 w-4 rounded-full border border-[#aaaaaa]"
            {...props}
          />
          <label
            htmlFor={`radio-${option.value}`}
            className="text-sm text-[#222222]"
          >
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioField;

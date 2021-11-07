import React from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  containerClass?: string;
}
const Input: React.FC<Props> = (props) => {
  const { containerClass, className, label, ...inputProps } = props;
  return (
    <div className={`flex flex-col ${containerClass}`}>
      {label && (
        <label htmlFor={inputProps.name} className="text-sm text-black-400 ">
          {label}
        </label>
      )}

      <input
        {...inputProps}
        id={inputProps.name}
        required
        className={`${
          className || ""
        } bg-mgray-lighter rounded px-4 w-full h-12 overflow-hidden outline-none`}
      />
    </div>
  );
};

export default Input;

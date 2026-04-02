import { type ButtonHTMLAttributes, memo, type ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}

const Button = ({
  className,
  disabled,
  children,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "bg-(--background-color-button) hover:bg-(--background-color-button-hover) px-4 py-2 rounded flex items-center gap-2 transition-all duration-200",
        disabled &&
          "opacity-50 cursor-not-allowed hover:bg-(--background-color-button)",
        className,
      )}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default memo(Button);

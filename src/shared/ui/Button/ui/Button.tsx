import {type ButtonHTMLAttributes, memo, type ReactNode} from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  variant?: "default" | "small" | "menu";
}

const Button = ({
  className,
  disabled,
  children,
  variant = "default",
  ...otherProps
}: ButtonProps) => {
  const variants = {
    default:
      "px-4 py-2 transition-all duration-200 bg-(--background-color-button) hover:bg-(--background-color-button-hover)",
    small:
      "bg-(--background-color-second) hover:bg-(--background-color-second) hover:scale-115 p-0",
    menu: "text-(--text-color) w-full px-4 py-2 text-left text-sm hover:scale-105 flex items-center gap-2 transition",
  };

  return (
    <button
      type="button"
      className={clsx(
        " rounded flex items-center gap-2",
        disabled &&
          "opacity-50 cursor-not-allowed hover:bg-(--background-color-button)",
        variants[variant],
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

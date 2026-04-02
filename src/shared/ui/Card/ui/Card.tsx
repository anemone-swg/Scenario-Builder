import { type HTMLAttributes, memo, type ReactNode } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children, ...otherProps }: CardProps) => {
  return (
    <section
      className={clsx(
        "bg-(--background-color-card) hover:bg-(--background-color-card-hover) flex flex-col gap-2 px-4 py-2 rounded transition-colors w-fit mb-3",
        className,
      )}
      {...otherProps}
    >
      {children}
    </section>
  );
};

export default memo(Card);

import { ClipLoader } from "react-spinners";
import type { ComponentProps } from "react";
import clsx from "clsx";
import styles from "./Loader.module.css";

export interface LoaderProps extends ComponentProps<typeof ClipLoader> {
  className?: string;
}

const Loader = ({ className, ...otherProps }: LoaderProps) => {
  return (
    <div className={clsx(styles.loader, className)}>
      <ClipLoader size={50} color="gray" {...otherProps} />
    </div>
  );
};

export default Loader;

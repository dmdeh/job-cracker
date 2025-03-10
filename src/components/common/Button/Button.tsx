import { CSSProperties, ReactNode } from "react";
import styles from "./button.module.css";
import clsx from "clsx";

interface Props
  extends Partial<
    Pick<
      CSSProperties,
      "width" | "height" | "color" | "fontSize" | "backgroundColor"
    >
  > {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = (props: Props) => {
  const { onClick, children, className, disabled, ...style } = props;
  return (
    <button
      style={{ ...style }}
      className={clsx(styles.button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

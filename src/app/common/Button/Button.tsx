import { CSSProperties, ReactNode } from "react";
import styles from "./button.module.css";

interface Props
  extends Partial<
    Pick<
      CSSProperties,
      "width" | "height" | "color" | "fontSize" | "backgroundColor"
    >
  > {
  onClick: () => void;
  children: ReactNode;
}

const Button = (props: Props) => {
  const { onClick, children } = props;

  return (
    <button style={{ ...props }} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

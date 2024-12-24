import { ReactNode } from "react";

interface ButtonProps {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
  border?: string;
  padding?: string;
  cursor?: string;
  onClick?: () => void;
  children: ReactNode;
}

const Button = ({
  width = "200px",
  height = "",
  backgroundColor = "var(--color-background)",
  color = "black",
  fontSize = "1rem",
  borderRadius = "20px",
  border = "none",
  padding = "10px",
  cursor = "pointer",
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button
      style={{
        width,
        height,
        backgroundColor,
        color,
        fontSize,
        borderRadius,
        border,
        padding,
        cursor,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

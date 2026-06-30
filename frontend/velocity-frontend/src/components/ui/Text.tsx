import { ReactNode } from "react";
import clsx from "clsx";

type TextProps = {
  children: ReactNode;
  as?: "p" | "span";
  className?: string;
};

export default function Text({
  children,
  as: Tag = "p",
  className,
}: TextProps) {
  return (
    <Tag
      className={clsx(
        "font-sans text-base leading-relaxed text-muted",
        className
      )}
    >
      {children}
    </Tag>
  );
}
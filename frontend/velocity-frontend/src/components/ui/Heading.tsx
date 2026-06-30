import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

export default function Heading({
  children,
  as: Tag = "h2",
  className,
}: Props) {
  return (
    <Tag
      className={clsx(
        "font-display uppercase leading-none tracking-wide text-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
}
import { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element (e.g. "section", "nav"). Defaults to div. */
  as?: ElementType;
};

/**
 * Single source of truth for horizontal rhythm: centers content, caps the
 * width and applies responsive side gutters. Every section composes this so
 * the whole page shares one consistent left/right edge.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Tag>
  );
}

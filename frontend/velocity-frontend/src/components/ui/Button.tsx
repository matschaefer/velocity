import { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-95 active:scale-[0.98]",
  outline:
    "border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-surface",
  ghost: "text-muted hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-sm",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={
          rest.onClick as unknown as MouseEventHandler<HTMLAnchorElement>
        }
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}

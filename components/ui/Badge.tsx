import { cn } from "@/lib/utils";
import React from "react";

export type BadgeProps = {
  children: React.ReactNode;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  variant?: "solid" | "flat" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Badge = ({
  children,
  color = "default",
  variant = "solid",
  size = "md",
  className,
  ...props
}: BadgeProps & React.HTMLAttributes<HTMLSpanElement>) => {
  const colorStyles = {
    default: {
      solid: "bg-neutral-900 text-white",
      flat: "bg-neutral-100 text-neutral-800",
      outline: "border border-neutral-300 text-neutral-800",
    },
    primary: {
      solid: "bg-neutral-900 text-white",
      flat: "bg-neutral-100 text-neutral-900",
      outline: "border border-neutral-300 text-neutral-900",
    },
    secondary: {
      solid: "bg-neutral-700 text-white",
      flat: "bg-neutral-100 text-neutral-700",
      outline: "border border-neutral-300 text-neutral-700",
    },
    success: {
      solid: "bg-emerald-600 text-white",
      flat: "bg-emerald-50 text-emerald-700",
      outline: "border border-emerald-300 text-emerald-700",
    },
    warning: {
      solid: "bg-amber-600 text-white",
      flat: "bg-amber-50 text-amber-700",
      outline: "border border-amber-300 text-amber-700",
    },
    danger: {
      solid: "bg-red-600 text-white",
      flat: "bg-red-50 text-red-700",
      outline: "border border-red-300 text-red-700",
    },
  };

  const sizeStyles = {
    sm: "text-[11px] px-1.5 py-0.5 rounded-md font-medium",
    md: "text-xs px-2 py-1 rounded-md font-medium",
    lg: "text-sm px-2.5 py-1.5 rounded-lg font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center smooth-transition",
        colorStyles[color][variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
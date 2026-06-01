import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider leading-none",
  {
    variants: {
      variant: {
        orange: "bg-primary text-primary-foreground",
        black: "bg-foreground text-background",
        outline: "border border-foreground text-foreground bg-transparent",
      },
      size: {
        default: "px-2 py-1",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "orange",
      size: "default",
    },
  }
);

export interface SwissTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export function SwissTag({ className, variant, size, ...props }: SwissTagProps) {
  return <span className={cn(tagVariants({ variant, size }), className)} {...props} />;
}
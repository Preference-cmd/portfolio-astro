import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ number, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between border-b border-muted pb-6 mb-12 relative z-10", className)}>
      <div className="relative">
        <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-3">
          {number}
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-normal text-foreground">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-muted-foreground font-mono text-xs max-w-xs mt-4 md:mt-0 md:text-right tracking-wider">
          {subtitle}
        </p>
      )}
    </div>
  );
}
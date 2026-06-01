import * as React from "react";

interface ColorBarProps {
  leftColor?: string;
  rightColor?: string;
}

export function ColorBar({
  leftColor = "#D85A29",
  rightColor = "#000000",
}: ColorBarProps) {
  return (
    <div className="w-full flex h-4">
      <div
        className="flex-1"
        style={{ backgroundColor: leftColor }}
      />
      <div
        className="flex-1"
        style={{ backgroundColor: rightColor }}
      />
    </div>
  );
}
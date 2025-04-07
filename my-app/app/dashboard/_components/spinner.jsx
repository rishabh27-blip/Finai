import { cn } from "@/lib/utils";

/**
 * @typedef {Object} SpinnerProps
 * @property {"sm" | "md" | "lg"} [size]
 * @property {string} [className]
 */

export function Spinner({ size = "md", className }) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-b-2 border-gray-400",
        sizes[size],
        className
      )}
    />
  );
}
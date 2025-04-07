import { cn } from "@/lib/utils";
import PropTypes from 'prop-types';

function ShimmerLoader({ 
  className, 
  baseColor = "hsl(var(--background))",
  shimmerColor = "rgba(255,255,255,0.4)",
  rounded = "md"
}) {
  const roundness = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        roundness[rounded],
        className
      )}
      style={{ backgroundColor: baseColor }}
      aria-label="Loading"
      role="status"
    >
      <div 
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"
        style={{ 
          backgroundImage: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`
        }}
      />
    </div>
  );
}

ShimmerLoader.propTypes = {
  className: PropTypes.string,
  baseColor: PropTypes.string,
  shimmerColor: PropTypes.string,
  rounded: PropTypes.oneOf(["none", "sm", "md", "lg", "full"])
};

export { ShimmerLoader };
import { cn } from "@/lib/utils";
import PropTypes from 'prop-types';

function PulseLoader({ className }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-gray-200 animate-pulse",
        className
      )}
    />
  );
}

PulseLoader.propTypes = {
  className: PropTypes.string,
};

export { PulseLoader };
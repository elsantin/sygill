import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          // Light mode: visible background and border
          "bg-zinc-100 border-zinc-300 text-zinc-900 placeholder:text-zinc-500",
          // Dark mode: darker background with visible border
          "dark:bg-zinc-900/50 dark:border-zinc-700 dark:text-zinc-50 dark:placeholder:text-zinc-400",
          // Focus states with golden accent
          "focus:border-amber-500 dark:focus:border-amber-400",
          "transition-all duration-300 backdrop-blur-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

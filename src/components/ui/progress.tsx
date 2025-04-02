
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    glowColor?: string;
  }
>(({ className, value, indicatorClassName, glowColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-charcoal-dark/60 backdrop-blur-sm border border-purple-900/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 bg-gradient-to-r from-purple-600 to-purple-400 transition-all relative",
        "after:absolute after:inset-0 after:bg-[radial-gradient(40%_36%_at_50%_50%,rgba(242,252,226,0.15),transparent)]",
        indicatorClassName
      )}
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        boxShadow: glowColor ? `0 0 10px ${glowColor}` : '0 0 10px rgba(242,252,226,0.2)'
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

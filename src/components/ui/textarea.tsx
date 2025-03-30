
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-purple-400/40 bg-purple-950/60 px-3 py-2 text-sm ring-offset-background placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 font-medium transition-colors duration-200 shadow-[inset_0_1px_5px_rgba(0,0,0,0.2)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

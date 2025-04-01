
import * as React from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string
    size?: "default" | "sm"
  }
>(({ className, asChild = false, isActive, tooltip, size = "default", children, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"

  const buttonContent = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-active={isActive ? "true" : undefined}
      className={cn(
        "group relative flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 outline-none ring-sidebar-ring transition-colors duration-200 ease-linear hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
        size === "sm" && "px-1.5 py-1 text-xs",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )

  if (tooltip) {
    return (
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent 
            side="right" 
            className="z-[9999] bg-accent text-accent-foreground"
          >
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return buttonContent
})
SidebarMenuButton.displayName = "SidebarMenuButton"

import { VariantProps, cva } from "class-variance-authority"

const sidebarMenuButtonVariants = cva(
  "relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium outline-none transition-colors hover:bg-secondary/50 data-[active=true]:bg-secondary/50",
  {
    variants: {
      variant: {
        default: "",
        ghost:
          "hover:bg-transparent hover:underline data-[active=true]:bg-transparent data-[active=true]:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="menu"
        className={cn("grid w-full flex-1 items-start gap-0", className)}
        {...props}
      />
    )
  }
)
SidebarMenu.displayName = "SidebarMenu"

export interface SidebarMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarMenuItem = React.forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="menu-item"
        className={cn("w-full", className)}
        {...props}
      />
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

export { sidebarMenuButtonVariants }

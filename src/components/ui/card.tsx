
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Enhanced glass card variants with stronger 3D effects
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-blue-500/30 bg-blue-950/40 backdrop-blur-lg text-white shadow-xl relative overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/20 before:to-transparent before:rounded-xl",
      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-blue-400/20 after:to-transparent after:rounded-b-xl",
      "transform hover:translate-y-[-5px] transition-all duration-300",
      className
    )}
    style={{
      boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4), 0 10px 10px rgba(59, 130, 246, 0.2)"
    }}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

// Enhanced floating variant with more pronounced 3D effects
const FloatingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-blue-500/30 bg-blue-950/40 backdrop-blur-lg text-white shadow-xl",
      "transform hover:translate-y-[-8px] transition-all duration-300",
      "relative overflow-hidden",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/20 before:to-transparent before:rounded-xl",
      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/2 after:bg-gradient-to-t after:from-blue-400/20 after:to-transparent after:rounded-b-xl",
      className
    )}
    style={{
      boxShadow: "0 20px 30px rgba(59, 130, 246, 0.4), 0 10px 10px rgba(59, 130, 246, 0.3)",
      transform: "perspective(1000px) rotateX(2deg)",
    }}
    {...props}
  />
))
FloatingCard.displayName = "FloatingCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  GlassCard,
  FloatingCard
}

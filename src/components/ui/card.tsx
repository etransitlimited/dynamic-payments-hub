
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-tight tracking-tight text-white flex items-center", // 调整字体大小和样式
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

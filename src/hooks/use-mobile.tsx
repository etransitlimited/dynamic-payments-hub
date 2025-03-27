
import * as React from "react"

// Updated breakpoints to better target different device sizes
const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < BREAKPOINTS.md : false
  )

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }

    // Check on mount
    checkIfMobile()

    // Set up event listener for window resize
    window.addEventListener("resize", checkIfMobile)
    
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

// Additional helpful hooks for responsive design
export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isBelow, setIsBelow] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < BREAKPOINTS[breakpoint] : false
  )

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const checkBreakpoint = () => {
      setIsBelow(window.innerWidth < BREAKPOINTS[breakpoint])
    }

    // Check on mount
    checkBreakpoint()

    // Set up event listener for window resize
    window.addEventListener("resize", checkBreakpoint)
    
    return () => {
      window.removeEventListener("resize", checkBreakpoint)
    }
  }, [breakpoint])

  return isBelow
}

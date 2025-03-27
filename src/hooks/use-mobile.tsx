
import * as React from "react"

// Updated breakpoint to better accommodate iPad Mini (768px -> 820px)
const MOBILE_BREAKPOINT = 820

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
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

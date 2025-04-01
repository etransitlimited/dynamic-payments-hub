
import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { 
  SidebarContext, 
  SIDEBAR_COOKIE_NAME, 
  SIDEBAR_COOKIE_MAX_AGE, 
  SIDEBAR_KEYBOARD_SHORTCUT, 
  SIDEBAR_WIDTH, 
  SIDEBAR_WIDTH_ICON 
} from "../sidebar-types"
import { cn } from "@/lib/utils"

/**
 * Main sidebar provider component
 * Provides context and state management for the sidebar
 */
export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultState?: "expanded" | "collapsed"
    storageKey?: string
  }
>(
  (
    {
      defaultState = "expanded",
      storageKey = SIDEBAR_COOKIE_NAME,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use cookies to persist the state between page reloads.
    const [_state, _setState] = React.useState<"expanded" | "collapsed">(() => {
      // Check if we have a cookie with the state.
      if (typeof document !== "undefined") {
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${storageKey}=`))
        
        if (cookie) {
          const value = cookie.split("=")[1]
          return value === "true" ? "expanded" : "collapsed"
        }
      }
      
      return defaultState
    })
    
    const state = _state
    const setOpen = React.useCallback(
      (value: boolean) => {
        const newState = value ? "expanded" : "collapsed"
        _setState(newState)

        // Set the cookie to remember the state.
        document.cookie = `${storageKey}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [storageKey]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen(state === "collapsed")
    }, [isMobile, setOpen, state])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    const open = state === "expanded"
    
    const contextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

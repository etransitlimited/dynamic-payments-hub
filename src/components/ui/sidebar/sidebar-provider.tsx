
import * as React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { TooltipProvider } from "../tooltip"

export type SidebarState = "expanded" | "collapsed"

export interface SidebarContextValue {
  state: SidebarState
  setState: React.Dispatch<React.SetStateAction<SidebarState>>
  toggleSidebar: () => void
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  isMobile: boolean
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
)

export function SidebarProvider({
  children,
  defaultState = "expanded",
  storageKey = "ui-sidebar-state",
}: {
  children: React.ReactNode
  defaultState?: SidebarState
  storageKey?: string
}) {
  const [state, setState] = useState<SidebarState>(() => {
    try {
      const storedState = localStorage.getItem(storageKey)
      return storedState ? (storedState as SidebarState) : defaultState
    } catch (error) {
      // Fallback if localStorage is not available
      return defaultState
    }
  })
  const [openMobile, setOpenMobile] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toggleSidebar = () => {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"))
  }

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, state)
    } catch (error) {
      // Handle localStorage errors
      console.warn("Failed to save sidebar state to localStorage", error)
    }
    
    // Set data attribute on body for global styling hooks
    document.body.dataset.sidebarState = state
  }, [state, storageKey])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const contextValue = useMemo(
    () => ({
      state,
      setState,
      toggleSidebar,
      openMobile,
      setOpenMobile,
      isMobile,
    }),
    [state, openMobile, isMobile]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={100}>
        <div data-sidebar-state={state}>{children}</div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}

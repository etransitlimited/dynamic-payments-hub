
import * as React from "react"
import { SidebarContext } from "../sidebar-types"

/**
 * Hook to access the sidebar context
 * Must be used within a SidebarProvider
 */
export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

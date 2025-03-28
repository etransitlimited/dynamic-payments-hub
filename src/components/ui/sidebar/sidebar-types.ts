
import { type VariantProps } from "class-variance-authority"
import { sidebarMenuButtonVariants } from "./sidebar-menu"

// Constants
export const SIDEBAR_COOKIE_NAME = "sidebar:state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = "14rem" // Changed from 16rem to 14rem
export const SIDEBAR_WIDTH_MOBILE = "16rem"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"

// Types
export type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<any>
  variant?: VariantProps<typeof sidebarMenuButtonVariants>["variant"]
  size?: VariantProps<typeof sidebarMenuButtonVariants>["size"]
}

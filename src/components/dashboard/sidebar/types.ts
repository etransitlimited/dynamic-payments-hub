
/**
 * Base navigation item interface
 */
export interface BaseNavigationItem {
  title: string;
  icon?: React.ReactNode;
  type: "single" | "submenu";
}

/**
 * Interface for a single menu item (without submenu)
 */
export interface SingleNavigationItem extends BaseNavigationItem {
  type: "single";
  path: string;
}

/**
 * Interface for submenu items
 */
export interface SubMenuItem {
  title: string;
  path: string;
}

/**
 * Interface for a menu item with submenu
 */
export interface SubmenuNavigationItem extends BaseNavigationItem {
  type: "submenu";
  items: SubMenuItem[];
}

/**
 * Combined type for all possible navigation item types
 */
export type NavigationItem = SingleNavigationItem | SubmenuNavigationItem;

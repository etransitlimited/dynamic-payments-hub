
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the sidebar context
interface SidebarContextType {
  // Expanded/collapsed state for the entire sidebar
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
  
  // Expanded/collapsed states for individual submenu sections
  expandedSections: Record<string, boolean>;
  toggleSection: (sectionTitle: string) => void;
  isExpanded: (sectionTitle: string) => boolean;
}

// Create the context with a default value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Define props for the provider component
interface SidebarProviderProps {
  children: ReactNode;
}

// Cookie name for persisting sidebar state
const SIDEBAR_COOKIE_NAME = "dashboard:sidebar:state";
const SECTIONS_COOKIE_NAME = "dashboard:sidebar:sections";

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // State for the entire sidebar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  
  // State for individual sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Load saved state from cookies on initial render
  useEffect(() => {
    const sidebarCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith(SIDEBAR_COOKIE_NAME));
    
    if (sidebarCookie) {
      const sidebarState = sidebarCookie.split("=")[1];
      setIsSidebarExpanded(sidebarState === "expanded");
    }

    const sectionsCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith(SECTIONS_COOKIE_NAME));
    
    if (sectionsCookie) {
      try {
        const sectionsState = JSON.parse(decodeURIComponent(sectionsCookie.split("=")[1]));
        setExpandedSections(sectionsState);
      } catch (e) {
        console.error("Error parsing sidebar sections state", e);
      }
    }
  }, []);

  // Toggle the entire sidebar
  const toggleSidebar = () => {
    const newState = !isSidebarExpanded;
    setIsSidebarExpanded(newState);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState ? "expanded" : "collapsed"}; path=/; max-age=31536000`;
  };

  // Toggle a specific section
  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => {
      const newSections = {
        ...prev,
        [sectionTitle]: !prev[sectionTitle]
      };
      
      // Save to cookie
      const sectionsJson = encodeURIComponent(JSON.stringify(newSections));
      document.cookie = `${SECTIONS_COOKIE_NAME}=${sectionsJson}; path=/; max-age=31536000`;
      
      return newSections;
    });
  };

  // Check if a section is expanded
  const isExpanded = (sectionTitle: string) => {
    // Default to true if not in state
    return expandedSections[sectionTitle] !== false;
  };

  // Provide context value
  const value = {
    isSidebarExpanded,
    toggleSidebar,
    expandedSections,
    toggleSection,
    isExpanded
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

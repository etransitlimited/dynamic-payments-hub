
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "@/components/providers/AppProviders";
import RouteComponents from "@/components/routing/RouteComponents";

/**
 * Main application component
 * Provides the application with routing and global providers
 */
function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <RouteComponents />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;

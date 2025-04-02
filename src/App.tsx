
import React from "react";
import AppProviders from "@/components/providers/AppProviders";
import RouteComponents from "@/components/routing/RouteComponents";

function App() {
  console.log("App component rendering");
  return (
    <AppProviders>
      <RouteComponents />
    </AppProviders>
  );
}

export default App;

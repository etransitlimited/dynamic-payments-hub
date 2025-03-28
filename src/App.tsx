
import React from "react";
import AppProviders from "@/components/providers/AppProviders";
import RouteComponents from "@/components/routing/RouteComponents";
import HreflangTags from "@/components/seo/HreflangTags";

function App() {
  return (
    <AppProviders>
      <HreflangTags />
      <RouteComponents />
    </AppProviders>
  );
}

export default App;

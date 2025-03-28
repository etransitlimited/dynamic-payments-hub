
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

interface TabsComponentProps {
  defaultValue: string;
  tabs: TabItem[];
  listClassName?: string;
  onChange?: (value: string) => void;
}

const TabsComponent = ({ defaultValue, tabs, listClassName, onChange }: TabsComponentProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  useEffect(() => {
    console.log(`TabsComponent initialized with tab: ${activeTab}`);
  }, []);
  
  const handleTabChange = (value: string) => {
    console.log(`TabsComponent changing to: ${value}`);
    setActiveTab(value);
    if (onChange) {
      onChange(value);
    }
  };
  
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={handleTabChange} 
      className="w-full"
    >
      <TabsList className={listClassName}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value}
            className={tab.className}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsComponent;

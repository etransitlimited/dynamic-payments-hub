
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
  value?: string;
}

const TabsComponent = ({ 
  defaultValue, 
  tabs, 
  listClassName, 
  onChange,
  value: controlledValue 
}: TabsComponentProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  // Use either controlled or uncontrolled value
  const activeTab = controlledValue !== undefined ? controlledValue : internalValue;
  
  useEffect(() => {
    console.log(`TabsComponent initialized with tab: ${activeTab}`);
  }, []);
  
  useEffect(() => {
    if (controlledValue !== undefined) {
      console.log(`TabsComponent received new controlled value: ${controlledValue}`);
    }
  }, [controlledValue]);
  
  const handleTabChange = (value: string) => {
    console.log(`TabsComponent changing to: ${value}`);
    
    // Always update internal state
    setInternalValue(value);
    
    // Call onChange handler if provided
    if (onChange) {
      onChange(value);
    }
  };
  
  return (
    <Tabs 
      defaultValue={defaultValue}
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
        <TabsContent key={tab.value} value={tab.value} forceMount={false}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsComponent;

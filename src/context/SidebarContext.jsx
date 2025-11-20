/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggleSidebar() {
    console.log("sidebar-toggle-clicked");
    setIsSidebarOpen((prev) => !prev);
  }

  function close() {
    setIsSidebarOpen(false);
  }

  console.log("context-isLargeOpen", "isSidebarOpen->", isSidebarOpen);
  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) {
    throw new Error("Can not use out side of sidebar provider");
  } else {
    return value;
  }
}

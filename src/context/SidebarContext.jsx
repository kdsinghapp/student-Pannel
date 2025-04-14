/* eslint-disable react/prop-types */
import { createContext,  useContext, useState } from "react"

const SidebarContext = createContext(null);

export function SidebarProvider({children}){
    const [isSidebarOpen,setIsSidebarOpen] =useState(true);
    // const [isSmallOpen,setIsSmallOpen] =useState(false);
    function isScreenSmall(){
        return window.innerWidth<1024
    };
    function toggleSidebar(){
        console.log("sidebar-toggle-clicked")
        if(isScreenSmall()){
            setIsSidebarOpen(prev=>!prev);
            // setIsLargeOpen(false)
        }
    }
    function close(){
        if(isScreenSmall()){
            setIsSidebarOpen(false)
        }else{
            setIsLargeOpen(false)
        }
    }
    console.log("context-isLargeOpen","isSidebarOpen->",isSidebarOpen)
    return <SidebarContext.Provider value={{
        isSidebarOpen,toggleSidebar,close
    }}>
        {children}
    </SidebarContext.Provider>
}

export function useSidebarContext(){
    const value = useContext(SidebarContext);
    if(value ==null){
        throw new Error("Can not use out side of sidebar provider");
        
    }else{
        return value;
    }
}
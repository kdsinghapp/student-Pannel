/* eslint-disable react/prop-types */
import { createContext,  useContext, useState } from "react"

const SidebarContext = createContext(null);

export function SidebarProvider({children}){
    const [isLargeOpen,setIsLargeOpen] =useState(true);
    const [isSmallOpen,setIsSmallOpen] =useState(false);
    function isScreenSmall(){
        return window.innerWidth<1024
    };
    function toggle(){
        console.log("sidebar-toggle-clicked")
        if(isScreenSmall()){
            setIsSmallOpen(prev=>!prev);
            // setIsLargeOpen(false)
        }else{
            setIsLargeOpen(prev=>!prev);
            
        }
    }
    function close(){
        if(isScreenSmall()){
            setIsSmallOpen(false)
        }else{
            setIsLargeOpen(false)
        }
    }
    console.log("context-isLargeOpen",isLargeOpen,"isSmallOpen->",isSmallOpen)
    return <SidebarContext.Provider value={{
        isLargeOpen,isSmallOpen,toggle,close
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
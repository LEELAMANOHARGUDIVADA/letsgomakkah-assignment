import { createContext, useState } from "react";

export const ActiveComponentContext = createContext();

export function ActiveComponentProvider({children}){
    const [activeComponent, setActiveComponent] = useState("Home");

    return (
        <ActiveComponentContext.Provider value={{ activeComponent,setActiveComponent }}>
            {children}
        </ActiveComponentContext.Provider>
    )
}

export default ActiveComponentContext;
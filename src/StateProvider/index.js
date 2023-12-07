import React, { createContext, useState, useContext } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <StateContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useSearchTerm mst be used within a StateProvider")
    }
    return context;
}
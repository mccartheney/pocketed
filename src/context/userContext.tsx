import React, { createContext, useContext } from "react";
import userType from "@/types/userType";

// define the user context type
interface UserContextType {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

// define the user context
const UserContext = createContext<UserContextType | undefined>(undefined);

// define the user provider
export const UserProvider = ({ children, value }: { children: React.ReactNode, value: UserContextType }) => {
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// define the use user hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

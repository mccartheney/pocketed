import React, { createContext, useContext } from "react";
import userType from "@/types/userType";

interface UserContextType {
    user: userType | null;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, value }: { children: React.ReactNode, value: UserContextType }) => {
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

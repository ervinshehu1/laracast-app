import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: (email, password) => {
                    //communicate with BE
                    setUser('Andre');
                },
                logout: () => {
                    setUser(null);
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
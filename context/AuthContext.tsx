"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    user: { name: string } | null;
    login: (name: string) => void;
    logout: () => void;
    showLoginModal: boolean;
    setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        // Load state from local storage on initial render
        const storedUser = localStorage.getItem("sowan_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
            }
        }
    }, []);

    const login = (name: string) => {
        const newUser = { name };
        setUser(newUser);
        localStorage.setItem("sowan_user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("sowan_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, showLoginModal, setShowLoginModal }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

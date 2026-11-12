import { createContext, useContext, useEffect, useState, } from "react";

import { authService } from "../API/AuthService";
import { sessionService } from "../API/SessionService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isInitializing, setIsInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        async function restoreSession() {
            try {
                let session = sessionService.getSession();

                if (!session) {
                    return;
                }

                if (sessionService.isExpired(session)) {
                    session = await sessionService.refreshSession();
                }

                if (!session) {
                    sessionService.clearSession();
                    return;
                }

                const currentUser = await authService.getUser();

                const currentRole = await authService.getRole(
                    currentUser.id
                );

                setUser(currentUser);
                setRole(currentRole);

            } catch (error) {
                sessionService.clearSession();
                setUser(null);
                setRole(null);
            } finally {
                setIsInitializing(false);
            }
        }

        restoreSession();
    }, []);

    async function login(email, password) {
        const session = await authService.login(email, password);

        localStorage.setItem("auth", JSON.stringify(session));

        try {
            const currentRole = await authService.getRole(
                session.user.id
            );

            setUser(session.user);
            setRole(currentRole);

            return session.user;
        } catch (error) {
            localStorage.removeItem("auth");
            throw error;
        }
    }

    async function register(email, password) {
    const session = await authService.register(email, password);

    if (!session.access_token || !session.user) {
        throw new Error("Registration did not return a session.");
    }

    sessionService.saveSession(session);

    const currentRole = await authService.getRole(session.user.id);

    setUser(session.user);
    setRole(currentRole);

    return session.user;
    }

    async function logout() {
        try {
            await authService.logout();
        } finally {
            localStorage.removeItem("auth");
            setUser(null);
            setRole(null);
        }
    }

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                isAuthenticated,
                isInitializing,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}

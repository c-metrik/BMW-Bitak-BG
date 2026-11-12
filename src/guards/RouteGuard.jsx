import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function RouteGuard() {
    const { isAuthenticated, isInitializing } = useAuth();

    if (isInitializing) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
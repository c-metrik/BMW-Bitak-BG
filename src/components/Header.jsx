
import { NavLink, Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

export function Header() {
    const { user, role, isAuthenticated, loading, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <header className="header">
            <h1>
                <Link className="header__brand" to="/">
                    <img
                        className="header__logo"
                        src="/src/assets/images/bmw-logo.png"
                        alt="BMW Logo"
                    />
                    BMW <span>Битак</span>
                </Link>
            </h1>

            <nav>
                <ul>
                    <li>
                        <NavLink to="/catalog" className={({ isActive }) => isActive ? "header_active" : ""}>
                            Всички обяви
                        </NavLink>
                    </li>

                    {!loading && (
                        isAuthenticated ? (
                            <>
                                <li>
                                    <NavLink to="/cars/create" className={({ isActive }) => isActive ? "header_active" : ""}>
                                        Публикувай обява
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/profile" className={({ isActive }) => isActive ? "header_active" : ""}>
                                        Профил
                                    </NavLink>
                                </li>

                                <li>
                                    <span>{user.email}</span>
                                </li>

                                <li>
                                    <button className="header_logout" type="button" onClick={handleLogout}>
                                        Излез
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/register" className={({ isActive }) => isActive ? "header_active" : ""}>
                                        Регистрирай се
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/login" className={({ isActive }) => isActive ? "header_active" : ""}>
                                        Влез
                                    </NavLink>
                                </li>
                            </>
                        )
                    )}
                </ul>
            </nav>
        </header>
    );
}

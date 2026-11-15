
import { NavLink, Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

import bmwLogo from "../assets/images/bmw-logo.png";

export function Header() {
    const { user, role, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            alert(`Възникна проблем при излизане: ${error.message}`);
        }
    }

    return (
        <header className="header">
            <h1>
                <Link className="header__brand" to="/">
                    <img
                        className="header__logo"
                        src={bmwLogo}
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

                    {isAuthenticated ? (
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
                                <div className="user">{user.email}</div>
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
                    }
                </ul>
            </nav>
        </header>
    );
}

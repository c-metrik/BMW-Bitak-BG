import { NavLink } from "react-router";
import { Link } from "react-router";
import "./Header.css";

export function Header() {
    return (
        <header className="header">
            <h1>
                <Link className="header__brand" to="/">
                <img className="header__logo" src="/src/assets/images/bmw-logo.png" alt="BMW Logo" />BMW 
                <span>Битак</span>
                </Link>
            </h1>
            <nav >
                <ul>
                    <li><NavLink to="/catalog" className={({ isActive }) => isActive ? "header_active" : ""}>Всички обяви</NavLink></li>
                    <li><NavLink to="/cars/create" className={({ isActive }) => isActive ? "header_active" : ""}>Публикувай обява</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => isActive ? "header_active" : ""}>Регистрация</NavLink></li>
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? "header_active" : ""}>Влизане</NavLink></li>
                    <li><NavLink to="/logout" className={({ isActive }) => isActive ? "header_active" : ""}>Излизане</NavLink></li>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? "header_active" : ""}>Профил</NavLink></li>
                </ul>
            </nav>
        </header>
    )
};


import { NavLink } from "react-router";
import { Link } from "react-router";
import "./Header.css";

export function Header() {
    return (
        <header className="bmw-header">
            <h1>
                <Link className="bmw-header__brand" to="/">
                <img className="bmw-header__logo" src="/src/assets/images/bmw-logo.png" alt="BMW Logo" />BMW 
                <span>Битак</span>
                </Link>
            </h1>
            <nav aria-label="Основна навигация">
                <ul>
                    <li><NavLink to="/catalog" className={({ isActive }) => isActive ? "bmw-header__action" : ""}>Всички обяви</NavLink></li>
                    <li><NavLink to="/cars/create" className={({ isActive }) => isActive ? "bmw-header__action" : ""}>Публикувай обява</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => isActive ? "bmw-header__action" : ""}>Регистрация</NavLink></li>
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? "bmw-header__action" : ""}>Влизане</NavLink></li>
                    <li><NavLink to="/logout" className={({ isActive }) => isActive ? "bmw-header__action" : ""}>Излизане</NavLink></li>
                    <li><NavLink to="/profile" className={({ isActive }) => isActive ? "bmw-header__action" : ""}>Профил</NavLink></li>
                </ul>
            </nav>
        </header>
    )
};


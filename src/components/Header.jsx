import { Link } from "react-router";


export function Header() {
    return (
        <header>
            <h1>BMW Битак</h1>
            <nav>
                <ul>
                    <li><Link to="/">Главна страница</Link></li>
                    <li><Link to="/catalog">Каталог</Link></li>
                    <li><Link to="/cars/create">Създаване на обява</Link></li>
                    <li><Link to="/register">Регистрация</Link></li>
                    <li><Link to="/login">Влизане</Link></li>
                    <li><Link to="/logout">Излизане</Link></li>
                    <li><Link to="/profile">Профил</Link></li>
                </ul>
            </nav>
        </header>
    )
};
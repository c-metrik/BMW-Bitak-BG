import { Link } from "react-router"
import "./Profile.css"

export function Profile() {
    return (
        <main className="profile-page">
            <article className="profile-card">
                <header className="profile-card__header">
                    <div className="profile-card__avatar" aria-hidden="true">В</div>
                    <div className="profile-card__identity">
                        <p className="profile-card__eyebrow">BMW Битак</p>
                        <h1>Васил Василев</h1>
                        <p>Информацията за акаунта ви ще се показва тук.</p>
                    </div>
                </header>

                <div className="profile-card__details">
                    <section className="profile-card__detail">
                        <h2>Данни за контакт</h2>
                        <p>Все още няма добавени данни за контакт.</p>
                    </section>
                    <section className="profile-card__detail">
                        <h2>Моите обяви</h2>
                        <p>Все още нямате публикувани обяви.</p>
                    </section>
                </div>

                <footer className="profile-card__actions">
                    <Link className="profile-card__button profile-card__button--primary" to="/cars/create">
                        Създай обява
                    </Link>
                    <Link className="profile-card__button profile-card__button--secondary" to="/catalog">
                        Разгледай каталога
                    </Link>
                </footer>
            </article>
        </main>
    )
}

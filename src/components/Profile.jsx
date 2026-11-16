import { Link } from "react-router"
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { api } from "../API/Requester";
import { CarCardGrid } from "./CarCardGrid"
import "./Profile.css"

export function Profile() {
    const { user } = useAuth();
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
    if (!user?.id) return;

    async function loadMyCars() {

        try {
            const result = await api.cars.getByOwner(user.id);
            setCars(result);
        } catch {
            setError("Неуспешно зареждане на вашите обяви.");
        } finally {
            setIsLoading(false);
        }
    }

    loadMyCars();
    }, [user?.id]);

        
    return (
        <main className="profile-page">
            <article className="profile-card">
                <header className="profile-card__header">
                    <div className="profile-card__avatar" aria-hidden="true">{user?.email?.[0]?.toUpperCase() ?? "?"}</div>
                    <div className="profile-card__identity">
                        <p className="profile-card__eyebrow">BMW Битак</p>
                        <h1>{user?.email}</h1>
                    </div>
                </header>

                <footer className="profile-card__actions">
                    <Link className="profile-card__button profile-card__button--primary" to="/cars/create">
                        Създай обява
                    </Link>
                    <Link className="profile-card__button profile-card__button--secondary" to="/catalog">
                        Разгледай каталога
                    </Link>
                </footer>
            </article>
            <section className="profile-card__listings">
                    {cars.length > 0 && <h2>Вашите обяви</h2>}

                    {!error && (
                                isLoading
                                    ? <p>Зареждане на обявите...</p>
                                    : cars.length > 0
                                        ? <CarCardGrid cars={cars} />
                                        : <p>Нямате публикувани обяви.</p>
                    )}
            </section>
        </main>
    )
}

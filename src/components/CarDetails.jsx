import "./CarDetails.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { CarComments } from "./CarComments";
import { api } from "../API/Requester";
import { useAuth } from "../contexts/AuthContext";

export function CarDetails() {
    const { user } = useAuth();
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
    async function loadCar() {
        setIsLoading(true);
        setError("");
        setCar(null);

        try {
            const result = await api.cars.getById(carId);
            setCar(result[0] || null);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    loadCar();
    }, [carId]);


    if (isLoading) {
    return <main><p>Зареждане на обявата...</p></main>;
    }

    if (error) {
        return <main><p role="alert">{error}</p></main>;
    }

    if (!car) {
        return <main><p>Обявата не е намерена.</p></main>;
    }

    const isOwner = Boolean(user && car.owner_id === user.id);


    async function handleDelete() {
    if (!isOwner) return;

    const confirmed = window.confirm(
        "Сигурни ли сте, че искате да изтриете тази обява?"
    );

    if (!confirmed) return;

    try {
        await api.cars.remove(car.id);

        alert("Обявата беше изтрита успешно!");

        navigate("/catalog");
    } catch (err) {
        alert(`Грешка при изтриване: ${err.message}`);
    }
    }

    return (
        <main>
            <div className="single-card full-card">
                <div className="details-container">
                    <div className="description-container">
                        <h1>Детайли за автомобила:</h1>

                        <h3>{car.trim}</h3>
                        <p>Година: {car.year}</p>
                        <p>Цвят: {car.color}</p>
                        <p>Гориво: {car.fuel_type}</p>
                        <p>Скоростна кутия: {car.transmission}</p>
                        <p>Мощност: {car.power} к.с.</p>
                        <p>Цена: {Number(car.price).toLocaleString("bg-BG")} EUR</p>
                        <p>Телефон: {car.phone}</p>
                        <p>Местоположение: {car.location}</p>
                        <p>Описание: {car.description}</p>
                    </div>

                    {isOwner && (
                    <div className="button-container">
                    <Link to={`/cars/${car.id}/edit`} className="edit-button">Редактирай</Link>
                    <button type="button" className="edit-button" onClick={handleDelete}>Изтрий</button>
                    </div>
                    )}
                </div>

                <div className="image-container">
                    <img
                        src={car.photos?.[0] || "/placeholder.jpg"}
                        alt={car.trim || "BMW"}
                    />
                </div>
            </div>

            <section className="car-details-comments">
                <CarComments carId={car.id} />
            </section>
        </main>
    );
};

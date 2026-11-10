
import { useEffect, useState } from "react";
import { CarCard } from "./CarCard";
import { api } from "../API/Requester";
import "./Catalog.css";

export function Catalog() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCars() {
            try {
                const result = await api.cars.getAll();
                setCars(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadCars();
    }, []);

    if (loading) return <p>Зареждане на обявите...</p>;
    if (error) return <p>Грешка: {error}</p>;

    return (
        <main>
            <div className="full-card-grid">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>
        </main>
    );
};
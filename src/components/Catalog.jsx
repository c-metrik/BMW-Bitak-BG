
import { useEffect, useState } from "react";
import { CarCard } from "./CarCard";
import { api } from "../API/Requester";
import "./Catalog.css";

export function Catalog() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function loadCars() {
        setIsLoading(true);

        try {
            const result = await api.cars.getLatest();
            setCars(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    loadCars();
    }, []);

    return (
        <main>
            {error ? (
                <p role="alert">{error}</p>
            ) : isLoading ? (
                <p>Зареждане на обявите...</p>
            ) : cars.length === 0 ? (
                <p>Все още няма публикувани обяви.</p>
            ) : (
                <div className="full-card-grid">
                    {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </main>
        );
};

import { useEffect, useState } from "react";
import { CarCard } from "./CarCard";
import { api } from "../API/Requester";
import "./Catalog.css";

export function Catalog() {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadCars() {
            try {
                const result = await api.cars.getLatest();
                setCars(result);
            } catch (err) {
                setError(err.message);
            };
        }

        loadCars();
    }, []);

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
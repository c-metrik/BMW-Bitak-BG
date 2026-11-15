import { Link } from "react-router"
import "./Home.css"
import { CarCardGrid } from "./CarCardGrid"
import { api } from "../API/Requester";
import { useEffect, useState } from "react";

export function Home() {

    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);

        async function loadCars() {
            try {
                const result = await api.cars.getLatestSix();
                setCars(result);
            } catch (error) {
                setError("Неуспешно зареждане на обявите.");
            } finally{
                setIsLoading(false);
            } 
        };

        loadCars();
    }, []);

    return (
        <main>
            <section className="home">
                <div className="welcome-intro">
                    <h2>Всички BMW обяви, на едно място.</h2>
                    <p className="welcome-description">
                        Публикувай обява бързо и лесно или открий своя следващ автомобил
                        сред BMW предложенията на общността.
                    </p>
                </div>

                {error ? (
                    <p role="alert">{error}</p>
                    ) : isLoading ? (
                        <p>Зареждане на обявите...</p>
                    ) : cars.length === 0 ? (
                        <p>Все още няма публикувани обяви.</p>
                    ) : (
                        <CarCardGrid cars={cars} />
                )}
            </section>
        </main>
    )
};
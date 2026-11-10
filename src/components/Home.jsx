import { Link } from "react-router"
import "./Home.css"
import { CarCardGrid } from "./CarCardGrid"
import { api } from "../API/Requester";
import { useEffect, useState } from "react";

export function Home() {

    const [cars, setCars] = useState([]);

    useEffect(() => {
        async function loadCars() {
            try {
                const result = await api.cars.getAll();
                setCars(result.slice(0, 6));
            } catch (error) {
                console.error("Failed to load cars:", error);
            }
        }

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

                <CarCardGrid cars={cars} />

            </section>
        </main>
    )
};
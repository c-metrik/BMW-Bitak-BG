import { Link } from "react-router"
import "./Home.css"
import { CarCard } from "./CarCard"

export function Home() {
    return (
            <section className="home">
                <div className="welcome-intro">
                    <h2>Всички BMW обяви, на едно място.</h2>
                    <p className="welcome-description">
                        Публикувай обява бързо и лесно или открий своя следващ автомобил
                        сред BMW предложенията на общността.
                    </p>
                </div>

                <div className="car-card-grid">
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />
                </div>
            </section>
    )
};
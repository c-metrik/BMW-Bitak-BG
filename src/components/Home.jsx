import { Link } from "react-router"
import "./Home.css"
import { CarCardGrid } from "./CarCardGrid"


export function Home() {
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

                    <CarCardGrid />

                </section>
            </main>
    )
};
import "./CarCard.css";
import { Link } from "react-router";

export function CarCard({ car }) {
    return (
        <Link className="single-card" to={`/cars/${car.id}`}>
            <div className="description-container">
                <h3>{car.trim}</h3>
                <p>Година: {car.year}</p>
                <p>
                    Цена: {Number(car.price).toLocaleString("bg-BG")} EUR
                </p>
            </div>

            <img
                src={car.photos?.[0] || "/placeholder.jpg"}
                alt={car.trim || "BMW"}
            />
        </Link>
    );
};

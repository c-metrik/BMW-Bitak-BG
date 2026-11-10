import { CarCard } from "./CarCard";
import "./CarCardGrid.css"

export function CarCardGrid({ cars = [] }) {
    return (
        <div className="car-card-grid">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
};

import { CarCard } from "./CarCard"
import "./CarCard.css"

export function CarCardGrid () {
    return (
        <div className="car-card-grid">
            {Array.from({ length: 6 }, (_, index) => (
                <CarCard key={`featured-${index + 1}`} carId={`featured-${index + 1}`} />
            ))}
        </div>
    )
};

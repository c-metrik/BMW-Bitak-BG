import { CarCard } from "./CarCard"
import "./Catalog.css"

export function Catalog() {
    return (
        <>
            <main>
                <div className="full-card-grid">
                    {Array.from({ length: 21 }, (_, index) => (
                        <CarCard key={`catalog-${index + 1}`} carId={`catalog-${index + 1}`} />
                    ))}
                </div>
            </main>
        </>
    )
};

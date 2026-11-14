import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { api } from "../API/Requester";
import { useAuth } from "../contexts/AuthContext";
import { CarCreate } from "./CarCreate";

export function CarEdit() {
    const { carId } = useParams()
    const { user } = useAuth();
    const [car, setCar] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    async function loadCar() {
        try {
            const result = await api.cars.getById(carId);
            setCar(result[0] ?? null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
        }

    loadCar();
    }, [carId]);

    if (isLoading) {
    return <p>Зареждане...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    if (!car) {
        return <p>Обявата не е намерена.</p>;
    }

    if (!user || car.owner_id !== user.id) {
        return <p>Нямате право да редактирате тази обява.</p>;
    }
    
    return (<CarCreate key={car.id} initialData={car}/>);
}

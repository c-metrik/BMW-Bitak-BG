import { useParams } from "react-router"

export function CarDetails() {
    const { carId } = useParams()

    return (
        <main>
            <h1>Детайли за автомобила</h1>
            <p>Обява: {carId}</p>
        </main>
    )
}

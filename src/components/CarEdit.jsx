import { useParams } from "react-router"

export function CarEdit() {
    const { carId } = useParams()

    return (
        <main>
            <h1>Редактирай обява</h1>
            <p>Актуализирай обява: {carId}</p>
        </main>
    )
}

import "./CarCard.css"
import { Link } from "react-router"

export function CarCard({ carId }) {
    return (
        <Link className="single-card" to={`/cars/${carId}`}>
            <div className="description-container">
                <h3>BMW 325 x-drive</h3>
                <p>Година: 2020</p>
                <p>Цена: 25,000 EUR</p>
            </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqQQwSkUJK13KmcsFQiqog5d7glQlpgNzAza8qjq9OJgTa5IsEQaF_dI&s=10" alt="" />
        </Link>
    )
};

import "./CarDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Comment } from "./Comment";
import { api } from "../API/Requester";

export function CarDetails() {
    const { carId } = useParams();

    const [car, setCar] = useState(null);
    const [error, setError] = useState("");
    const [comments, setComments] = useState([
        { id: 1, author: "Иван", text: "Автомобилът изглежда много добре." },
        { id: 2, author: "Мария", text: "Има ли сервизна история?" },
        { id: 3, author: "Петър", text: "Може ли да се види през уикенда?" },
    ]);
    const [newAuthor, setNewAuthor] = useState("");
    const [newComment, setNewComment] = useState("");

    useEffect(() => {

        async function loadCar() {
            try {
                const result = await api.cars.getById(carId);
                setCar(result[0] || null);
            } catch (error) {
                setError(error.message);
            }
        }

        loadCar();

    }, [carId]);

    function addComment(event) {
        event.preventDefault();

        const author = newAuthor.trim();
        const text = newComment.trim();

        if (!author || !text) return;

        setComments((current) => [
            ...current,
            { id: Date.now(), author, text },
        ]);

        setNewAuthor("");
        setNewComment("");
    }

    if (error) {
        return <main><p role="alert">{error}</p></main>;
    }

    if (!car) {
        return <p>Зареждане на обявата...</p>;
    }

    return (
        <main>
            <div className="single-card full-card">
                <div className="details-container">
                    <div className="description-container">
                        <h1>Детайли за автомобила:</h1>

                        <h3>{car.trim}</h3>
                        <p>Година: {car.year}</p>
                        <p>Цвят: {car.color}</p>
                        <p>Гориво: {car.fuel_type}</p>
                        <p>Скоростна кутия: {car.transmission}</p>
                        <p>Мощност: {car.power} к.с.</p>
                        <p>Цена: {Number(car.price).toLocaleString("bg-BG")} EUR</p>
                        <p>Телефон: {car.phone}</p>
                        <p>Местоположение: {car.location}</p>
                        <p>Описание: {car.description}</p>
                    </div>

                    <div className="button-container">
                        <button>Редактирай</button>
                        <button>Изтрий</button>
                    </div>
                </div>

                <div className="image-container">
                    <img
                        src={car.photos?.[0] || "/placeholder.jpg"}
                        alt={car.trim || "BMW"}
                    />
                </div>
            </div>

            <section className="car-details-comments">
                <form
                    className="car-details-comment-form"
                    onSubmit={addComment}
                >
                    <label className="car-details-comment-field">
                        <textarea
                            value={newComment}
                            onChange={(event) =>
                                setNewComment(event.target.value)
                            }
                            maxLength={1000}
                            required
                        />
                    </label>

                    <button
                        className="car-details-comment-submit"
                        type="submit"
                    >
                        Добави коментар
                    </button>
                </form>

                <div className="car-details-comment-list">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            author={comment.author}
                            text={comment.text}
                            onDelete={() =>
                                setComments((current) =>
                                    current.filter(
                                        ({ id }) => id !== comment.id
                                    )
                                )
                            }
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

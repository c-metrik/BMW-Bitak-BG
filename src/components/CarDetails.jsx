import { useState } from "react"
import "./CarDetails.css"
import { useParams } from "react-router"
import { Comment } from "./Comment"

export function CarDetails() {
    const { carId } = useParams()
    const [comments, setComments] = useState([
        { id: 1, author: "Иван", text: "Автомобилът изглежда много добре." },
        { id: 2, author: "Мария", text: "Има ли сервизна история?" },
        { id: 3, author: "Петър", text: "Може ли да се види през уикенда?" },
    ])
    const [newAuthor, setNewAuthor] = useState("")
    const [newComment, setNewComment] = useState("")

    function addComment(event) {
        event.preventDefault()

        const author = newAuthor.trim()
        const text = newComment.trim()
        if (!author || !text) return

        setComments((current) => [
            ...current,
            { id: Date.now(), author, text },
        ])
        setNewAuthor("")
        setNewComment("")
    }

    return (
        <main>
            <div className="single-card full-card">
                <div className="details-container">
                    <div className="description-container">
                        <h1>Детайли за автомобила:</h1>
                        <h3>BMW 325 x-drive</h3>
                        <p>Година: 2020</p>
                        <p>Цвят: Син</p>
                        <p>Гориво: Бензин</p>
                        <p>Скоростна кутия: Ръчна</p>
                        <p>Мощност: 306 к.с.</p>
                        <p>Телефон: 0877776817</p>
                        <p>Местоположение: София</p>
                        <p>Описание: няма</p>
                    </div>
                    <div className="button-container">
                        <button>Редактирай</button>
                        <button>Изтрий</button>
                    </div>
                </div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbgQlZF3UFPAzpgWH_bU-s-9fz1KNNo3VUgZUXUMsVmQ&s=10" alt="" />
            </div>
            <section className="car-details-comments">
                <form className="car-details-comment-form" onSubmit={addComment}>
                    <label className="car-details-comment-field">
                        <textarea
                            value={newComment}
                            onChange={(event) => setNewComment(event.target.value)}
                            maxLength={1000}
                            required
                        />
                    </label>
                    <button className="car-details-comment-submit" type="submit">
                        Добави коментар
                    </button>
                </form>
                <div className="car-details-comment-list">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            author={comment.author}
                            text={comment.text}
                            onDelete={() => setComments((current) => current.filter(({ id }) => id !== comment.id))}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
};

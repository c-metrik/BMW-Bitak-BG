import { useEffect, useState } from "react";
import { api } from "../API/Requester";
import { Comment } from "./Comment";
import { useAuth } from "../contexts/AuthContext";

export function CarComments({ carId }) {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadComments() {
            try {
                const result = await api.comments.getByCarId(carId);
                setComments(result);
            } catch (err) {
                setError(err.message);
            }
        }

        loadComments();
    }, [carId]);


    async function handleAddComment() {
    if (!user || !newComment.trim()) return;

    try {
        const commentData = {
            car_id: carId,
            author_id: user.id,
            author_name: user.email,
            content: newComment.trim(),
        }

        const createdComments = await api.comments.create(commentData);

        setComments(prev => [...prev, createdComments[0]]);
        setNewComment("");
        setError("");
    } catch (err) {
        setError(err.message);
    }
    }


    async function handleEditComment(commentId, updatedText) {
        await api.comments.update(commentId, {content: updatedText,
        })

    setComments(prev =>
        prev.map(comment =>
            comment.id === commentId
                ? { ...comment, content: updatedText }
                : comment
        )
    )
    }

    async function handleDeleteComment(commentId) {

    const confirmed = window.confirm("Сигурни ли сте, че искате да изтриете този коментар?");

    if (!confirmed) return;   

    try {
        await api.comments.remove(commentId);

        setComments(prev =>
            prev.filter(comment => comment.id !== commentId)
        );

        setError("");
    } catch (err) {
        setError(err.message);
    }
    }

    return (
        <section className="car-comments">
            <h2>Коментари</h2>

            {user && (
                <div className="car-details-comment-form">
                    <label className="car-details-comment-field">
                        <textarea
                            value={newComment}
                            onChange={(event) => setNewComment(event.target.value)}
                            placeholder="Напишете коментар..."
                        />
                    </label>

                    <button
                        className="car-details-comment-submit"
                        type="button"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                    >
                        Публикувай коментар
                    </button>
                </div>
            )}

            {error && <p role="alert">{error}</p>}

            {comments.length > 0
                ? comments.map(comment => (
                    <Comment
                        key={comment.id}
                        author={comment.author_name ?? "Потребител"}
                        text={comment.content}
                        onEdit={(updatedText) => handleEditComment(comment.id, updatedText)}
                        onDelete={() => handleDeleteComment(comment.id)}
                        canManage={user?.id === comment.author_id}
                    />
                ))
                : !error && <p>Все още няма коментари.</p>
            }
        </section>
    );
}
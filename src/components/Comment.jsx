import { useState } from "react"
import "./Comment.css"

export function Comment({ author, text, onDelete }) {
    const [commentText, setCommentText] = useState(text)
    const [draft, setDraft] = useState(text)
    const [isEditing, setIsEditing] = useState(false)

    function startEditing() {
        setDraft(commentText)
        setIsEditing(true)
    }

    function saveEdit() {
        setCommentText(draft.trim())
        setIsEditing(false)
    }

    function cancelEdit() {
        setDraft(commentText)
        setIsEditing(false)
    }

    return (
        <article className="comment">
            <header className="comment-header">
                <h3 className="comment-author">{author}</h3>
                <div className="comment-actions">
                    {isEditing ?
                        (
                            <>
                                <button className="comment-button comment-button--save" type="button" onClick={saveEdit} disabled={!draft.trim()}>
                                    Запази
                                </button>
                                <button className="comment-button" type="button" onClick={cancelEdit}>
                                    Отказ
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="comment-button" type="button" onClick={startEditing}>
                                    Редактирай
                                </button>
                                <button className="comment-button comment-button--delete" type="button" onClick={onDelete}>
                                    Изтрий
                                </button>
                            </>
                        )
                    }
                </div>
            </header>
            {isEditing ?
                (
                    <label className="comment-edit-label">
                        Редактиране на коментара
                        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} />
                    </label>
                ) : (
                    <p className="comment-text">{commentText}</p>
                )
            }
        </article>
    )
}

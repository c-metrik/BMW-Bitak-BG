import "./CarCard.css"

export function CarCard() {
    return (
        <article className="single-card">
            <div className="description-container">
                <h3>BMW 325 x-drive</h3>
                <p>Година: 2020</p>
                <p>Цена: 25,000 EUR</p>
            </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiDTGN-Xx0O-b0_zE88S8UfLhOVXAqeaxSr5lG9P3nyA&s=10" alt="" />
        </article>
    )
};


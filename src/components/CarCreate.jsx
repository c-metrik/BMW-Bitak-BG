import "./Forms.css"


export function CarCreate() {
    return (
        <main>
            <form className="car-form">
                <section className="car-form__section" aria-labelledby="car-details-heading">
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Версия
                            <input name="trim" type="text" placeholder="Напр. 320d xDrive" />
                        </label>
                        <label className="car-form__field">
                            Година
                            <input name="year" type="number" min="1950" max={new Date().getFullYear()} placeholder="2020" required />
                        </label>
                        <label className="car-form__field">
                            Цвят
                            <input name="color" type="text" placeholder="Напр. Черен металик" />
                        </label>
                    </div>
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Гориво
                            <select name="fuelType" defaultValue="" required>
                                <option value="" disabled>Изберете гориво</option>
                                <option value="petrol">Бензин</option>
                                <option value="diesel">Дизел</option>
                                <option value="electric">Електричество</option>
                                <option value="hybrid">Хибрид</option>
                                <option value="lpg">Газ / бензин</option>
                                <option value="other">Керосин</option>
                            </select>
                        </label>
                        <label className="car-form__field">
                            Скоростна кутия
                            <select name="transmission" defaultValue="" required>
                                <option value="" disabled>Изберете ск. кутия</option>
                                <option value="manual">Ръчна</option>
                                <option value="automatic">Автоматична</option>
                            </select>
                        </label>
                        <label className="car-form__field">
                            Мощност (к.с.)
                            <input name="power" type="number" min="1" step="1" placeholder="190" />
                        </label>
                    </div>
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Цена (€)
                            <input name="price" type="number" min="1" step="1" placeholder="25000" required />
                        </label>
                        <label className="car-form__field">
                            Телефон
                            <input name="phone" type="tel" autoComplete="tel" placeholder="+359 ..." required />
                        </label>
                        <label className="car-form__field">
                            Местоположение
                            <input name="location" type="text" placeholder="Град" required />
                        </label>
                    </div>
                    <div className="car-form__grid car-form__grid--single">
                        <label className="car-form__field">
                            Описание
                            <textarea name="description" rows="3" placeholder="Опишете състоянието, оборудването и историята на автомобила." required />
                        </label>
                        <label className="car-form__field">
                            Снимки на автомобила
                            <input name="photos" type="file" accept="image/*" multiple />
                            <span className="car-form__hint">Можете да изберете няколко снимки.</span>
                        </label>
                    </div>
                </section>
                <button className="car-form__submit" type="submit">Публикувай обявата</button>
            </form>
        </main>
    )
}
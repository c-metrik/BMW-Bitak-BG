import "./CarCreate.css"

export function CarCreate() {
    return (
        <main className="car-create">
            <form className="car-form">
                <section className="car-form__section" aria-labelledby="car-details-heading">
                    <h2 id="car-details-heading">Данни за автомобила</h2>
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Версия / модификация
                            <input name="trim" type="text" placeholder="Напр. 320d xDrive" />
                        </label>
                        <label className="car-form__field">
                            Година на производство
                            <input name="year" type="number" min="1950" max={new Date().getFullYear()} placeholder="2020" required />
                        </label>
                        <label className="car-form__field">
                            Цена (лв.)
                            <input name="price" type="number" min="1" step="1" placeholder="25000" required />
                        </label>
                        <label className="car-form__field">
                            Пробег (км)
                            <input name="mileage" type="number" min="0" step="1" placeholder="85000" required />
                        </label>
                        <label className="car-form__field">
                        </label>
                    </div>
                     <h2 id="car-specs-heading">Технически характеристики</h2>
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
                                <option value="other">Друго</option>
                            </select>
                        </label>
                        <label className="car-form__field">
                            Скоростна кутия
                            <select name="transmission" defaultValue="" required>
                                <option value="" disabled>Изберете скоростна кутия</option>
                                <option value="manual">Ръчна</option>
                                <option value="automatic">Автоматична</option>
                            </select>
                        </label>
                        <label className="car-form__field">
                            Мощност (к.с.)
                            <input name="power" type="number" min="1" step="1" placeholder="190" />
                        </label>
                        <label className="car-form__field">
                            Цвят
                            <input name="color" type="text" placeholder="Напр. Черен металик" />
                        </label>
                    </div>
                    <h2 id="seller-heading">Данни за контакт</h2>
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Име за контакт
                            <input name="sellerName" type="text" autoComplete="name" required />
                        </label>
                        <label className="car-form__field">
                            Телефон
                            <input name="phone" type="tel" autoComplete="tel" placeholder="+359 ..." required />
                        </label>
                        <label className="car-form__field">
                            Местоположение
                            <input name="location" type="text" placeholder="Град" required />
                        </label>
                        <label className="car-form__field">
                            e-mail
                            <input name="email" type="email" autoComplete="email" placeholder="example@email.com" required />
                        </label>
                    </div>
                    <h2 id="car-description-heading">Описание и снимки</h2>
                    <div className="car-form__grid car-form__grid--single">
                        <label className="car-form__field">
                            Заглавие на обявата
                            <input name="title" type="text" placeholder="Напр. BMW 320d xDrive, отлично състояние" required />
                        </label>
                        <label className="car-form__field">
                            Описание
                            <textarea name="description" rows="5" placeholder="Опишете състоянието, оборудването и историята на автомобила." required />
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

import "./Forms.css"

import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { api, storageRequest, getCarPhotoUrl } from "../API/Requester";

export function CarCreate({ initialData = null }) {
    const isEditing = Boolean(initialData?.id);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (isSubmitting) return;

        setError("");
        setIsSubmitting(true);

        try {
            const formData = new FormData(event.currentTarget);

            const photo = formData.get("photos");

            const carData = {
                trim: formData.get("trim")?.trim() || null,
                year: Number(formData.get("year")),
                color: formData.get("color")?.trim() || null,
                fuel_type: formData.get("fuelType"),
                transmission: formData.get("transmission"),
                power: formData.get("power")? Number(formData.get("power")): null,
                price: Number(formData.get("price")),
                phone: formData.get("phone")?.trim(),
                location: formData.get("location")?.trim(),
                description: formData.get("description")?.trim(),
            };

            const currentYear = new Date().getFullYear();

            if (
                !Number.isInteger(carData.year) ||
                carData.year < 1950 ||
                carData.year > currentYear
            ) {
                setError("Моля, въведете валидна година на производство.");
                return;
            }



            if (isEditing) {
                await api.cars.update(initialData.id, carData);
                navigate(`/cars/${initialData.id}`);
            } else {
                let photoUrl = null;

                if (photo instanceof File && photo.size > 0) {
                    const extension = photo.name.split(".").pop().toLowerCase();
                    const filePath = `${user.id}/${crypto.randomUUID()}.${extension}`;

                    await storageRequest(filePath, photo);

                    photoUrl = getCarPhotoUrl(filePath);
                }

                const createdCars = await api.cars.create({
                    ...carData,
                    owner_id: user.id,
                    photos: photoUrl ? [photoUrl] : [],
                });

                const newCar = createdCars[0];

                navigate(`/cars/${newCar.id}`);
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
}

    return (
        <main>
            <form className="car-form" onSubmit={handleSubmit}>
                <section className="car-form__section" aria-labelledby="car-details-heading">
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Версия
                            <input name="trim" type="text" placeholder="Напр. 320d xDrive" defaultValue={initialData?.trim ?? ""}/>
                        </label>
                        <label className="car-form__field">
                            Година
                            <input name="year" 
                            type="number" min="1950" 
                            max={new Date().getFullYear()} placeholder="2020" required 
                            defaultValue={initialData?.year ?? ""}/>
                        </label>
                        <label className="car-form__field">
                            Цвят
                            <input name="color" type="text" placeholder="Напр. Черен металик" defaultValue={initialData?.color ?? ""}/>
                        </label>
                    </div>
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Гориво
                            <select name="fuelType" required defaultValue={initialData?.fuel_type ?? ""}>
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
                            <select name="transmission" required defaultValue={initialData?.transmission ?? ""}>
                                <option value="" disabled>Изберете ск. кутия</option>
                                <option value="manual">Ръчна</option>
                                <option value="automatic">Автоматична</option>
                            </select>
                        </label>
                        <label className="car-form__field">
                            Мощност (к.с.)
                            <input name="power" type="number" min="1" step="1" placeholder="190" defaultValue={initialData?.power ?? ""}/>
                        </label>
                    </div>
                    <div className="car-form__grid">
                        <label className="car-form__field">
                            Цена (€)
                            <input name="price" type="number" min="1" step="1" placeholder="25000" required defaultValue={initialData?.price ?? ""}/>
                        </label>
                        <label className="car-form__field">
                            Телефон
                            <input
                                name="phone"
                                type="tel"
                                autoComplete="tel"
                                placeholder="+359 ..."
                                required
                                defaultValue={initialData?.phone ?? ""}
                                minLength={7}
                                maxLength={20}
                            />
                        </label>
                        <label className="car-form__field">
                            Местоположение
                            <input name="location" type="text" placeholder="Град" required defaultValue={initialData?.location ?? ""}/>
                        </label>
                    </div>
                    <div className="car-form__grid car-form__grid--single">
                        <label className="car-form__field">
                            Описание
                            <textarea name="description" rows="3" 
                                placeholder="Опишете състоянието, оборудването и историята на автомобила." required 
                            	defaultValue={initialData?.description ?? ""}/>
                        </label>
                        <label className="car-form__field">
                            Снимка на автомобила
                            <input
                                name="photos"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                            />
                            <span className="car-form__hint">Можете да добавите една снимка на автомобила.</span>
                        </label>
                    </div>
                </section>
                {error && <p role="alert">{error}</p>}
                <button className="car-form__submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting
                        ? (isEditing ? "Запазване..." : "Публикуване...")
                        : (isEditing ? "Запази промените" : "Публикувай обявата")
                    }
                </button>
            </form>
        </main>
    )
}
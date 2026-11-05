import { Link } from "react-router"

import "./CarCreate.css"
import "./Register.css"


export function Login() {
    return (
            <main>
            <form className="car-form" >
                <h1>Влезте в профила си, за да можете да публикувате. Ако нямате профил, <Link to="/register">регистрирайте се</Link>.</h1>
                <section className="car-form__section" aria-labelledby="car-details-heading">
                        <label className="car-form__field">
                            E-mail*
                            <input name="trim" type="text" placeholder="example@abv.bg" />
                        </label>
                        <label className="car-form__field">
                            Парола*
                            <input name="color" type="text" placeholder="" />
                        </label>
                </section>
                <button className="car-form__submit" type="submit">Влез</button>
            </form>
        </main>
    )
}
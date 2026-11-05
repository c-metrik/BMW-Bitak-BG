import "./CarCreate.css"
import "./Register.css"

export function Register() {
    return (
            <main>
            <form className="car-form" >
                <h1>Създайте профил, за да използвате битака.</h1>
                <section className="car-form__section" aria-labelledby="car-details-heading">
                        <label className="car-form__field">
                            E-mail*
                            <input name="trim" type="text" placeholder="example@abv.bg" />
                        </label>
                        <label className="car-form__field">
                            Парола*
                            <input name="color" type="text" placeholder="" />
                        </label>
                        <label className="car-form__field">
                            Потвърди паролата*
                            <input name="color" type="text" placeholder="" />
                        </label>
                </section>
                <button className="car-form__submit" type="submit">Регистрирай се</button>
            </form>
        </main>
    )
}

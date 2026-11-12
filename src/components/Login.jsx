
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import "./Forms.css";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSubmitting(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Невалиден имейл или парола.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main>
            <form className="car-form" onSubmit={handleSubmit}>
                <h1 className="form-heading">
                    Влезте в профила си, за да можете да публикувате.
                    Ако нямате профил,{" "}
                    <Link to="/register">регистрирайте се</Link>.
                </h1>

                <section className="car-form__section">
                    <label className="car-form__field">
                        E-mail*
                        <input
                            name="email"
                            type="email"
                            placeholder="example@abv.bg"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label className="car-form__field">
                        Парола*
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </label>
                </section>

                {error && <p role="alert">{error}</p>}

                <button
                    className="car-form__submit"
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? "Влизане..." : "Влез"}
                </button>
            </form>
        </main>
    );
}

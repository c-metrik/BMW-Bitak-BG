
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

import "./Forms.css";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        if (!password.trim() || !confirmPassword.trim() || !email.trim()) {
            setError('Всички полета, отбелязани с "*", са задължителни.');
            return;
        }

        if (password !== confirmPassword) {
            setError("Паролите не съвпадат.");
            return;
        }

        setSubmitting(true);

        try {
            await register(email, password);
            navigate("/");
        } catch (error) {
            if (error.message === "User already registered") {
                setError("Вече съществува потребител с този имейл.");
            } else {
                setError(error.message);
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main>
            <form className="car-form" onSubmit={handleSubmit}>
                <h1 className="form-heading">
                    Създайте профил, за да използвате битака.
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
                            minLength={6}
                            required
                        />
                    </label>

                    <label className="car-form__field">
                        Потвърди паролата*
                        <input
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            minLength={6}
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
                    {submitting ? "Регистриране..." : "Регистрирай се"}
                </button>

                <p>
                    Вече имате профил? <Link to="/login">Влезте тук</Link>.
                </p>
            </form>
        </main>
    );
}

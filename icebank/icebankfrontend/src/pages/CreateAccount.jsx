import { useState } from "react";
import api from "../services/api";

export default function CreateAccount() {

    const [initialBalance, setInitialBalance] = useState("");
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    async function handleCreate(e) {

        e.preventDefault();

        const userId =
            localStorage.getItem("userId") || "3";

        const balance =
            Number(initialBalance);

        if (balance < 0 || Number.isNaN(balance)) {

            setMessage("Ingrese un saldo válido.");

            return;

        }

        try {

            setSaving(true);

            const response = await api.post(
                "/accounts/create",
                null,
                {
                    params: {
                        userId,
                        initialBalance: balance
                    }
                }
            );

            setMessage(
                `Cuenta creada correctamente: ${response.data.accountNumber}`
            );

            setInitialBalance("");

        }
        catch (error) {

            console.error(error);

            setMessage("No fue posible crear la cuenta.");

        }
        finally {

            setSaving(false);

        }

    }

    return (

        <div className="page">

            <h1>Crear Cuenta</h1>

            <p>
                Abra una nueva cuenta bancaria para el usuario actual.
            </p>

            <form onSubmit={handleCreate}>

                <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Saldo inicial"
                    value={initialBalance}
                    onChange={(e) =>
                        setInitialBalance(e.target.value)
                    }
                    required
                />

                <button
                    type="submit"
                    disabled={saving}
                >

                    {saving
                        ? "Creando..."
                        : "Crear Cuenta"}

                </button>

            </form>

            {message && (

                <div className="success-message">

                    {message}

                </div>

            )}

        </div>

    );

}
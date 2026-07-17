import { useEffect, useState } from "react";
import api from "../services/api";

export default function Accounts() {

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        loadAccounts();
    }, []);

    async function loadAccounts() {

        try {

            const userId =
                localStorage.getItem("userId") || "3";

            const response =
                await api.get(`/accounts/user/${userId}`);

            setAccounts(response.data || []);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <div className="page">

            <h1>Mis Cuentas</h1>

            <p>
                Consulta todas las cuentas registradas para el usuario.
            </p>

            {accounts.length === 0 ? (

                <div className="empty-state">

                    No hay cuentas registradas.

                </div>

            ) : (

                <div className="cards-grid">

                    {accounts.map(account => (

                        <div
                            className="card"
                            key={account.id}
                        >

                            <h3>Cuenta Bancaria</h3>

                            <strong>
                                {account.accountNumber}
                            </strong>

                            <p>

                                <b>Saldo:</b>

                                {" "}₡ {Number(account.balance).toFixed(2)}

                            </p>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}
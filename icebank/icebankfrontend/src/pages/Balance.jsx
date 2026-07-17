import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/balance.css";

export default function Balance() {

    const [data, setData] = useState(null);

    useEffect(() => {

        api.get("/finanzas/balance")
            .then(res => setData(res.data))
            .catch(err => console.error(err));

    }, []);

    if (!data) {

        return (

            <div className="page">

                <h1>Balance General</h1>

                <p>Cargando información...</p>

            </div>

        );

    }

    return (

        <div className="page">

            <h1>Balance General</h1>

            <p>
                Resumen financiero general del sistema.
            </p>

            <div className="cards-grid">

                <div className="card">

                    <h3>Ingresos</h3>

                    <strong>

                        ₡{Number(data.ingresos || 0).toFixed(2)}

                    </strong>

                </div>

                <div className="card">

                    <h3>Gastos</h3>

                    <strong>

                        ₡{Number(data.gastos || 0).toFixed(2)}

                    </strong>

                </div>

                <div className="card">

                    <h3>Balance Total</h3>

                    <strong>

                        ₡{Number(data.balance || 0).toFixed(2)}

                    </strong>

                </div>

            </div>

        </div>

    );

}
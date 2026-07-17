import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/tablaFinanzas.css";

export default function Gastos() {

    const [rows, setRows] = useState([]);

    useEffect(() => {

        api.get("/finanzas/gastos")
            .then(res => setRows(res.data))
            .catch(err => console.error(err));

    }, []);

    return (

        <div className="page">

            <h1>Gastos</h1>

            <p>
                Historial de gastos registrados.
            </p>

            {rows.length === 0 ? (

                <div className="empty-state">

                    No hay gastos registrados.

                </div>

            ) : (

                <table className="fin-table">

                    <thead>

                        <tr>

                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Monto</th>

                        </tr>

                    </thead>

                    <tbody>

                        {rows.map(item => (

                            <tr key={item.id}>

                                <td>{item.date}</td>

                                <td>{item.description}</td>

                                <td className="fin-gasto">

                                    ₡{Number(item.amount || 0).toFixed(2)}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>

    );

}
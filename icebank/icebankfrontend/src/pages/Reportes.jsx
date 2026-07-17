import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/reportes.css";

export default function Reportes() {

    const [rows, setRows] = useState([]);

    useEffect(() => {

        api.get("/finanzas/reportes")
            .then(res => setRows(res.data))
            .catch(err => console.error(err));

    }, []);

    return (

        <div className="page">

            <h1>Reportes</h1>

            <p>

                Total de movimientos registrados:
                <strong> {rows.length}</strong>

            </p>

            {rows.length === 0 ? (

                <div className="empty-state">

                    No existen reportes registrados.

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

                                <td>

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
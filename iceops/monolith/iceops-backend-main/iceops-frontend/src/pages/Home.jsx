import { useEffect, useState } from "react";
import { getStatus, getSummary } from "../services/api";

export default function Home() {
    const [status, setStatus] = useState({});
    const [summary, setSummary] = useState({});

    useEffect(() => {
        getStatus().then(setStatus);
        getSummary().then(setSummary);
    }, []);

    return (
        <div>
            <h1>ICEOPS Dashboard</h1>

            <div>
                <h2>Estado del Sistema</h2>
                <pre>{JSON.stringify(status, null, 2)}</pre>
            </div>

            <div>
                <h2>Resumen Global</h2>
                <pre>{JSON.stringify(summary, null, 2)}</pre>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

export default function SummaryPage() {
    const [summary, setSummary] = useState({});

    useEffect(() => {
        getSummary().then(setSummary);
    }, []);

    return (
        <div>
            <h1>Resumen Global</h1>
            <pre>{JSON.stringify(summary, null, 2)}</pre>
        </div>
    );
}

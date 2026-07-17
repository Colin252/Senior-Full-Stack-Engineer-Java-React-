import { useEffect, useState } from "react";
import { getStatus } from "../services/api";

export default function StatusPage() {
    const [data, setData] = useState({});

    useEffect(() => {
        getStatus().then(setData);
    }, []);

    return (
        <div>
            <h1>Estado del Sistema</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

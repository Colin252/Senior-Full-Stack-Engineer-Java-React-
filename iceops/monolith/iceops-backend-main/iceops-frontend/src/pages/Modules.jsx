import { useEffect, useState } from "react";
import { getModules, addModule, removeModule } from "../services/api";

export default function ModulesPage() {
    const [modules, setModules] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        getModules().then(setModules);
    }, []);

    const add = () => {
        addModule(name).then(setModules);
        setName("");
    };

    const remove = (m) => {
        removeModule(m).then(setModules);
    };

    return (
        <div>
            <h1>Módulos</h1>

            <input
                placeholder="Nuevo módulo"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={add}>Agregar</button>

            <ul>
                {modules.map((m) => (
                    <li key={m}>
                        {m}
                        <button onClick={() => remove(m)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

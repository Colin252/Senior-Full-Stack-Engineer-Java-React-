import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLogged, setLogged] = useState(false);

    // Cargar sesión al iniciar
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (token && userStr) {
            setUser(JSON.parse(userStr));
            setLogged(true);
        } else {
            setUser(null);
            setLogged(false);
        }
    }, []);

    // Iniciar sesión
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setLogged(true);
    };

    // Cerrar sesión
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setLogged(false);
    };

    return (
        <UserContext.Provider value={{ user, isLogged, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

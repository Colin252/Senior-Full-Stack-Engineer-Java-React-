import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8091/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 ya NO interceptamos, ya NO agregamos tokens
// 👉 backend está abierto, así que no necesitamos nada más

export default axiosClient;

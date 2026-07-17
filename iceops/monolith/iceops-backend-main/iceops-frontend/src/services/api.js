const BASE_URL = "http://localhost:8080/api";

export async function getStatus() {
    const res = await fetch(`${BASE_URL}/status`);
    return res.json();
}

export async function getModules() {
    const res = await fetch(`${BASE_URL}/modules`);
    return res.json();
}

export async function addModule(name) {
    const res = await fetch(`${BASE_URL}/modules/register?name=${name}`, {
        method: "POST"
    });
    return res.json();
}

export async function removeModule(name) {
    const res = await fetch(`${BASE_URL}/modules/remove?name=${name}`, {
        method: "DELETE"
    });
    return res.json();
}

export async function getSummary() {
    const res = await fetch(`${BASE_URL}/summary`);
    return res.json();
}

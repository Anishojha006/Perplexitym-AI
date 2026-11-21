import api from './api.js'

export const register = async ({ username, password, email }) => {
    const response = await api.post("/auth/register", {
        username,
        password,
        email
    });
    return response.data;
}

export const login = async ({ identifier, password }) => {
    const response = await api.post("/auth/login", {
        identifier,
        password
    });
    return response.data;
}

export const getme = async () => {
    try {
        const response = await api.get("/auth/get-me");
        return response.data
    }
    catch (err) {
        console.log(err);
    }
}
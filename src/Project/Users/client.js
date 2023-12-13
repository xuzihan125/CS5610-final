import axios from "axios";

const request = axios.create({
    withCredentials: true,
})

const API_BASE = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/users`;

export const signin = async (credentials) => {
    try {
        const response = await request.post(`${USERS_API}/signin`, credentials);
        return response.data;
    } catch (error) {
        console.error("Error during sign in: ", error);
        throw error;
    }
}

export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
}

export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
}

export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
}

export const findUserById = async (userId) => {
    const response = await request.get(`${USERS_API}/${userId}`);
    return response.data;
}

export const findUserByEmail = async (email) => {
    const response = await request.get(`${USERS_API}/email/${email}`);
    return response.data;
}

export const updateUser = async (userId, user) => {
    const response = await request.put(`${USERS_API}/${userId}`, user);
    return response.data;
}

export const signup = async (user) => {
    const response = await request.post(`${USERS_API}/signup`, user);
    return response.data;
}

export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}/create`, user);
    return response.data;
}

export const deleteUser = async (userId) => {
    const response = await request.delete(`${USERS_API}/${userId}`);
    return response.data;
}

export const findUsersBySearchTerm = async (searchTerm) => {
    const response = await request.get(`${USERS_API}/search/${searchTerm}`);
    return response.data;
}

export const findUserByUsername = async (username) => {
    const response = await request.get(`${USERS_API}/username/${username}`);
    return response.data;
}







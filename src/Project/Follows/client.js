import axios from 'axios';
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
export const USERS_API = `${BASE_API_URL}/users`;

const client = axios.create({
    withCredentials: true,
    baseURL: USERS_API
})

export const userFollowsUser = async (following) => {
    const response = await client.post(`/${following}/follows`)
    return response.data;
}

export const userUnfollowsUser = async (following) => {
    const response = await client.delete(`/${following}/follows`)
    return response.data;
}

export const findFollowersOfUser = async (following) => {
    const response = await client.get(`/${following}/followers`)
    return response.data;
}

export const findFollowingUsersByUser = async (follower) => {
    const response = await client.get(`/${follower}/following`)
    return response.data;
}
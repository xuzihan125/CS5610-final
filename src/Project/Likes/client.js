import axios from 'axios';
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

const client = axios.create({
    withCredentials: true,
    baseURL: BASE_API_URL
})

export const userLikesRecipe = async (recipeId) => {
    const response = await client.post(`/recipes/${recipeId}/likes`)
    return response.data;
}

export const userUnlikesRecipe = async (recipeId) => {
    const response = await client.delete(`/recipes/${recipeId}/likes`)
    return response.data;
}

export const findUsersLikingRecipe = async (recipeId) => {
    const response = await client.get(`/recipes/${recipeId}/likes`)
    return response.data;
}

export const findRecipesLikedByUser = async (userId) => {
    const response = await client.get(`/users/${userId}/likes`)
    return response.data;
}
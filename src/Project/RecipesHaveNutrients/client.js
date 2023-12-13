import axios from 'axios';
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

const client = axios.create({
    withCredentials: true,
    baseURL: BASE_API_URL
})

export const recipeHasNutrient = async (recipeId, nutrientId) => {
    const response = await client.post(`/recipes/${recipeId}/nutrients/${nutrientId}`)
    return response.data;
}

export const recipesUnhasNutrient = async (recipeId, nutrientId) => {
    const response = await client.delete(`/recipes/${recipeId}/nutrients/${nutrientId}`)
    return response.data;
}

export const findNutrientsInRecipe = async (recipeId) => {
    const response = await client.get(`/recipes/${recipeId}/nutrients`)
    return response.data;
}

export const findRecipesHavingNutrient = async (nutrientId) => {
    const response = await client.get(`/nutrients/${nutrientId}/recipes`)
    return response.data;
}